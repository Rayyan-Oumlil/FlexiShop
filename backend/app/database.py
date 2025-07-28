from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Configuration pour Render et développement local
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./catalog.db")

# Configuration pour SQLite (développement local et Render)
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    # Configuration pour PostgreSQL (Render)
    # Render fournit une URL PostgreSQL, mais on peut forcer SQLite pour simplifier
    if os.getenv("RENDER", "false").lower() == "true":
        # Sur Render, utiliser SQLite avec disque persistant
        engine = create_engine(
            "sqlite:///./catalog.db", connect_args={"check_same_thread": False}
        )
    else:
        # Configuration pour PostgreSQL (si vous changez plus tard)
        engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()