from pydantic import BaseModel
from datetime import datetime
from typing import List

class OrderItemOut(BaseModel):
    product_id: int
    quantity: int
    price: float

    class Config:
        from_attributes = True

class OrderOut(BaseModel):
    id: int
    total: float
    created_at: datetime
    items: List[OrderItemOut]

    class Config:
        from_attributes = True

class ProductInfo(BaseModel):
    id: int
    name: str
    description: str
    price: float

class OrderItemWithProduct(BaseModel):
    product_id: int
    quantity: int
    price: float
    product: ProductInfo

    class Config:
        orm_mode = True

class OrderWithProductDetails(BaseModel):
    id: int
    total_price: float
    created_at: datetime
    items: list[OrderItemWithProduct]

    class Config:
        orm_mode = True
