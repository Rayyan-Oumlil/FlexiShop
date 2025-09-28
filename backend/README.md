# FlexiShop API

API de commerce électronique avec authentification Supabase.

## 🚀 Démarrage rapide

1. **Installer les dépendances** :
   ```bash
   pip install -r requirements.txt
   ```

2. **Configurer l'environnement** :
   - Copiez `env.example` vers `.env`
   - Ajoutez vos clés Supabase

3. **Démarrer le serveur** :
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Tester l'API** :
   - Documentation : `http://localhost:8000/docs`
   - Health check : `http://localhost:8000/health`

## 📋 Endpoints disponibles

### 🔐 Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### 🛍️ E-commerce
- `GET /api/products` - Liste des produits
- `GET /api/cart` - Panier utilisateur
- `POST /api/orders` - Créer une commande

## 🔧 Configuration

Variables d'environnement requises dans `.env` :
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SECRET_KEY=your_secret_key
```

## 🎯 Utilisation avec Flutter

```dart
// Connexion
final response = await http.post(
  Uri.parse('${apiUrl}/api/auth/login'),
  headers: {'Content-Type': 'application/json'},
  body: json.encode({'email': email, 'password': password}),
);

final token = json.decode(response.body)['access_token'];

// Appels protégés
final meResponse = await http.get(
  Uri.parse('${apiUrl}/api/auth/me'),
  headers: {'Authorization': 'Bearer $token'},
);
```
