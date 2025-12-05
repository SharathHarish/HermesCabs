"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [activeTab, setActiveTab] = useState("ride");

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        {/* Golden-Beige Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#F5E9D3] via-white to-[#E8D6B1]/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,195,154,0.4),transparent_60%)]"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side */}
            <div className="animate-slide-in-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-[#5C4A2C]">
                Lightning Fast Cabs{" "}
                <span className="bg-gradient-to-r from-[#B89863] to-[#D8C39A] bg-clip-text text-transparent">
                  Hermes Cabs
                </span>
              </h1>

              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-[#F5E9D3]/60 backdrop-blur-sm p-1 rounded-xl w-fit border border-[#D2B892]/40">
                <button
                  onClick={() => setActiveTab("ride")}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === "ride"
                      ? "bg-[#B89863] text-white shadow-lg shadow-[#B89863]/40"
                      : "text-[#7A6240] hover:text-[#5C4A2C]"
                  }`}
                >
                  Ride
                </button>
              </div>

              {/* Booking Box */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 max-w-md border border-[#D2B892]/50 hover:border-[#B89863] transition-all duration-300 animate-scale-in">
                <div className="space-y-3">
                  {/* Pickup */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 bg-[#B89863] rounded-full"></div>
                    </div>

                    <input
                      type="text"
                      placeholder="Pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-white border border-[#D2B892]/50 rounded-xl outline-none focus:border-[#B89863] transition-all duration-300 text-[#5C4A2C] placeholder-[#A8906D]"
                    />
                  </div>

                  {/* Dropoff */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 bg-[#D8C39A] rounded-full"></div>
                    </div>

                    <input
                      type="text"
                      placeholder="Destination"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-white border border-[#D2B892]/50 rounded-xl outline-none focus:border-[#B89863] transition-all duration-300 text-[#5C4A2C] placeholder-[#A8906D]"
                    />
                  </div>

                  {/* Buttons */}
                  <Link
                    href="/book"
                    className="block w-full py-4 text-center text-white bg-[#B89863] hover:bg-[#A38352] rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    See prices
                  </Link>
                </div>
              </div>
            </div>

            {/* Phone Image Right */}
            <div className="hidden lg:flex items-center justify-center animate-slide-in-right">
              <div className="relative w-full max-w-[280px] xl:max-w-[320px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E8D6B1]/40 to-[#D8C39A]/40 rounded-[2.5rem] blur-3xl"></div>

                <div className="relative bg-gradient-to-br from-[#F5E9D3] to-white rounded-[2rem] p-2.5 shadow-2xl border border-[#D2B892]/50">
                  <div className="bg-white rounded-[1.75rem] overflow-hidden h-[560px] xl:h-[640px] flex items-center justify-center">
                    <div className="text-center space-y-3 animate-pulse">
                      <div className="w-14 h-14 xl:w-16 xl:h-16 bg-gradient-to-br from-[#B89863] to-[#D8C39A] rounded-full mx-auto flex items-center justify-center shadow-lg shadow-[#B89863]/40">
                        📍
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-[#E8D6B1] rounded w-24 mx-auto"></div>
                        <div className="h-2 bg-[#D8C39A]/70 rounded w-16 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
          

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="px-8 py-4 text-base font-medium text-white bg-[#B89863] hover:bg-[#A38352] rounded-xl shadow-lg hover:scale-105 transition-all min-w-[200px]"
              >
                Sign up to ride
              </Link>
              <Link
                href="/driver"
                className="px-8 py-4 text-base font-medium text-[#5C4A2C] bg-[#F5E9D3] hover:bg-[#E8D6B1] border border-[#D2B892]/50 rounded-xl hover:scale-105 transition-all min-w-[200px]"
              >
                Sign up to drive
              </Link>
            </div>
      </section>
    </main>
  );
}
