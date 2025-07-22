from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.user import User
from app.models.product import Product
from app.core.dependencies import get_current_user
from app.schemas.cart import CartItemCreate, CartOut
from app.schemas.cart import CartItemUpdate  # 👈 ajoute cette ligne

# --- Stripe Payment Integration ---
import os
import stripe
from dotenv import load_dotenv
from fastapi import Request
from fastapi.responses import JSONResponse

load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.post("/add", response_model=CartOut)
def add_to_cart(
    item: CartItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart:
        cart = Cart(user_id=current_user.id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    existing_item = next((i for i in cart.items if i.product_id == item.product_id), None)
    if existing_item:
        existing_item.quantity += item.quantity
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=item.product_id, quantity=item.quantity)
        db.add(cart_item)

    db.commit()
    db.refresh(cart)
    return cart

@router.get("/", response_model=CartOut)
def get_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    return cart

@router.delete("/remove/{product_id}", response_model=CartOut)
def remove_from_cart(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == product_id
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found in cart")

    db.delete(item)
    db.commit()
    db.refresh(cart)
    return cart

@router.delete("/clear", status_code=204)
def clear_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
    db.commit()

@router.put("/update", response_model=CartOut)
def update_cart_item(
    item: CartItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == item.product_id
    ).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail="Item not found in cart")

    if item.quantity <= 0:
        db.delete(cart_item)
    else:
        cart_item.quantity = item.quantity

    db.commit()
    db.refresh(cart)
    return cart

@router.get("/total")
def get_cart_total(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    total_price = 0.0
    for item in cart.items:
        if item.product:
            total_price += item.quantity * item.product.price

    return {"total_price": round(total_price, 2)}

@router.post("/payment/create-checkout-session")
async def create_checkout_session(request: Request):
    data = await request.json()
    # data["items"] doit être une liste d'objets {name, amount, quantity}
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=data["items"],
            mode="payment",
            success_url="http://localhost:5173/success",
            cancel_url="http://localhost:5173/cancel",
        )
        return JSONResponse({"url": session.url})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)
