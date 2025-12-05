from pydantic import BaseModel

class DriverCreate(BaseModel):
    name: str
    license_number: str
