from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RideCreate(BaseModel):
    passenger_id: int
    pickup_location: str
    drop_location: str
    pickup_lat: Optional[float] = None
    pickup_lng: Optional[float] = None
    drop_lat: Optional[float] = None
    drop_lng: Optional[float] = None

class RideResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    passenger_id: Optional[int] = None
    cab_id: Optional[int] = None
    pickup_location: Optional[str] = None
    drop_location: Optional[str] = None
    pickup_lat: Optional[float] = None
    pickup_lng: Optional[float] = None
    drop_lat: Optional[float] = None
    drop_lng: Optional[float] = None
    distance_km: Optional[float] = None
    fare_amount: Optional[float] = None
    estimated_fare: Optional[float] = None
    status: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

