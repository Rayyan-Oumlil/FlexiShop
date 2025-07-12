import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

from app.database import SessionLocal, engine, Base
from app.models.admin_user import AdminUser
from app.core.security import get_password_hash

Base.metadata.create_all(bind=engine)
db = SessionLocal()

admin = AdminUser(email="admin@example.com", hashed_password=get_password_hash("admin123"))
db.add(admin)
db.commit()
print("✅ Admin created.")
