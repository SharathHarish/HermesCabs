from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.utils.hash import hash_password, verify_password
from app.utils.token import create_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ---------------------------------------
# REGISTER USER
# ---------------------------------------
@router.post("/register")
def register_user(name: str, email: str, password: str, db: Session = Depends(get_db)):
    # Check if user exists
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user
    new_user = User(
        name=name,
        email=email,
        password=hash_password(password),
        role="customer"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered", "user_id": new_user.id}


# ---------------------------------------
# LOGIN USER (JWT TOKEN)
# ---------------------------------------
@router.post("/login")
def login_user(email: str, password: str, db: Session = Depends(get_db)):
    # Fetch user
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verify password
    if not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid password")

    # Create JWT
    token = create_token({
        "id": user.id,
        "email": user.email,
        "role": user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }
