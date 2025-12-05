// frontend/components/Navbar.js
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #eee" }}>
      <Link href="/"><a style={{ marginRight: 12 }}>Home</a></Link>
      <Link href="/book-ride"><a style={{ marginRight: 12 }}>Book Ride</a></Link>
      <Link href="/rides"><a style={{ marginRight: 12 }}>Rides</a></Link>
      <Link href="/drivers"><a style={{ marginRight: 12 }}>Drivers</a></Link>
      <Link href="/cabs"><a style={{ marginRight: 12 }}>Cabs</a></Link>

      <span style={{ float: "right" }}>
        {user ? (
          <>
            <span style={{ marginRight: 8 }}>Hi, {user.name || user.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login"><a style={{ marginRight: 8 }}>Login</a></Link>
            <Link href="/signup"><a>Sign up</a></Link>
          </>
        )}
      </span>
    </nav>
  );
}
