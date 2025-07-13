readme: |
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

product-catalog/
├── backend/ # FastAPI app
│ ├── app/
│ │ ├── models/
│ │ ├── routers/
│ │ ├── schemas/
│ │ ├── core/
│ │ └── main.py
│ ├── .env
│ └── requirements.txt
│
├── frontend/ # React + Vite + Tailwind + ShadCN
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── lib/
│ │ └── App.tsx
│ ├── index.html
│ └── vite.config.ts
│
└── README.md

yaml
Copier
Modifier

---

## 🚀 Getting Started

### 🧠 Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL or SQLite

---

### 🔧 Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # or .venv\Scripts\activate on Windows

pip install -r requirements.txt
uvicorn app.main:app --reload
Create an admin user:

bash
Copier
Modifier
python create_admin.py
💻 Frontend (React)
bash
Copier
Modifier
cd frontend
npm install
npm run dev
🔐 Auth Flow
POST /auth/register – create account

POST /auth/login – get JWT token

GET /users/me – get current user

Authorization: Bearer <token> – required for all private routes

🛍️ Features
✅ Register / Login / Logout

✅ List & browse products

✅ Add to cart / remove / clear

✅ Checkout (create order from cart)

✅ View order history

⚠️ Stripe & MinIO coming soon

🌍 Deployment (Planned)
Docker & Nginx setup

PostgreSQL DB

Stripe live integration

File uploads to MinIO or S3

📚 Tech Stack
Layer	Stack
Frontend	React + Vite + TypeScript + Tailwind + ShadCN
Backend	FastAPI + SQLAlchemy + Pydantic + JWT
Database	PostgreSQL / SQLite
Auth	OAuth2 with Bearer JWT
Payment	Stripe (WIP)
Storage	MinIO / S3 (WIP)

📦 TODO
 Auth (register/login/logout)

 Cart + checkout

 Orders + history

 Stripe payments

 Product image uploads

 Admin dashboard (basic)

🧑‍💻 Author
Made with ❤️ by Rayyan Oumlil

🪪 License
MIT

yaml
Copier
Modifier

---

💡 Tu peux coller ce YAML dans un fichier `.yml`, ou extraire juste la partie `readme: |` pour la réutiliser dans des outils comme GitHub Actions, des générateurs de doc, ou un script `init`.

Souhaite-tu aussi un `setup.yml` complet (backend + frontend + install auto) ?
