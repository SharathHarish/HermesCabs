# app/utils/token.py

from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.database import SessionLocal
from app.models.user import User
import os
from typing import Optional

# Load environment secret
SECRET_KEY = os.getenv("JWT_SECRET", "SUPER_SECRET_CHANGE_THIS")   # change later for production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24   # 24 hours

security = HTTPBearer()


# ---------------------------------------------------------
# 1) CREATE ACCESS TOKEN
# ---------------------------------------------------------
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Generate a JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ---------------------------------------------------------
# 2) VERIFY TOKEN & GET CURRENT USER
# ---------------------------------------------------------
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    """Extracts user from Bearer Token, validates token, fetches user from DB."""
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # try both possible keys just in case
        user_id = payload.get("id") or payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token is invalid or expired")

    # Fetch user from DB
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
    finally:
        db.close()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
