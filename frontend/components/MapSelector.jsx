"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

// Fix Leaflet Marker Icons
const pickupIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const dropIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function MapSelector({ setPickup, setDrop }) {
  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropMarker, setDropMarker] = useState(null);
  const [step, setStep] = useState("pickup");

  function LocationSelector() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        if (step === "pickup") {
          setPickup({ lat, lng });
          setPickupMarker([lat, lng]);
          setStep("drop");
        } else {
          setDrop({ lat, lng });
          setDropMarker([lat, lng]);
        }
      },
    });
    return null;
  }

  const handleReset = () => {
    setPickupMarker(null);
    setDropMarker(null);
    setPickup(null);
    setDrop(null);
    setStep("pickup");
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200" style={{ minHeight: "500px" }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%", minHeight: "500px" }}
        whenCreated={(map) => {
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        }}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <LocationSelector />

        {pickupMarker && <Marker position={pickupMarker} icon={pickupIcon} />}
        {dropMarker && <Marker position={dropMarker} icon={dropIcon} />}
      </MapContainer>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${step === "pickup" ? "bg-black" : "bg-green-500"}`}></div>
            <span className="font-medium text-gray-700">
              {step === "pickup" ? "Click to select pickup location" : "Click to select drop-off location"}
            </span>
          </div>
          {(pickupMarker || dropMarker) && (
            <button
              onClick={handleReset}
              className="text-sm text-gray-600 hover:text-black transition"
            >
              Reset
            </button>
          )}
        </div>
        {pickupMarker && dropMarker && (
          <div className="mt-3 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              ✓ Both locations selected! Close the map to see ride options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
