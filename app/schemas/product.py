from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image_url: str | None = None

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int

    class Config:
        orm_mode = True
