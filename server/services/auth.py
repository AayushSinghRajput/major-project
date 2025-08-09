# services/auth.py
from passlib.context import CryptContext
from models.user import User
from database import SessionLocal
from schemas.user import UserCreate, UserResponse
from fastapi import HTTPException


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    @staticmethod
    def register(user: UserCreate):
        db = SessionLocal()
        hashed_password = pwd_context.hash(user.password)
        db_user = User(email=user.email, password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return UserResponse(id=db_user.id, email=db_user.email)

    @staticmethod
    def login(user: UserCreate):
        db = SessionLocal()
        db_user = db.query(User).filter(User.email == user.email).first()
        if not db_user or not pwd_context.verify(user.password, db_user.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return {"access_token": "fake_token", "token_type": "bearer"}