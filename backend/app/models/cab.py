from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Cab(Base):
    __tablename__ = "cabs"

    id = Column(Integer, primary_key=True, index=True)
    cab_type = Column(String, nullable=False)  # mini, sedan, suv
    registration_number = Column(String, unique=True, nullable=False)
    is_available = Column(Boolean, default=True)

    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True)

    driver = relationship("Driver", back_populates="cab")
