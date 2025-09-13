from fastapi import FastAPI
from app.database import Base, engine
from app.models import admin_user  # Important pour créer la table
from app.routers import auth, products
from app.routers import users
from app.routers import cart
from app.routers import order 
from fastapi.middleware.cors import CORSMiddleware

# Create PostgreSQL tables on startup
try:
    Base.metadata.create_all(bind=engine)
    print("✅ PostgreSQL database tables created successfully")
except Exception as e:
    print(f"⚠️ Warning: Could not create database tables at startup: {e}")
    print("Tables will be created when first accessed")
    print("This is normal for the first deployment")

app = FastAPI(
    title="FlexiShop API",
    version="1.0",
    description="A modern e-commerce platform API",
)

@app.get("/")
def read_root():
    """Root endpoint - API welcome message"""
    return {
        "message": "Welcome to FlexiShop API! 🛒",
        "version": "1.0",
        "docs": "/docs",
        "health": "/health",
        "init_db": "/init-db"
    }
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
    """Endpoint to manually initialize PostgreSQL database tables"""
    try:
        Base.metadata.create_all(bind=engine)
        return {"message": "PostgreSQL database initialized successfully"}
    except Exception as e:
        return {"error": f"Failed to initialize PostgreSQL database: {str(e)}"}

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