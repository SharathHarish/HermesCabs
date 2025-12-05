"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [rides, setRides] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRides: 0,
    activeRides: 0,
    totalSpent: 0
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch user rides
    const fetchRides = async () => {
      try {
        // Get user ID from token (you might need to decode JWT)
        // For now, we'll fetch all rides for the logged-in user
        const response = await fetch("http://localhost:8000/rides/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRides(data);
          
          // Calculate stats
          const active = data.filter((r: any) => r.status === "pending" || r.status === "active").length;
          const total = data.length;
          const spent = data.reduce((sum: number, r: any) => sum + (r.fare_amount || 0), 0);
          
          setStats({
            totalRides: total,
            activeRides: active,
            totalSpent: spent
          });
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
      
      setUser({ name: "User" });
      setLoading(false);
    };

    fetchRides();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
            <p className="text-gray-400">Manage your rides and account</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-300">Total Rides</h3>
              <span className="text-3xl">🚗</span>
            </div>
            <p className="text-4xl font-bold text-white">{stats.totalRides}</p>
            <p className="text-sm text-gray-400 mt-2">All time</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-300">Active Rides</h3>
              <span className="text-3xl">⚡</span>
            </div>
            <p className="text-4xl font-bold text-white">{stats.activeRides}</p>
            <p className="text-sm text-gray-400 mt-2">Currently active</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-300">Total Spent</h3>
              <span className="text-3xl">💰</span>
            </div>
            <p className="text-4xl font-bold text-white">₹{stats.totalSpent}</p>
            <p className="text-sm text-gray-400 mt-2">All time</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/book"
              className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 group"
            >
              <div className="text-3xl mb-2">🚕</div>
              <h3 className="font-bold text-white mb-1">Book a Ride</h3>
              <p className="text-sm text-white/80">Request a new ride</p>
            </Link>

            <Link
              href="/book"
              className="p-4 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-bold text-white mb-1">Saved Places</h3>
              <p className="text-sm text-gray-400">Manage locations</p>
            </Link>

            <Link
              href="/book"
              className="p-4 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-bold text-white mb-1">Payment</h3>
              <p className="text-sm text-gray-400">Manage payments</p>
            </Link>

            <Link
              href="/book"
              className="p-4 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-3xl mb-2">⚙️</div>
              <h3 className="font-bold text-white mb-1">Settings</h3>
              <p className="text-sm text-gray-400">Account settings</p>
            </Link>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Rides</h2>
          
          {rides.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-white mb-2">No rides yet</h3>
              <p className="text-gray-400 mb-6">Book your first ride to get started!</p>
              <Link
                href="/book"
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Book a Ride
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {rides.slice(0, 5).map((ride: any) => (
                <Link
                  key={ride.id}
                  href={`/ride/${ride.id}`}
                  className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">🚗</span>
                        <div>
                          <h3 className="font-bold text-white">Ride #{ride.id}</h3>
                          <p className="text-sm text-gray-400">
                            {new Date(ride.created_at).toLocaleDateString()} at {new Date(ride.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="ml-11 space-y-1">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5"></div>
                          <p className="text-sm text-gray-300">{ride.pickup_location}</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5"></div>
                          <p className="text-sm text-gray-300">{ride.drop_location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">₹{ride.fare_amount || 150}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        ride.status === "completed" ? "bg-green-500/20 text-green-300" :
                        ride.status === "active" ? "bg-blue-500/20 text-blue-300" :
                        "bg-yellow-500/20 text-yellow-300"
                      }`}>
                        {ride.status || "pending"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              
              {rides.length > 5 && (
                <Link
                  href="/rides"
                  className="block text-center py-3 text-purple-400 hover:text-purple-300 transition-colors duration-300"
                >
                  View all rides →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
