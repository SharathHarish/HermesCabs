"use client";

import { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://rydeon.onrender.com";

export default function RidesPage() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRides() {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/rides/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setRides(data);
    } catch (err) {
      console.error("Error fetching rides:", err);
    } finally {
      setLoading(false);
    }
  }

  async function cancelRide(id: number) {
    try {
      const token = getToken();
      await fetch(`${API_URL}/rides/${id}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRides(); // refresh
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  }

  useEffect(() => {
    fetchRides();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Rides</h1>

      {rides.length === 0 ? (
        <p>No rides found.</p>
      ) : (
        <ul>
          {rides.map((r: any) => (
            <li key={r.id} style={{ marginBottom: 15 }}>
              <p><b>Cab:</b> {r.cab?.model} ({r.cab?.plate})</p>
              <p><b>Status:</b> {r.status}</p>
              <p><b>Pickup:</b> {r.pickup}</p>
              <p><b>Drop:</b> {r.drop}</p>

              {r.status === "scheduled" && (
                <button
                  onClick={() => cancelRide(r.id)}
                  style={{
                    padding: "6px 10px",
                    background: "red",
                    color: "white",
                    border: 0,
                    borderRadius: 4,
                  }}
                >
                  Cancel Ride
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
