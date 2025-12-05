from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta

# SECURITY SETTINGS
SECRET_KEY = "2623b6908982f001bcc7af61f575b625f78131d7130b160dabc1ec995dc35056"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# PASSWORD HASHER
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# USER MODEL
class User(BaseModel):
    username: str
    password: str

# TEMP STORAGE (Replace with DB later)
fake_db = {}

# FASTAPI APP
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# HELPERS
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)

def create_access_token(data: dict, expires_delta: int = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta or ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ---------- API ROUTES ---------- #

@app.post("/signup")
def signup(user: User):
    if user.username in fake_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_pw = hash_password(user.password)
    fake_db[user.username] = hashed_pw
    
    return {"message": "Signup successful"}

@app.post("/login")
def login(user: User):
    if user.username not in fake_db:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    if not verify_password(user.password, fake_db[user.username]):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/verify")
def verify(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"valid": True, "username": payload["sub"]}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
