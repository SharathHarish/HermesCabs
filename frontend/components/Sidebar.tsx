"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Dashboard", link: "/dashboard" },
  { label: "Cabs", link: "/cabs" },
  { label: "Rides", link: "/rides" },
  { label: "Drivers", link: "/drivers" },
  { label: "Logout", link: "/logout" }
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-60 bg-white border-r shadow-sm h-screen p-4 flex flex-col gap-3">
      {menu.map((item) => (
        <Link
          key={item.link}
          href={item.link}
          className={`p-3 rounded-lg font-medium transition 
            ${path === item.link 
              ? "bg-gold text-white shadow"
              : "text-dark hover:bg-goldLight hover:text-white"
            }`}
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
