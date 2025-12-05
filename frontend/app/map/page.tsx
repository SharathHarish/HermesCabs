"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

const SimpleMap = dynamic(() => import("@/components/SimpleMap"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <p className="text-xl text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const router = useRouter();
  const [pickup, setPickup] = useState<{lat: number, lng: number} | null>(null);
  const [drop, setDrop] = useState<{lat: number, lng: number} | null>(null);

  const handleContinue = () => {
    if (pickup && drop) {
      const params = new URLSearchParams({
        pickup: JSON.stringify(pickup),
        drop: JSON.stringify(drop),
      });
      router.push(`/book?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl shadow-sm border-b border-white/20 sticky top-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Select your route</h1>
              <p className="text-gray-400 text-sm mt-1">
                Click on the map to select pickup and drop-off locations
              </p>
            </div>
            <Link
              href="/book"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
            >
              <span>← Back</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 animate-slide-up">
          <SimpleMap setPickup={setPickup} setDrop={setDrop} />
        </div>

        {/* Continue Button */}
        {pickup && drop && (
          <div className="mt-6 flex justify-center animate-scale-in">
            <button
              onClick={handleContinue}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.05] active:scale-[0.95]"
            >
              Continue to ride selection →
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-bold mb-2 text-white">Select Pickup</h3>
            <p className="text-sm text-gray-400">Click on the map to mark your pickup location</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-bold mb-2 text-white">Select Drop-off</h3>
            <p className="text-sm text-gray-400">Click again to mark your destination</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-bold mb-2 text-white">Continue</h3>
            <p className="text-sm text-gray-400">Review and select your ride option</p>
          </div>
        </div>
      </div>
    </div>
  );
}
