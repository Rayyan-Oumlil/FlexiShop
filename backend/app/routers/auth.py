"""
Authentification Supabase CORRECTE - Utilise l'API Auth officielle
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
    """Get current user - CORRECT version"""
    try:
        token = credentials.credentials
        print(f"🔍 Debug: Token reçu: {token[:50]}...")
        
        auth_url = get_supabase_auth_url()
        headers = {
            "apikey": settings.SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        
        print(f"🔍 Debug: Headers: {headers}")
        print(f"🔍 Debug: URL: {auth_url}/user")
        
        response = requests.get(f"{auth_url}/user", headers=headers)
        
        print(f"🔍 Debug: Response status: {response.status_code}")
        print(f"🔍 Debug: Response text: {response.text}")
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"🔍 Debug: User data: {user_data}")
            return user_data
        else:
            print(f"❌ Supabase auth error: {response.status_code} - {response.text}")
            raise HTTPException(status_code=401, detail=f"Token invalide: {response.text}")
    except Exception as e:
        print(f"❌ Error in get_current_user: {e}")
        raise HTTPException(status_code=401, detail=f"Erreur: {str(e)}")

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    """Register - CORRECT version"""
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
        
        print(f"🔍 Debug: Registration data: {data}")
        response = requests.post(f"{auth_url}/signup", headers=headers, json=data)
        print(f"🔍 Debug: Supabase signup response: {response.status_code} - {response.text}")
        
        if response.status_code == 200:
            user_data = response.json()
            
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
            raise HTTPException(status_code=400, detail=f"Erreur d'inscription: {response.text}")
            
    except Exception as e:
        print(f"❌ Error in register: {e}")
        raise HTTPException(status_code=400, detail=f"Erreur: {str(e)}")

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    """Login - CORRECT version"""
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
        
        print(f"🔍 Debug: Login data: {data}")
        response = requests.post(f"{auth_url}/token?grant_type=password", headers=headers, json=data)
        print(f"🔍 Debug: Supabase login response: {response.status_code} - {response.text}")
        
        if response.status_code == 200:
            session_data = response.json()
            return Token(
                access_token=session_data["access_token"],
                token_type="bearer"
            )
        else:
            raise HTTPException(status_code=401, detail=f"Identifiants invalides: {response.text}")
            
    except Exception as e:
        print(f"❌ Error in login: {e}")
        raise HTTPException(status_code=401, detail=f"Erreur: {str(e)}")

@router.get("/me", response_model=UserOut)
async def get_me(current_user = Depends(get_current_user)):
    """Get current user - CORRECT version"""
    print(f"🔍 Debug: get_me appelé avec utilisateur: {current_user}")
    
    # Handle different response structures from Supabase
    if isinstance(current_user, dict):
        user_id = current_user.get("id", "unknown")
        email = current_user.get("email", "unknown")
        user_metadata = current_user.get("user_metadata", {})
        email_confirmed_at = current_user.get("email_confirmed_at")
        created_at = current_user.get("created_at", "2024-01-01T00:00:00Z")
        updated_at = current_user.get("updated_at", "2024-01-01T00:00:00Z")
    else:
        # Fallback for object structure
        user_id = getattr(current_user, "id", "unknown")
        email = getattr(current_user, "email", "unknown")
        user_metadata = getattr(current_user, "user_metadata", {})
        email_confirmed_at = getattr(current_user, "email_confirmed_at", None)
        created_at = getattr(current_user, "created_at", "2024-01-01T00:00:00Z")
        updated_at = getattr(current_user, "updated_at", "2024-01-01T00:00:00Z")
    
    return UserOut(
        id=user_id,
        email=email,
        full_name=user_metadata.get("full_name", "Unknown"),
        phone=user_metadata.get("phone", ""),
        address=user_metadata.get("address", ""),
        is_active=email_confirmed_at is not None,
        is_verified=email_confirmed_at is not None,
        created_at=created_at,
        updated_at=updated_at
    )

@router.get("/test-token")
async def test_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Test endpoint to check if token is received"""
    print(f"🔍 Debug: test-token called")
    token = credentials.credentials
    return {
        "received": True,
        "token_length": len(token),
        "token_start": token[:20] + "...",
        "message": "Token received successfully"
    }
