# app/init_db.py

from app.database import Base, engine
from app.models import user, admin_user, product, cart, cart_item, order, order_item

Base.metadata.create_all(bind=engine)
print("✅ Tables created.")
