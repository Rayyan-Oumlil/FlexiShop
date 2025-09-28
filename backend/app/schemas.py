"""
Schemas simplifiés pour FlexiShop
"""
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "password123",
                "full_name": "John Doe",
                "phone": "+1234567890",
                "address": "123 Main St"
            }
        }

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    email: EmailStr
    full_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    is_active: bool = True
    is_verified: bool = False
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Product Schemas
class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    stock: int = 0
    image_url: Optional[str] = None

class ProductOut(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    stock: int
    image_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Cart Schemas
class CartItemCreate(BaseModel):
    product_id: str
    quantity: int

class CartItemOut(BaseModel):
    id: str
    product_id: str
    quantity: int
    product: ProductOut

class CartOut(BaseModel):
    id: str
    user_id: str
    items: list[CartItemOut]
    total: float
    created_at: datetime
    updated_at: datetime

# Order Schemas
class OrderItemCreate(BaseModel):
    product_id: str
    quantity: int
    price: float

class OrderCreate(BaseModel):
    items: list[OrderItemCreate]
    total: float
    shipping_address: str
    payment_method: str

class OrderOut(BaseModel):
    id: str
    user_id: str
    items: list[OrderItemCreate]
    total: float
    status: str
    shipping_address: str
    payment_method: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
