from pydantic import BaseModel

# ✅ Définis cette classe de base en premier
class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image_url: str

# Hérite de ProductBase pour la création
class ProductCreate(ProductBase):
    pass

# Hérite de ProductBase + ajoute id pour les réponses
class ProductOut(ProductBase):
    id: int

    class Config:
        orm_mode = True

# Schéma pour la mise à jour (tous les champs optionnels)
from typing import Optional

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
