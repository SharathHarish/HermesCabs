from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.cab import Cab
from app.models.driver import Driver
from app.schemas.cab import CabCreate, CabResponse

router = APIRouter(prefix="/cabs", tags=["cabs"])


# ---------------------------
# ADMIN — ADD CAB
# ---------------------------
@router.post("/", response_model=CabResponse)
def add_cab(cab: CabCreate, db: Session = Depends(get_db)):
    # Validate driver exists
    driver = None
    if cab.driver_id:
        driver = db.query(Driver).filter(Driver.id == cab.driver_id).first()
        if not driver:
            raise HTTPException(status_code=404, detail="Driver not found")

    new_cab = Cab(
        cab_type=cab.cab_type,
        registration_number=cab.registration_number,
        driver_id=cab.driver_id,
        is_available=True
    )

    db.add(new_cab)
    db.commit()
    db.refresh(new_cab)
    return new_cab


# ---------------------------
# ADMIN — DELETE CAB
# ---------------------------
@router.delete("/{cab_id}")
def delete_cab(cab_id: int, db: Session = Depends(get_db)):
    cab = db.query(Cab).filter(Cab.id == cab_id).first()
    if not cab:
        raise HTTPException(status_code=404, detail="Cab not found")

    db.delete(cab)
    db.commit()
    return {"message": "Cab deleted successfully"}


# ---------------------------
# ADMIN — UPDATE CAB
# ---------------------------
@router.put("/{cab_id}", response_model=CabResponse)
def update_cab(cab_id: int, cab_data: CabCreate, db: Session = Depends(get_db)):
    cab = db.query(Cab).filter(Cab.id == cab_id).first()
    if not cab:
        raise HTTPException(status_code=404, detail="Cab not found")

    cab.cab_type = cab_data.cab_type
    cab.registration_number = cab_data.registration_number
    cab.driver_id = cab_data.driver_id

    db.commit()
    db.refresh(cab)
    return cab


# ---------------------------
# ADMIN — ASSIGN DRIVER TO CAB
# ---------------------------
@router.patch("/{cab_id}/assign-driver/{driver_id}")
def assign_driver(cab_id: int, driver_id: int, db: Session = Depends(get_db)):
    cab = db.query(Cab).filter(Cab.id == cab_id).first()
    driver = db.query(Driver).filter(Driver.id == driver_id).first()

    if not cab:
        raise HTTPException(status_code=404, detail="Cab not found")
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")

    cab.driver_id = driver_id
    db.commit()
    return {"message": "Driver assigned successfully"}


# ---------------------------
# USER — GET AVAILABLE CABS
# ---------------------------
@router.get("/available", response_model=List[CabResponse])
def get_available_cabs(db: Session = Depends(get_db)):
    return db.query(Cab).filter(Cab.is_available == True).all()


# ---------------------------
# USER — GET CABS BY TYPE
# ---------------------------
@router.get("/type/{cab_type}", response_model=List[CabResponse])
def get_cabs_by_type(cab_type: str, db: Session = Depends(get_db)):
    return db.query(Cab).filter(Cab.cab_type == cab_type).all()


# ---------------------------
# ADMIN — GET ALL CABS
# ---------------------------
@router.get("/", response_model=List[CabResponse])
def get_all_cabs(db: Session = Depends(get_db)):
    return db.query(Cab).all()
