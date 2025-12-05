from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.driver import Driver
from app.schemas.driver import DriverCreate

router = APIRouter(prefix="/drivers", tags=["Drivers"])

@router.post("/")
def create_driver(data: DriverCreate, db: Session = Depends(get_db)):
    driver = Driver(**data.dict())
    db.add(driver)
    db.commit()
    db.refresh(driver)
    return driver

@router.get("/available")
def get_available_drivers(db: Session = Depends(get_db)):
    return db.query(Driver).all()
