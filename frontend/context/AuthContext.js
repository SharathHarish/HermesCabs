// frontend/context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoadingAuth(false);
      return;
    }
    // fetch /auth/me
    api.get("/auth/me")
      .then(res => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoadingAuth(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
