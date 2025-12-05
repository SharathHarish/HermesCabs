from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.ride import Ride
from app.schemas.ride import RideCreate, RideResponse
from typing import List
from app.models.cab import Cab

router = APIRouter(prefix="/rides", tags=["rides"])

@router.post("/book", response_model=RideResponse)
def book_ride(ride: RideCreate, db: Session = Depends(get_db)):
    # TODO: find nearest driver logic
    new_ride = Ride(
        passenger_id=ride.passenger_id,
        pickup_location=ride.pickup_location,
        drop_location=ride.drop_location,
        status="booked",
        estimated_fare=100.0  # temporary flat fare
    )
    db.add(new_ride)
    db.commit()
    db.refresh(new_ride)
    return new_ride

@router.patch("/{ride_id}/start")
def start_ride(ride_id: int, db: Session = Depends(get_db)):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()
    if ride:
        ride.status = "in-progress"
        db.commit()
        db.refresh(ride)
    return ride

@router.patch("/{ride_id}/complete")
def complete_ride(ride_id: int, db: Session = Depends(get_db)):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()
    if ride:
        ride.status = "completed"
        db.commit()
        db.refresh(ride)
    return ride
@router.get("/user/{user_id}", response_model=List[RideResponse])
def get_user_ride_history(user_id: int, db: Session = Depends(get_db)):
    rides = (
        db.query(Ride)
        .filter(Ride.user_id == user_id)
        .order_by(Ride.id.desc())
        .all()
    )
    return rides
@router.get("/driver/{driver_id}", response_model=List[RideResponse])
def get_driver_ride_history(driver_id: int, db: Session = Depends(get_db)):
    rides = (
        db.query(Ride)
        .join(Cab)
        .filter(Cab.driver_id == driver_id)
        .order_by(Ride.id.desc())
        .all()
    )
    return rides
@router.get("/all", response_model=List[RideResponse])
def get_all_rides(db: Session = Depends(get_db)):
    return db.query(Ride).order_by(Ride.id.desc()).all()

@router.get("/{ride_id}", response_model=RideResponse)
def get_ride(ride_id: int, db: Session = Depends(get_db)):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    return ride

@router.get("/", response_model=List[RideResponse])
def get_rides(db: Session = Depends(get_db)):
    """Get all rides (for authenticated user)"""
    return db.query(Ride).order_by(Ride.id.desc()).all()


