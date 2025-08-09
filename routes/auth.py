# routes/auth.py
from fastapi import APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer
from services.auth import AuthService
from schemas.user import UserCreate, UserResponse

router = APIRouter(prefix="/auth")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    return AuthService.register(user)

@router.post("/login")
async def login(user: UserCreate):
    return AuthService.login(user)