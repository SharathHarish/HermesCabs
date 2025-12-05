from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from datetime import datetime
from app.database import Base

class Ride(Base):
    __tablename__ = "rides"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    cab_id = Column(Integer, ForeignKey("cabs.id"), nullable=True)
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True)
    passenger_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    pickup_location = Column(String)
    drop_location = Column(String)
    pickup_lat = Column(Float, nullable=True)
    pickup_lng = Column(Float, nullable=True)
    drop_lat = Column(Float, nullable=True)
    drop_lng = Column(Float, nullable=True)
    distance_km = Column(Float, nullable=True)
    fare = Column(Float, nullable=True)
    fare_amount = Column(Float, nullable=True)
    estimated_fare = Column(Float, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
