"""
Authentification simplifiée - Plus proche de Flutter
"""
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.schemas import UserCreate, UserOut, UserLogin, Token
from app.config import settings
from supabase import create_client, Client

router = APIRouter(prefix="/auth", tags=["Authentication"])

security = HTTPBearer()

def get_supabase_client():
    """Get Supabase client - Lazy initialization"""
    try:
        return create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
    except Exception as e:
        print(f"❌ Error creating Supabase client: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user - Simple version"""
    try:
        token = credentials.credentials
        supabase_client = get_supabase_client()
        response = supabase_client.auth.get_user(token)
        
        if not response.user:
            raise HTTPException(status_code=401, detail="Token invalide")
        
        return response.user
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Erreur: {str(e)}")

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    """Register - Simple version"""
    try:
        supabase_client = get_supabase_client()
        response = supabase_client.auth.sign_up({
            "email": user.email,
            "password": user.password,
            "options": {
                "data": {
                    "full_name": user.full_name,
                    "phone": user.phone,
                    "address": user.address
                }
            }
        })
        
        if response.user:
            return UserOut(
                id=response.user.id,
                email=response.user.email,
                full_name=user.full_name,
                phone=user.phone,
                address=user.address,
                is_active=True,
                is_verified=False,
                created_at=response.user.created_at,
                updated_at=response.user.updated_at
            )
        else:
            raise HTTPException(status_code=400, detail="Erreur d'inscription")
            
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erreur: {str(e)}")

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    """Login - Simple version"""
    try:
        supabase_client = get_supabase_client()
        response = supabase_client.auth.sign_in_with_password({
            "email": user.email,
            "password": user.password
        })
        
        if response.user and response.session:
            return Token(
                access_token=response.session.access_token,
                token_type="bearer"
            )
        else:
            raise HTTPException(status_code=401, detail="Identifiants invalides")
            
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Erreur: {str(e)}")

@router.get("/me", response_model=UserOut)
async def get_me(current_user = Depends(get_current_user)):
    """Get current user - Simple version"""
    print(f"🔍 Debug: get_me appelé avec utilisateur: {current_user.email}")
    return UserOut(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.user_metadata.get("full_name"),
        phone=current_user.user_metadata.get("phone"),
        address=current_user.user_metadata.get("address"),
        is_active=current_user.email_confirmed_at is not None,
        is_verified=current_user.email_confirmed_at is not None,
        created_at=current_user.created_at,
        updated_at=current_user.updated_at
    )

