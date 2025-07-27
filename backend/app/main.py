from fastapi import FastAPI
from app.database import Base, engine
from app.models import admin_user  # Important pour créer la table
from app.routers import auth, products
from app.routers import users
from app.routers import cart
from app.routers import order 
from fastapi.middleware.cors import CORSMiddleware

# Créer les tables au démarrage avec gestion d'erreur
try:
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully")
except Exception as e:
    print(f"⚠️ Warning: Could not create database tables at startup: {e}")
    print("Tables will be created when first accessed")

app = FastAPI(
    title="FlexiShop API",
    version="1.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",                  # Dev local
        "https://flexishop.my",                   # Ton domaine custom
        "https://flexi-shop-two.vercel.app",      # Ton frontend Vercel
        "https://flexishop.onrender.com"          # (optionnel, accès direct backend)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclure les routes
app.include_router(auth.router, prefix="/api")
app.include_router(products.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(cart.router, prefix="/api")
app.include_router(order.router, prefix="/api")  

@app.get("/init-db")
def init_database():
    """Endpoint pour initialiser la base de données manuellement"""
    try:
        Base.metadata.create_all(bind=engine)
        return {"message": "Database initialized successfully"}
    except Exception as e:
        return {"error": f"Failed to initialize database: {str(e)}"}

from fastapi.openapi.utils import get_openapi

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="FlexiShop API",
        version="1.0",
        description="API avec JWT Auth",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",   # ✅ ceci doit être juste "bearer", pas "Bearer"
            "bearerFormat": "JWT",
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi