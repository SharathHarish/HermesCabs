"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Remove JWT token or any stored auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page after clearing
    setTimeout(() => {
      router.push("/login");
    }, 500);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-primary">Logging you out...</h1>
      <p className="text-text-default mt-4">Please wait a moment.</p>
    </div>
  );
}
