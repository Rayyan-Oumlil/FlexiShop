# app/init_db.py

from app.database import Base, engine
from app.models import user, admin_user, product, cart, cart_item, order, order_item, review

try:
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully.")
except Exception as e:
    print(f"❌ Error creating database tables: {e}")
    raise
