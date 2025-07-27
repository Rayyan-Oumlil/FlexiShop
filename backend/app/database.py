from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Utiliser la variable d'environnement DATABASE_URL si disponible (Render)
# Sinon utiliser SQLite en local
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./catalog.db")

# Configuration spéciale pour SQLite
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    # Pour PostgreSQL (Render) - gérer les problèmes SSL
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    # Configuration pour éviter les problèmes SSL
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        pool_recycle=300,
        connect_args={
            "sslmode": "require"
        } if "postgresql" in DATABASE_URL else {}
    )

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()