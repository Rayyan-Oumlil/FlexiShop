from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database import SessionLocal
from app.models.admin_user import AdminUser
from app.models.user import User
from fastapi import status
from pydantic import BaseModel

from app.core.security import verify_password, create_access_token, get_password_hash
from app.schemas.auth import Token


router = APIRouter(prefix="/auth", tags=["Auth"])

class AdminCreate(BaseModel):
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create-admin", status_code=201)
def create_admin(admin_data: AdminCreate, db: Session = Depends(get_db)):
    """Endpoint temporaire pour créer un admin sur Render"""
    # Vérifier si l'admin existe déjà
    existing_admin = db.query(AdminUser).filter(AdminUser.email == admin_data.email).first()
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    # Créer le nouvel admin
    admin = AdminUser(
        email=admin_data.email,
        hashed_password=get_password_hash(admin_data.password)
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    
    return {"message": "Admin created successfully", "email": admin.email}


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # 1️⃣ Essaye d'abord comme admin
    admin = db.query(AdminUser).filter(AdminUser.email == form_data.username).first()
    if admin and verify_password(form_data.password, admin.hashed_password):
        token = create_access_token(data={"sub": admin.email})
        return {"access_token": token, "token_type": "bearer"}

    # 2️⃣ Sinon essaye comme user normal
    user = db.query(User).filter(User.email == form_data.username).first()
    if user and verify_password(form_data.password, user.hashed_password):
        token = create_access_token(data={"sub": user.email})
        return {"access_token": token, "token_type": "bearer"}

    # ❌ Aucun des deux n’a fonctionné
    raise HTTPException(status_code=400, detail="Invalid credentials")



@router.post("/logout", status_code=status.HTTP_200_OK)
def logout():
    return {"message": "Successfully logged out. Please delete the token client-side."}
