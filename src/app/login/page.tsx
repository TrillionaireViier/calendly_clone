"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@calendly.clone") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", padding: "2rem", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>Log into your account</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Email Address</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }} 
            placeholder="admin@calendly.clone for admin access"
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Password</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }} 
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.75rem", fontSize: "1rem" }}>
          Log In
        </button>
      </form>
      <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
        Don't have an account? <Link href="/signup" style={{ color: "var(--primary)", textDecoration: "none" }}>Sign up</Link>
      </div>
    </div>
  );
}
