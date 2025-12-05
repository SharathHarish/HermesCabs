"use client";

import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbarOn = ["/dashboard"];
  const showNavbar = !hideNavbarOn.includes(pathname);
  const isHomePage = pathname === "/";

  return (
    <>
      {showNavbar && <Navbar />}

      <main className={isHomePage ? "" : "pt-16 min-h-screen"}>
        {children}
      </main>

      {!isHomePage && (
        <footer className="bg-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/about" className="hover:text-white transition">About us</a></li>
                  <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Products</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/book" className="hover:text-white transition">Ride</a></li>
                  <li><a href="/driver" className="hover:text-white transition">Drive</a></li>
                  <li><a href="#" className="hover:text-white transition">Business</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Global citizenship</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Safety</a></li>
                  <li><a href="#" className="hover:text-white transition">Diversity</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Travel</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Airports</a></li>
                  <li><a href="#" className="hover:text-white transition">Cities</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2025 Rydeon Technologies Inc.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Sitemap</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
