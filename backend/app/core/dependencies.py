# core/dependencies.py
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from app.core.security import SECRET_KEY, ALGORITHM
from app.database import SessionLocal
from app.models.admin_user import AdminUser

from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_admin(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
        admin = db.query(AdminUser).filter(AdminUser.email == email).first()
        if not admin:
            raise HTTPException(status_code=401, detail="Admin not found")
        return admin
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

from app.models.user import User  # 👈 à ajouter si pas encore importé

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
