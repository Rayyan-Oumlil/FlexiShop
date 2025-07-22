import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

from app.database import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.user import User
from app.models.admin_user import AdminUser
from app.models.product import Product
from app.models.cart_item import CartItem
from app.models.cart import Cart



Base.metadata.create_all(bind=engine)
db = SessionLocal()

existing_admin = db.query(AdminUser).filter(AdminUser.email == "admin@example.com").first()
if not existing_admin:
    admin = AdminUser(email="admin@example.com", hashed_password=get_password_hash("admin123"))
    db.add(admin)
    db.commit()
    print("✅ Admin created.")
else:
    print("ℹ️ Admin already exists.")
