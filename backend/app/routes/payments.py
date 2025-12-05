import stripe
from fastapi import APIRouter, Depends, HTTPException
from app.utils.token import get_current_user
from app.database import get_db
from app.models.ride import Ride
from app.models.payment import Payment
import os

router = APIRouter(prefix="/payments", tags=["Payments"])

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@router.post("/create-intent")
def create_payment_intent(data: dict, user=Depends(get_current_user), db=Depends(get_db)):
    ride_id = data["ride_id"]

    ride = db.query(Ride).filter(Ride.id == ride_id).first()
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")

    amount = int(ride.fare * 100)  # in paise

    intent = stripe.PaymentIntent.create(
        amount=amount,
        currency="inr",
        payment_method_types=["card"]
    )

    payment = Payment(
        ride_id=ride.id,
        amount=ride.fare,
        stripe_payment_id=intent["id"],
        status="created"
    )

    db.add(payment)
    db.commit()

    return {"client_secret": intent.client_secret}


@router.post("/confirm")
def confirm_payment(data: dict, db=Depends(get_db)):
    payment_id = data["payment_id"]

    payment = db.query(Payment).filter(
        Payment.stripe_payment_id == payment_id
    ).first()

    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    payment.status = "success"

    ride = db.query(Ride).filter(Ride.id == payment.ride_id).first()
    ride.status = "completed"

    # Free the cab
    ride.cab.status = "available"

    db.commit()

    return {"message": "Payment successful"}

