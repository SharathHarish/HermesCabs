"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Login failed");
        setLoading(false);
        return;
      }

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Network error:", err);
      setError("Failed to connect to the server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a2925] via-[#1f1e1b] to-[#0f0e0c] px-4 py-12">
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c7b38a10] via-transparent to-[#b49b6a10]"></div>
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#d8c39a20] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-[#bfa67d20] rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f3e5c7] to-[#d8c39a] bg-clip-text text-transparent">Hermes Cabs</h1>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-[#f3e5c710] backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-[#d8c39a30] animate-slide-up">
          <h2 className="text-2xl font-bold mb-2 text-[#f8f1e3]">Welcome</h2>
          <p className="text-[#cfc7b5] mb-8">Log in to continue</p>

          {error && <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"><p className="text-red-300 text-sm">{error}</p></div>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#e8ddc7] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-[#f3e5c705] border border-[#d8c39a30] rounded-xl outline-none focus:bg-[#f3e5c719] focus:border-[#d8c39a80] text-[#f8f1e3] placeholder-[#bba98d]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e8ddc7] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 bg-[#f3e5c705] border border-[#d8c39a30] rounded-xl outline-none focus:bg-[#f3e5c719] focus:border-[#d8c39a80] text-[#f8f1e3] placeholder-[#bba98d]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#d8c39a] to-[#bfa67d] text-black rounded-xl font-medium hover:from-[#e2ccaa] hover:to-[#c7b389] disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#cfc7b5] text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#d8c39a] font-medium hover:text-[#f3e5c7]">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
