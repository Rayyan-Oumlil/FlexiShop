# 🛒 Product Catalog – Fullstack E-Commerce App

A fullstack eCommerce web application built with:

- ⚙️ **FastAPI** (Python) for the backend  
- 🎨 **React + TypeScript + Tailwind CSS + ShadCN UI** for the frontend  
- 🛢️ **PostgreSQL** for the database (or SQLite in development)  
- 🔐 **JWT Auth** (Login/Register)  
- 🛍️ Product browsing, cart, checkout, order history  
- 💳 Stripe integration (coming soon)  
- 🗃️ MinIO file storage (coming soon)

---

## 📁 Project Structure

```bash
product-catalog/
├── backend/              # FastAPI app
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── core/
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
│
├── frontend/             # React + Vite + Tailwind + ShadCN
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── lib/
│   │   └── App.tsx
│   ├── index.html
│   └── vite.config.ts
│
└── README.md
```

---

## 🚀 Getting Started

### 🧠 Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL or SQLite

### 🔧 Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # or .venv\Scripts\activate on Windows

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Create an admin user:

```bash
python create_admin.py
```

### 💻 Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Auth Flow

- `POST /auth/register` – create account  
- `POST /auth/login` – get JWT token  
- `GET /users/me` – get current user  
- `Authorization: Bearer <token>` – required for private routes

---

## 🛍️ Features

- ✅ Register / Login / Logout  
- ✅ List & browse products  
- ✅ Add to cart / remove / clear  
- ✅ Checkout (create order from cart)  
- ✅ View order history  
- ⚠️ Stripe & MinIO coming soon

---

## 🌍 Deployment (Planned)

- Docker & Nginx setup  
- PostgreSQL DB  
- Stripe live integration  
- File uploads to MinIO or S3

---

## 📚 Tech Stack

| Layer     | Stack                                         |
|-----------|-----------------------------------------------|
| Frontend  | React + Vite + TypeScript + Tailwind + ShadCN |
| Backend   | FastAPI + SQLAlchemy + Pydantic + JWT         |
| Database  | PostgreSQL / SQLite                           |
| Auth      | OAuth2 with Bearer JWT                        |
| Payment   | Stripe (WIP)                                  |
| Storage   | MinIO / S3 (WIP)                              |

---

## 📦 TODO

- [x] Auth (register/login/logout)  
- [x] Cart + checkout  
- [x] Orders + history  
- [ ] Stripe payments  
- [ ] Product image uploads  
- [ ] Admin dashboard (basic)

---

## 🧑‍💻 Author

Made with ❤️ by [Rayyan Oumlil](https://github.com/Rayyan-Oumlil)

---

## 🪪 License

MIT
