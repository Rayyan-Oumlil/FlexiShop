from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate
from app.core.dependencies import get_db, get_current_admin
from app.models.admin_user import AdminUser


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
