from fastapi import FastAPI
from app.routers import products_supabase as products
from app.routers import cart_supabase as cart
from app.routers import order_supabase as order
from app.routers import auth
from app.config import settings
from fastapi.middleware.cors import CORSMiddleware

# Initialize Supabase connection
try:
    from app.database import test_supabase_connection
    if test_supabase_connection():
        print("✅ Supabase connection successful")
    else:
        print("⚠️ Warning: Supabase connection failed")
except Exception as e:
    print(f"⚠️ Warning: Could not test Supabase connection: {e}")

app = FastAPI(
    title="FlexiShop API",
    version="1.0",
    description="A modern e-commerce platform API with Supabase authentication",
    docs_url="/docs",
    redoc_url="/redoc"
)


@app.get("/")
def read_root():
    """Root endpoint - API welcome message"""
    return {
        "message": "Welcome to FlexiShop API! 🛒",
        "version": "1.0",
        "database": "Supabase",
        "docs": "/docs",
        "health": "/health"
    }
# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routes - Authentication first
app.include_router(auth.router, prefix="/api")
app.include_router(products.router, prefix="/api")
app.include_router(cart.router, prefix="/api")
app.include_router(order.router, prefix="/api")  

@app.get("/health")
def health_check():
    """Health check endpoint"""
    try:
        from app.database import test_supabase_connection
        if test_supabase_connection():
            return {
                "status": "healthy",
                "database": "Supabase connected",
                "message": "FlexiShop API is running"
            }
        else:
            return {
                "status": "unhealthy",
                "database": "Supabase connection failed",
                "message": "Database connection issue"
            }
    except Exception as e:
        return {
            "status": "error",
            "database": "Unknown",
            "message": f"Health check failed: {str(e)}"
        }

from fastapi.openapi.utils import get_openapi

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="FlexiShop API",
        version="1.0",
        description="API avec Supabase Authentication",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": "Supabase JWT Token"
        }
    }
    # Apply security to protected routes only
    for path, path_item in openapi_schema["paths"].items():
        for method, operation in path_item.items():
            if method in ["get", "post", "put", "delete", "patch"]:
                # Skip public routes
                if not any(path.startswith(public) for public in ["/", "/docs", "/redoc", "/openapi.json", "/health", "/api/auth/register", "/api/auth/login"]):
                    operation["security"] = [{"BearerAuth": []}]
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi