"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const params = useParams();
  const username = params.username as string;

  // Mock data for the user's available events
  const eventTypes = [
    { id: "15min", title: "15 Minute Meeting", duration: "15 mins", type: "1-on-1" },
    { id: "30min", title: "30 Minute Meeting", duration: "30 mins", type: "1-on-1" },
    { id: "45min", title: "45 Minute Meeting", duration: "45 mins", type: "1-on-1" },
    { id: "60min", title: "1 Hour Consultation", duration: "60 mins", type: "1-on-1" },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "4rem auto", padding: "0 1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ 
          width: "80px", height: "80px", borderRadius: "50%", background: "var(--primary)", 
          color: "white", display: "flex", alignItems: "center", justifyContent: "center", 
          fontSize: "2rem", margin: "0 auto 1rem", fontWeight: "bold"
        }}>
          {username.charAt(0).toUpperCase()}
        </div>
        <h1 className="page-title">{username}</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
          Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.
        </p>
      </div>

      <div className="event-grid">
        {eventTypes.map((event) => (
          <Link key={event.id} href={`/${username}/${event.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div className="event-card" style={{ cursor: "pointer", transition: "transform 0.2s", display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ flex: 1 }}>
                <h3 className="event-title" style={{ marginBottom: "0.5rem" }}>{event.title}</h3>
                <div className="event-meta" style={{ display: "flex", gap: "1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  <span>⏱ {event.duration}</span>
                  <span>👤 {event.type}</span>
                </div>
              </div>
              <div style={{ marginTop: "1.5rem", color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem" }}>
                Book Event →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
