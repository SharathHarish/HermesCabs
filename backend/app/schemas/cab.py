from pydantic import BaseModel
from typing import Optional


class CabBase(BaseModel):
    cab_type: str
    registration_number: str
    driver_id: Optional[int] = None


class CabCreate(CabBase):
    pass


class CabResponse(CabBase):
    id: int
    is_available: bool

    class Config:
        from_attributes = True
