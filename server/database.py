# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pymongo import MongoClient

# MySQL (SQLAlchemy)
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://user:password@localhost/smarted"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# MongoDB
mongo_client = MongoClient("mongodb://localhost:27017")
mongodb = mongo_client.smarted