from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Temporairement forcer SQLite pour éviter les problèmes PostgreSQL SSL
# TODO: Revenir à PostgreSQL quand les problèmes SSL seront résolus
DATABASE_URL = "sqlite:///./catalog.db"

# Configuration pour SQLite
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()