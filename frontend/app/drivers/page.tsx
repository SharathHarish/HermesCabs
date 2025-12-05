"use client";

import { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDrivers() {
    try {
      const token = getToken();
      const res = await fetch("http://localhost:8000/drivers/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setDrivers(data);
    } catch (err) {
      console.error("Error loading drivers:", err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleAvailability(id: number, current: boolean) {
    try {
      const token = getToken();

      await fetch(`http://localhost:8000/drivers/${id}/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_available: !current }),
      });

      fetchDrivers(); // refresh
    } catch (err) {
      console.error("Error updating driver:", err);
    }
  }

  useEffect(() => {
    fetchDrivers();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Drivers</h1>

      <ul>
        {drivers.map((d: any) => (
          <li
            key={d.id}
            style={{
              marginBottom: 20,
              padding: 15,
              border: "1px solid #ccc",
              borderRadius: 6,
            }}
          >
            <p><b>Name:</b> {d.name}</p>
            <p><b>Phone:</b> {d.phone}</p>
            <p>
              <b>Status:</b>{" "}
              <span style={{ color: d.is_available ? "green" : "red" }}>
                {d.is_available ? "Available" : "Not Available"}
              </span>
            </p>

            <button
              onClick={() => toggleAvailability(d.id, d.is_available)}
              style={{
                padding: "6px 10px",
                background: d.is_available ? "red" : "green",
                color: "white",
                border: 0,
                borderRadius: 4,
              }}
            >
              {d.is_available ? "Mark Unavailable" : "Mark Available"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
