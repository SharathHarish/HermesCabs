"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl border-b shadow-md"
      style={{
        backgroundColor: "rgba(245, 233, 211, 0.7)",     // Golden beige glass
        borderColor: "rgba(210, 184, 146, 0.6)",         // Soft gold
        boxShadow: "0 4px 12px rgba(184, 152, 99, 0.25)" // Golden shadow
      }}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center group">
            <div
              className="text-2xl font-bold transition-all duration-300"
              style={{
                background: "linear-gradient(to right, #B89863, #7A6240)",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}>
              Hermes Cabs
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300"
                  style={{
                    color: "#5C4A2C",
                    border: "1px solid #D2B892",
                    backgroundColor: "#F5E9D3",
                  }}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300"
                  style={{
                    color: "#fff",
                    backgroundColor: "#B89863",
                    boxShadow: "0 2px 8px rgba(184,152,99,0.4)",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300"
                  style={{
                    color: "#5C4A2C",
                    backgroundColor: "#E8D6B1",
                    border: "1px solid #CDB48E"
                  }}
                >
                  Book a ride
                </Link>

                <Link
                  href="/book"
                  className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                  style={{
                    color: "#fff",
                    backgroundColor: "#B89863",
                    boxShadow: "0 3px 10px rgba(184, 152, 99, 0.45)"
                  }}
                >
                  About Us
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg transition-all duration-300"
            style={{ color: "#5C4A2C", backgroundColor: "rgba(232, 214, 177, 0.5)" }}
          >
            <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden animate-slide-up"
          style={{
            backgroundColor: "rgba(245, 233, 211, 0.9)",
            borderTop: "1px solid #D2B892"
          }}>
          
          <div className="px-4 py-4 space-y-1">
            <MobileItem name="Book" href="/book" />
            <MobileItem name="Drive" href="/driver" />
            <MobileItem name="About" href="/about" />
          </div>

          <div className="px-4 py-4 border-t" style={{ borderColor: "#D2B892" }}>
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="block w-full px-4 py-3 text-center text-sm font-medium rounded-lg transition-all"
                  style={{
                    backgroundColor: "#E8D6B1",
                    color: "#5C4A2C",
                    border: "1px solid #CDB48E"
                  }}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-3 text-center text-sm font-medium rounded-lg transition-all"
                  style={{
                    backgroundColor: "#B89863",
                    color: "white"
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block w-full px-4 py-3 text-center text-sm font-medium rounded-lg transition-all"
                  style={{
                    backgroundColor: "#EAD9BB",
                    color: "#5C4A2C"
                  }}
                >
                  Book a ride
                </Link>

                <Link
                  href="/signup"
                  className="block w-full px-4 py-3 text-center text-sm font-medium rounded-lg transition-all"
                  style={{
                    backgroundColor: "#B89863",
                    color: "white"
                  }}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/* DESKTOP NAV LINK */
function NavItem({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium transition-all duration-300"
      style={{
        color: "#7A6240",
      }}
    >
      {name}
    </Link>
  );
}

/* MOBILE NAV LINK */
function MobileItem({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-3 rounded-lg text-base transition-all duration-300"
      style={{
        color: "#5C4A2C",
        backgroundColor: "rgba(232,214,177,0.4)"
      }}
    >
      {name}
    </Link>
  );
}
