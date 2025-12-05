// Centralized API configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
