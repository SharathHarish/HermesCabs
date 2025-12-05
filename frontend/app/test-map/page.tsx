"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

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

export default function TestMapPage() {
  const [pickup, setPickup] = useState<{lat: number, lng: number} | null>(null);
  const [drop, setDrop] = useState<{lat: number, lng: number} | null>(null);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-white">Map Test Page</h1>
          <p className="text-gray-400">
            This page tests the map functionality without requiring login or database.
          </p>
        </div>

        {/* Map */}
        <div className="mb-8 animate-slide-up">
          <SimpleMap setPickup={setPickup} setDrop={setDrop} />
        </div>

        {/* Selected Coordinates */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-white/20 animate-slide-in-left">
            <h3 className="text-xl font-bold mb-4 text-white">📍 Pickup Location</h3>
            {pickup ? (
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-medium text-white">Latitude:</span> {pickup.lat.toFixed(6)}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium text-white">Longitude:</span> {pickup.lng.toFixed(6)}
                </p>
                <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/50">
                  <p className="text-sm text-green-300">✓ Pickup location selected!</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Click on the map to select pickup location</p>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-white/20 animate-slide-in-right">
            <h3 className="text-xl font-bold mb-4 text-white">🎯 Drop-off Location</h3>
            {drop ? (
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-medium text-white">Latitude:</span> {drop.lat.toFixed(6)}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium text-white">Longitude:</span> {drop.lng.toFixed(6)}
                </p>
                <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/50">
                  <p className="text-sm text-green-300">✓ Drop-off location selected!</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Click on the map again to select drop-off location</p>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur-xl animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h3 className="text-lg font-bold mb-3 text-white">📝 How to Use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Click anywhere on the map to select your <strong className="text-white">pickup location</strong></li>
            <li>A marker will appear and coordinates will show below</li>
            <li>Click on the map again to select your <strong className="text-white">drop-off location</strong></li>
            <li>A second marker will appear with its coordinates</li>
            <li>Use the "Reset" button to start over</li>
          </ol>
        </div>

        {/* Status */}
        {pickup && drop && (
          <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center backdrop-blur-xl animate-scale-in">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-2xl font-bold text-green-300 mb-2">
              Both Locations Selected!
            </h3>
            <p className="text-green-400">
              The map is working perfectly. You can now integrate this into your booking flow.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
