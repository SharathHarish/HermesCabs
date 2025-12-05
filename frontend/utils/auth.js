// utils/auth.js

// --------------------------------------------------
// GET TOKEN FROM LOCAL STORAGE
// --------------------------------------------------
export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

// --------------------------------------------------
// SAVE TOKEN
// --------------------------------------------------
export function saveToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
}

// --------------------------------------------------
// REMOVE TOKEN (LOGOUT)
// --------------------------------------------------
export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
}

// --------------------------------------------------
// FETCH LOGGED-IN USER DETAILS
// --------------------------------------------------
export async function getUser() {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch("http://localhost:8000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch user:", await res.text());
      return null;
    }

    const data = await res.json(); // { id, name, email, role }
    return data;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}
