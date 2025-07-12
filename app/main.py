from fastapi import FastAPI
from app.database import Base, engine
from app.models import admin_user  # Important pour créer la table
from app.routers import auth, products

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Product Catalog API",
    version="1.0",
)

# Inclure les routes
app.include_router(auth.router)
app.include_router(products.router)

from fastapi.openapi.utils import get_openapi

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Product Catalog API",
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