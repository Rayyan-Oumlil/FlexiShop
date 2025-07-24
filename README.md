# FlexiShop

A modern, fullstack e-commerce platform for seamless online shopping experiences.

---

## ✨ Overview

FlexiShop is a feature-rich e-commerce web application built with:
- **FastAPI** (Python) for a robust backend API
- **React + TypeScript + Vite + Tailwind CSS + ShadCN UI** for a beautiful, responsive frontend
- **PostgreSQL** (or SQLite for development) as the database
- **JWT Authentication** for secure user accounts

It supports user registration, product browsing, cart management, order placement, and order history. Admin features and advanced integrations are planned.

---

## 📁 Project Structure

```bash
FlexiShop/
├── backend/
│   └── app/
│       ├── core/         # Security, dependencies
│       ├── models/       # SQLAlchemy models
│       ├── routers/      # API endpoints (auth, products, cart, etc.)
│       ├── schemas/      # Pydantic schemas
│       ├── main.py       # FastAPI entrypoint
│       ├── database.py   # DB connection
│       └── ...
│   ├── create_admin.py   # Script to create admin user
│   ├── init_db.py        # DB initialization
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
- PostgreSQL (or SQLite for dev)

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
| Backend   | FastAPI, SQLAlchemy, Pydantic, JWT            |
| Database  | PostgreSQL / SQLite                           |
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
