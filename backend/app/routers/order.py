from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models import Cart, CartItem, Product, Order, OrderItem
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=dict)
def checkout(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart or not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total = 0.0
    order_items = []

    for item in cart.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            continue
        total += product.price * item.quantity
        order_items.append(OrderItem(
            product_id=item.product_id,
            quantity=item.quantity,
            price=product.price
        ))

    order = Order(user_id=current_user.id, total_price=total, items=order_items)
    db.add(order)
    db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
    db.commit()
    db.refresh(order)
    return {
        "id": order.id,
        "total_price": order.total_price,
        "created_at": order.created_at,
        "items": [
            {
                "product_id": oi.product_id,
                "quantity": oi.quantity,
                "price": oi.price
            } for oi in order.items
        ]
    }

@router.get("/history", response_model=list)
def get_order_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    orders = (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .options(joinedload(Order.items))
        .all()
    )
    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "total_price": order.total_price,
            "created_at": order.created_at,
            "items": [
                {
                    "product_id": oi.product_id,
                    "product_name": db.query(Product.name).filter(Product.id == oi.product_id).scalar(),
                    "quantity": oi.quantity,
                    "price": oi.price
                } for oi in order.items
            ]
        })
    return result