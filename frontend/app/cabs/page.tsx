"use client";

import { useEffect, useState } from "react";
import { getUser, getToken } from "../../utils/auth";

export default function CabsPage() {
  const [cabs, setCabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // ------------------------------------------------------------
  // FETCH USER + CABS
  // ------------------------------------------------------------
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });

    fetch("http://localhost:8000/cabs")
      .then((res) => res.json())
      .then((data) => {
        setCabs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cabs:", err);
        setLoading(false);
      });
  }, []);

  // ------------------------------------------------------------
  // BOOK CAB (POST /rides)
  // ------------------------------------------------------------
  async function bookCab(cabId: number) {
    if (!user) {
      alert("Please login first!");
      return;
    }

    const token = getToken();

    const res = await fetch("http://localhost:8000/rides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: user.id,
        cab_id: cabId,
        pickup: "Default Pickup", // You can replace with real inputs
        drop: "Default Drop"
      }),
    });

    if (res.ok) {
      alert("Ride booked successfully!");
    } else {
      alert("Error booking ride.");
    }
  }

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------

  if (loading) return <p style={{ padding: 20 }}>Loading cabs...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Cabs</h1>

      {cabs.length === 0 && <p>No cabs available.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {cabs.map((cab) => (
          <div
            key={cab.id}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              background: "#fafafa",
            }}
          >
            <h3>{cab.model}</h3>
            <p><b>Cab Number:</b> {cab.cab_number}</p>
            <p><b>Capacity:</b> {cab.capacity}</p>
            <p><b>Status:</b> {cab.status}</p>

            <button
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "black",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => bookCab(cab.id)}
            >
              Book Ride
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
