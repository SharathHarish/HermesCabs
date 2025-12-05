"use client";
import { useEffect, useState } from "react";

export default function AdminRideHistory() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/rides/all")
      .then((res) => res.json())
      .then((data) => setRides(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl text-yellow-700 font-bold">All Rides (Admin)</h1>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-yellow-200">
            <th className="p-2 border">Ride ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Cab</th>
            <th className="p-2 border">Distance</th>
            <th className="p-2 border">Fare</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {rides.map((r: any) => (
            <tr key={r.id} className="text-center">
              <td className="border p-2">{r.id}</td>
              <td className="border p-2">{r.user_id}</td>
              <td className="border p-2">{r.cab_id}</td>
              <td className="border p-2">{r.distance_km} km</td>
              <td className="border p-2">₹{r.fare_amount}</td>
              <td className="border p-2">{r.status}</td>
              <td className="border p-2">{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
