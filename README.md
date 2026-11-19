# FlexiShop

A modern, fullstack e-commerce platform for seamless online shopping experiences.

---

## ✨ Overview

FlexiShop is a feature-rich e-commerce web application built with:
- **FastAPI** (Python) for a robust backend API
- **React + TypeScript + Vite + Tailwind CSS + ShadCN UI** for a beautiful, responsive frontend
- **Supabase (PostgreSQL)** as the database, accessed through its REST API
- **JWT Authentication** for secure user accounts

It supports user registration, product browsing, cart management, order placement, and order history. Admin features and advanced integrations are planned.

---

## 📁 Project Structure

```bash
FlexiShop/
├── backend/
│   └── app/
│       ├── config.py     # Settings
│       ├── routers/      # API endpoints (auth, products, cart, etc.)
│       ├── schemas.py    # Pydantic schemas
│       ├── main.py       # FastAPI entrypoint
│       ├── database.py   # Supabase client
│       ├── supabase_rest.py  # REST helpers
│       └── ...
│   ├── supabase_tables.sql  # Database schema
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── pages/        # Main app pages (Home, Products, Cart, etc.)
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # API and utility functions
│   │   └── ...
│   ├── index.html
│   └── ...
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- A Supabase project (PostgreSQL); schema in `backend/supabase_tables.sql`

### Backend (FastAPI)
```bash
cd backend
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Create an admin user:
```bash
python app/create_admin.py
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow
- Register: `POST /auth/register`
- Login: `POST /auth/login` (returns JWT)
- Get current user: `GET /users/me` (JWT required)
- Use `Authorization: Bearer <token>` for protected routes

---

## 🛍️ Features
- User registration, login, logout
- Product catalog browsing
- Add/remove/clear cart items
- Checkout and order creation
- View order history
- Admin user (script)
- [Planned] Stripe payments
- [Planned] Product image uploads (MinIO/S3)
- [Planned] Admin dashboard

---

## 🛠️ Tech Stack
| Layer     | Stack                                         |
|-----------|-----------------------------------------------|
| Frontend  | React, Vite, TypeScript, Tailwind, ShadCN UI  |
| Backend   | FastAPI, Pydantic, JWT                        |
| Database  | Supabase (PostgreSQL)                         |
| Auth      | OAuth2 with JWT Bearer                        |
| Payment   | Stripe (planned)                              |
| Storage   | MinIO / S3 (planned)                          |

---

## 📦 Roadmap / TODO
- [x] Auth (register/login/logout)
- [x] Cart & checkout
- [x] Orders & history
- [ ] Stripe payments
- [ ] Product image uploads
- [ ] Admin dashboard

---

## 👤 Author
Made with ❤️ by [Rayyan Oumlil](https://github.com/Rayyan-Oumlil)

---

## 🪪 License
MIT
