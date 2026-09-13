import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendly Clone",
  description: "A premium scheduling experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <header className="header" style={{ padding: "1rem 0", borderBottom: "1px solid var(--border)", background: "var(--background)" }}>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <h1 style={{ margin: 0, fontSize: "1.5rem", color: "var(--primary)" }}>CalendlyClone</h1>
            </Link>
            <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <Link href="/dashboard" style={{ textDecoration: "none", color: "var(--foreground)" }}>Dashboard</Link>
              <Link href="/admin" style={{ textDecoration: "none", color: "var(--foreground)" }}>Admin</Link>
              <Link href="/login" style={{ textDecoration: "none", color: "var(--foreground)" }}>Log In</Link>
              <Link href="/signup" className="btn btn-primary" style={{ textDecoration: "none" }}>Sign Up</Link>
            </nav>
          </div>
        </header>
        <main className="main-content" style={{ flex: 1, padding: "2rem 0" }}>
          {children}
        </main>
        <footer style={{ padding: "2rem 0", borderTop: "1px solid var(--border)", marginTop: "auto", textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          <div className="container">
            <p>&copy; {new Date().getFullYear()} CalendlyClone. All rights reserved.</p>
            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
              <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
