import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 0" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Scheduling Infrastructure for <span style={{ color: "var(--primary)" }}>Everyone</span>
      </h1>
      <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 3rem", lineHeight: "1.6" }}>
        CalendlyClone is your hub for scheduling meetings professionally and efficiently, eliminating the hassle of back-and-forth emails so you can get back to work.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "4rem" }}>
        <Link href="/signup" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
          Sign Up for Free
        </Link>
        <Link href="/dashboard" className="btn btn-outline" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
          View Demo Dashboard
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", textAlign: "left", marginTop: "4rem" }}>
        <div style={{ padding: "2rem", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Create simple rules</h3>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
            Let CalendlyClone know your availability preferences and it does the work for you.
          </p>
        </div>
        <div style={{ padding: "2rem", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Share your link</h3>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
            Share your CalendlyClone links via email or embed it on your website.
          </p>
        </div>
        <div style={{ padding: "2rem", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Get booked</h3>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
            They pick a time and the event is added to your calendar automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
