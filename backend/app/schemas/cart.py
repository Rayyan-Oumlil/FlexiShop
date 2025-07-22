from pydantic import BaseModel
from typing import Optional
from app.schemas.product import ProductOut  # ← ajoute cette importation

class CartItemBase(BaseModel):
    product_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItemOut(CartItemBase):
    id: int
    product: Optional[ProductOut]  # 👈 ajoute ça

    class Config:
        orm_mode = True

class CartOut(BaseModel):
    id: int
    items: list[CartItemOut]

    class Config:
        orm_mode = True

class CartItemUpdate(BaseModel):
    product_id: int
    quantity: int  # 👈 si 0, on supprime l'item
