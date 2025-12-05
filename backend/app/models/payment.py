from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    ride_id = Column(Integer, ForeignKey("rides.id"))
    stripe_payment_id = Column(String)
    amount = Column(Float)
    status = Column(String, default="pending")
