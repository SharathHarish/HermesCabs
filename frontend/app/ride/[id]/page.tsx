"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function RideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [ride, setRide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRide = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/rides/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setError("Ride not found");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setRide(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load ride details");
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRide();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-white text-xl">Loading ride details...</div>
      </div>
    );
  }

  if (error || !ride) {
    return (
      <div className="min-h-screen bg-black pt-20">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-12">
            <div className="text-6xl mb-6">🚗</div>
            <h1 className="text-3xl font-bold text-white mb-4">Ride Booked Successfully!</h1>
            <p className="text-gray-400 mb-8">
              Your ride has been confirmed. A driver will be assigned shortly.
            </p>
            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="block w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/book"
                className="block w-full py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300"
              >
                Book Another Ride
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-4"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white">Ride Details</h1>
        </div>

        {/* Ride Status */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Ride #{ride.id}</h2>
              <p className="text-gray-400">Status: <span className="text-green-400 font-medium">{ride.status || "Confirmed"}</span></p>
            </div>
            <div className="text-5xl">🚗</div>
          </div>
        </div>

        {/* Route Details */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <h3 className="text-xl font-bold text-white mb-4">Route</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-purple-400 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-400">Pickup</p>
                <p className="text-white font-medium">{ride.pickup_location}</p>
              </div>
            </div>
            <div className="border-l-2 border-dashed border-white/20 ml-1.5 h-8"></div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-400">Drop-off</p>
                <p className="text-white font-medium">{ride.drop_location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ride Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <h3 className="text-lg font-bold text-white mb-4">Fare Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Base Fare</span>
                <span className="text-white font-medium">₹{ride.fare_amount || "150"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Distance</span>
                <span className="text-white font-medium">{ride.distance_km || "5"} km</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="text-white font-bold">Total</span>
                <span className="text-white font-bold text-xl">₹{ride.fare_amount || "150"}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <h3 className="text-lg font-bold text-white mb-4">Driver Info</h3>
            <div className="text-center py-4">
              <div className="text-4xl mb-2">👤</div>
              <p className="text-gray-400 text-sm">Driver will be assigned shortly</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Link
            href="/dashboard"
            className="block py-3 text-center bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/book"
            className="block py-3 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book Another Ride
          </Link>
        </div>
      </div>
    </div>
  );
}
