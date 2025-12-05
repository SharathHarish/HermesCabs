"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { API_URL } from "@/lib/api";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const params = useSearchParams();
  const rideId = params.get("ride_id");

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.post(
      `${API_URL}/payments/create-intent`,
      { ride_id: Number(rideId) },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => setClientSecret(res.data.client_secret));
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    
    if (!card) {
      alert("Card element not found");
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      await axios.post(`${API_URL}/payments/confirm`, {
        payment_id: result.paymentIntent.id,
      });

      window.location.href = "/payment/success";
    }
  };

  return (
    <form onSubmit={handlePayment} className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg border">
      <h1 className="text-2xl mb-4 font-semibold">Complete Payment</h1>
      <CardElement className="border p-3 rounded" />
      <button 
        type="submit" 
        className="w-full mt-6 bg-black text-white py-3 rounded-lg"
      >
        Pay Now
      </button>
    </form>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="text-center mt-16">Loading payment form...</div>}>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Suspense>
  );
}
