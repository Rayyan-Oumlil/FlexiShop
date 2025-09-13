#!/usr/bin/env python3
"""
Script simple pour vérifier la base de données FlexiShop
"""

import requests
import json

API_URL = "https://flexishop.onrender.com"

def check_database():
    print("🔍 Vérification de la base de données FlexiShop")
    print("=" * 50)
    
    try:
        # 1. Vérifier la santé de l'API
        print("\n1. Vérification de l'API...")
        response = requests.get(f"{API_URL}/health")
        if response.status_code == 200:
            health_data = response.json()
            print(f"   ✅ API en ligne: {health_data}")
        else:
            print(f"   ❌ API hors ligne: {response.status_code}")
            return
        
        # 2. Vérifier l'initialisation de la base
        print("\n2. Vérification de la base de données...")
        response = requests.get(f"{API_URL}/init-db")
        if response.status_code == 200:
            db_data = response.json()
            print(f"   ✅ Base de données: {db_data}")
        else:
            print(f"   ❌ Problème base de données: {response.status_code}")
        
        # 3. Vérifier les produits
        print("\n3. Vérification des produits...")
        response = requests.get(f"{API_URL}/api/products/")
        if response.status_code == 200:
            products = response.json()
            print(f"   ✅ Produits trouvés: {len(products)}")
            for product in products[:3]:  # Afficher les 3 premiers
                print(f"      - {product.get('name', 'N/A')}: €{product.get('price', 'N/A')}")
        else:
            print(f"   ❌ Aucun produit: {response.status_code}")
        
        # 4. Tester la création d'un utilisateur
        print("\n4. Test de création d'utilisateur...")
        test_user = {
            "email": "test@example.com",
            "password": "test123"
        }
        response = requests.post(f"{API_URL}/api/users/register", json=test_user)
        if response.status_code == 200:
            user_data = response.json()
            print(f"   ✅ Utilisateur créé: {user_data.get('email', 'N/A')}")
        elif response.status_code == 400:
            print("   ℹ️  Utilisateur existe déjà (normal)")
        else:
            print(f"   ❌ Erreur création utilisateur: {response.status_code}")
        
        # 5. Tester la création d'un admin
        print("\n5. Test de création d'admin...")
        test_admin = {
            "email": "admin@flexishop.com",
            "password": "admin123"
        }
        response = requests.post(f"{API_URL}/api/auth/create-admin", json=test_admin)
        if response.status_code == 201:
            admin_data = response.json()
            print(f"   ✅ Admin créé: {admin_data.get('email', 'N/A')}")
        elif response.status_code == 400:
            print("   ℹ️  Admin existe déjà (normal)")
        else:
            print(f"   ❌ Erreur création admin: {response.status_code}")
        
        print("\n✅ Vérification terminée!")
        
    except Exception as e:
        print(f"❌ Erreur: {e}")

if __name__ == "__main__":
    check_database()
