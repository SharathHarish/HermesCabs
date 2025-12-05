from sqlmodel import SQLModel, Field
import uuid

class Rating(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    ride_id: str
    rating: int
    review: str
