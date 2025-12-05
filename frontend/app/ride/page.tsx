"use client";
import { useEffect, useState } from "react";

export default function UserRideHistory() {
  const [rides, setRides] = useState([]);
  const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8000/rides/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setRides(data));
  }, [userId]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-yellow-600">My Ride History</h1>

      <div className="mt-6 space-y-4">
        {rides.map((r: any) => (
          <div key={r.id} className="p-4 border rounded-lg shadow bg-white">
            <p><b>Ride ID:</b> {r.id}</p>
            <p><b>Distance:</b> {r.distance_km} km</p>
            <p><b>Fare:</b> ₹{r.fare_amount}</p>
            <p><b>Status:</b> {r.status}</p>
            <p><b>Date:</b> {new Date(r.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
