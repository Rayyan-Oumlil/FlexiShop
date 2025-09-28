"""
Client Supabase utilisant l'API REST directement
Évite les problèmes de compatibilité avec le client Python officiel
"""
import requests
import json
import os
from typing import Optional, Dict, Any, List

class SupabaseREST:
    """Client Supabase utilisant l'API REST"""
    
    def __init__(self, url: str, key: str):
        self.url = url.rstrip('/')
        self.key = key
        self.headers = {
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json"
        }
    
    def select(self, table: str, columns: str = "*", filters: Optional[Dict] = None, limit: Optional[int] = None) -> Dict[str, Any]:
        """Sélectionner des données d'une table"""
        url = f"{self.url}/rest/v1/{table}"
        params = {"select": columns}
        
        if limit:
            params["limit"] = str(limit)
        
        if filters:
            for key, value in filters.items():
                params[key] = value
        
        try:
            response = requests.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            return {"data": response.json(), "status": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"error": str(e), "status": 500}
    
    def insert(self, table: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Insérer des données dans une table"""
        url = f"{self.url}/rest/v1/{table}"
        
        try:
            response = requests.post(url, headers=self.headers, json=data)
            response.raise_for_status()
            return {"data": response.json(), "status": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"error": str(e), "status": 500}
    
    def update(self, table: str, data: Dict[str, Any], filters: Dict[str, str]) -> Dict[str, Any]:
        """Mettre à jour des données dans une table"""
        url = f"{self.url}/rest/v1/{table}"
        
        # Construire les paramètres de filtre
        params = {}
        for key, value in filters.items():
            params[key] = value
        
        try:
            response = requests.patch(url, headers=self.headers, json=data, params=params)
            response.raise_for_status()
            return {"data": response.json(), "status": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"error": str(e), "status": 500}
    
    def delete(self, table: str, filters: Dict[str, str]) -> Dict[str, Any]:
        """Supprimer des données d'une table"""
        url = f"{self.url}/rest/v1/{table}"
        
        # Construire les paramètres de filtre
        params = {}
        for key, value in filters.items():
            params[key] = value
        
        try:
            response = requests.delete(url, headers=self.headers, params=params)
            response.raise_for_status()
            return {"data": response.json(), "status": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"error": str(e), "status": 500}
    
    def test_connection(self) -> bool:
        """Tester la connexion à Supabase"""
        try:
            response = requests.get(f"{self.url}/rest/v1/", headers=self.headers)
            return response.status_code == 200
        except:
            return False

# Configuration globale
def get_supabase_client() -> SupabaseREST:
    """Obtenir le client Supabase REST"""
    url = os.getenv("SUPABASE_URL", "https://lqbyzmgcxbdoqzmiquhs.supabase.co")
    key = os.getenv("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxYnl6bWdjeGJkb3F6bWlxdWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NTU2MDYsImV4cCI6MjA3NDUzMTYwNn0.NpVwiLej9le7jMO7tveawZyUwM6X2dXT9D-OHOOXzVo")
    return SupabaseREST(url, key)

def get_supabase_admin_client() -> SupabaseREST:
    """Obtenir le client Supabase REST admin"""
    url = os.getenv("SUPABASE_URL", "https://lqbyzmgcxbdoqzmiquhs.supabase.co")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxYnl6bWdjeGJkb3F6bWlxdWhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk1NTYwNiwiZXhwIjoyMDc0NTMxNjA2fQ.KpT8h8elqhM2HwbCWNY2wDGCTTzkX23aFUDf9dIW7CA")
    return SupabaseREST(url, key)

# Test de connexion
def test_supabase_connection():
    """Tester la connexion Supabase"""
    try:
        client = get_supabase_client()
        if client.test_connection():
            print("✅ Supabase connection successful")
            return True
        else:
            print("❌ Supabase connection failed")
            return False
    except Exception as e:
        print(f"❌ Supabase connection error: {e}")
        return False

if __name__ == "__main__":
    test_supabase_connection()
