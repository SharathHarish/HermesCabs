"use client";

import { useEffect, useRef, useState } from "react";

export default function SimpleMap({ setPickup, setDrop }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const dropMarkerRef = useRef(null);
  const stepRef = useRef("pickup");
  const [isLoading, setIsLoading] = useState(true);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    let isMounted = true;

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      if (!isMounted) return;
      
      setLeafletLoaded(true);
      // Fix default marker icon issue
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Initialize map if not already initialized
      if (!mapInstanceRef.current && mapRef.current) {
        // Default center: India (change to your preferred location)
        // Examples: [20.5937, 78.9629] = India, [51.505, -0.09] = London, [40.7128, -74.0060] = New York
        const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // No bounds - you can view the entire world!

        // Handle map clicks
        map.on("click", (e) => {
          const { lat, lng } = e.latlng;

          if (stepRef.current === "pickup") {
            // Remove old pickup marker if exists
            if (pickupMarkerRef.current) {
              map.removeLayer(pickupMarkerRef.current);
            }

            // Add new pickup marker
            pickupMarkerRef.current = L.marker([lat, lng]).addTo(map);
            pickupMarkerRef.current.bindPopup("Pickup Location").openPopup();

            setPickup({ lat, lng });
            stepRef.current = "drop";
          } else {
            // Remove old drop marker if exists
            if (dropMarkerRef.current) {
              map.removeLayer(dropMarkerRef.current);
            }

            // Add new drop marker
            dropMarkerRef.current = L.marker([lat, lng]).addTo(map);
            dropMarkerRef.current.bindPopup("Drop-off Location").openPopup();

            setDrop({ lat, lng });
          }
        });

        mapInstanceRef.current = map;

        // Fix map size after a short delay
        setTimeout(() => {
          map.invalidateSize();
          if (isMounted) {
            setIsLoading(false);
          }
        }, 100);
      }
    }).catch((error) => {
      console.error("Error loading Leaflet:", error);
      if (isMounted) {
        setIsLoading(false);
      }
    });

    // Cleanup
    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [setPickup, setDrop]);

  const handleReset = () => {
    if (mapInstanceRef.current) {
      if (pickupMarkerRef.current) {
        mapInstanceRef.current.removeLayer(pickupMarkerRef.current);
        pickupMarkerRef.current = null;
      }
      if (dropMarkerRef.current) {
        mapInstanceRef.current.removeLayer(dropMarkerRef.current);
        dropMarkerRef.current = null;
      }
    }
    setPickup(null);
    setDrop(null);
    stepRef.current = "pickup";
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        style={{ height: "500px", width: "100%" }}
        className="z-0"
      />
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${stepRef.current === "pickup" ? "bg-black" : "bg-green-500"}`}></div>
            <span className="font-medium text-gray-700">
              {stepRef.current === "pickup" ? "Click to select pickup location" : "Click to select drop-off location"}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-gray-600 hover:text-black transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
