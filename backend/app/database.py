"""
Configuration Supabase pour FlexiShop
Base de données Supabase uniquement
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Supabase Configuration
def get_supabase_client():
    """Get Supabase client for database operations"""
    try:
        from app.supabase_rest import get_supabase_client as get_rest_client
        return get_rest_client()
    except Exception as e:
        print(f"❌ Error getting Supabase client: {e}")
        return None

def get_supabase_admin_client():
    """Get Supabase admin client for admin operations"""
    try:
        from app.supabase_rest import get_supabase_admin_client as get_admin_rest_client
        return get_admin_rest_client()
    except Exception as e:
        print(f"❌ Error getting Supabase admin client: {e}")
        return None

# Test Supabase connection
def test_supabase_connection():
    """Test Supabase connection"""
    try:
        from app.supabase_rest import test_supabase_connection
        return test_supabase_connection()
    except Exception as e:
        print(f"❌ Supabase connection test failed: {e}")
        return False

# Initialize Supabase connection on startup
if __name__ == "__main__":
    print("🔍 Testing Supabase connection...")
    test_supabase_connection()