"""
Authentification simplifiée - Plus proche de Flutter
"""
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.schemas import UserCreate, UserOut, UserLogin, Token
from app.config import settings
import requests
import json

router = APIRouter(prefix="/auth", tags=["Authentication"])

security = HTTPBearer()

def get_supabase_auth_url():
    """Get Supabase auth URL"""
    return f"{settings.SUPABASE_URL}/auth/v1"

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user - Simple version"""
    try:
        token = credentials.credentials
        auth_url = get_supabase_auth_url()
        headers = {
            "apikey": settings.SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(f"{auth_url}/user", headers=headers)
        
        if response.status_code == 200:
            user_data = response.json()
            return user_data
        else:
            raise HTTPException(status_code=401, detail="Token invalide")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Erreur: {str(e)}")

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    """Register - Simple version"""
    try:
        auth_url = get_supabase_auth_url()
        headers = {
            "apikey": settings.SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
        data = {
            "email": user.email,
            "password": user.password,
            "data": {
                "full_name": user.full_name,
                "phone": user.phone,
                "address": user.address
            }
        }
        
        response = requests.post(f"{auth_url}/signup", headers=headers, json=data)
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"🔍 Debug: Supabase response: {user_data}")
            
            # Handle different response structures
            if "user" in user_data:
                user_info = user_data["user"]
            else:
                user_info = user_data
                
            return UserOut(
                id=user_info.get("id", "unknown"),
                email=user_info.get("email", user.email),
                full_name=user.full_name,
                phone=user.phone,
                address=user.address,
                is_active=True,
                is_verified=False,
                created_at=user_info.get("created_at", "2024-01-01T00:00:00Z"),
                updated_at=user_info.get("updated_at", "2024-01-01T00:00:00Z")
            )
        else:
            print(f"❌ Supabase error: {response.status_code} - {response.text}")
            raise HTTPException(status_code=400, detail=f"Erreur d'inscription: {response.text}")
            
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erreur: {str(e)}")

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    """Login - Simple version"""
    try:
        auth_url = get_supabase_auth_url()
        headers = {
            "apikey": settings.SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
        data = {
            "email": user.email,
            "password": user.password
        }
        
        response = requests.post(f"{auth_url}/token?grant_type=password", headers=headers, json=data)
        
        if response.status_code == 200:
            session_data = response.json()
            return Token(
                access_token=session_data["access_token"],
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

