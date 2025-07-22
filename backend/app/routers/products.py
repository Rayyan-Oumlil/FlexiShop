from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate
from app.core.dependencies import get_db, get_current_admin
from app.models.admin_user import AdminUser
from app.models.review import Review
from app.models.user import User
from app.core.dependencies import get_current_user
from fastapi import Body


router = APIRouter(prefix="/products", tags=["Products"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[ProductOut])
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@router.post("/", response_model=ProductOut)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)  # 👈 Ajout
):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)  # adapte selon ton modèle admin
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for field, value in product_update.dict(exclude_unset=True).items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}", status_code=204)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"detail": "Product deleted"}

@router.get("/{product_id}/reviews", response_model=list[dict])
def get_reviews(product_id: int, db: Session = Depends(get_db)):
    reviews = db.query(Review).filter(Review.product_id == product_id).all()
    return [
        {
            "id": r.id,
            "user_id": r.user_id,
            "rating": r.rating,
            "comment": r.comment,
            "created_at": r.created_at,
            "user_email": r.user.email if r.user else None
        }
        for r in reviews
    ]

@router.post("/{product_id}/reviews", response_model=dict)
def post_review(
    product_id: int,
    rating: int = Body(...),
    comment: str = Body(""),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    review = Review(
        product_id=product_id,
        user_id=current_user.id,
        rating=rating,
        comment=comment
    )
    db.add(review)
    db.commit()
    db.refresh(review)
    return {
        "id": review.id,
        "user_id": review.user_id,
        "rating": review.rating,
        "comment": review.comment,
        "created_at": review.created_at,
        "user_email": current_user.email
    }
