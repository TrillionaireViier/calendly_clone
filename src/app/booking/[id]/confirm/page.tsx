import Link from "next/link";

export default function ConfirmPage() {
  return (
    <div style={{ maxWidth: "600px", margin: "4rem auto", textAlign: "center", background: "var(--surface)", padding: "4rem 2rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-md)", border: "1px solid var(--border)" }}>
      <div style={{ width: "64px", height: "64px", background: "#22c55e", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1.5rem" }}>
        ✓
      </div>
      <h1 className="page-title" style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>You are scheduled</h1>
      <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
        A calendar invitation has been sent to your email address.
      </p>
      
      <div style={{ background: "var(--background)", padding: "1.5rem", borderRadius: "var(--radius)", textAlign: "left", marginBottom: "2rem", border: "1px solid var(--border)" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Danila Vier</h3>
        <p style={{ color: "var(--text-muted)", marginBottom: "0.25rem" }}>Meeting Type</p>
        <p style={{ color: "var(--text-muted)" }}>Web conferencing details to follow.</p>
      </div>
      
      <Link href="/" className="btn btn-outline">
        Back to Home
      </Link>
    </div>
  );
}
