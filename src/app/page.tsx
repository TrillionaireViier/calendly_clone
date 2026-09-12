import Link from "next/link";

export default function Home() {
  const eventTypes = [
    { id: "15min", title: "15 Minute Meeting", duration: "15 mins", type: "1-on-1" },
    { id: "30min", title: "30 Minute Meeting", duration: "30 mins", type: "1-on-1" },
    { id: "60min", title: "1 Hour Consultation", duration: "60 mins", type: "1-on-1" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 className="page-title">My Link</h2>
          <p className="page-subtitle">calendly.com/danilavier</p>
        </div>
        <button className="btn btn-primary">+ New Event Type</button>
      </div>

      <div className="event-grid">
        {eventTypes.map((event) => (
          <div key={event.id} className="event-card">
            <h3 className="event-title">{event.title}</h3>
            <div className="event-meta">
              <span>⏱ {event.duration}</span>
              <span>👤 {event.type}</span>
            </div>
            <div className="event-actions">
              <button className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                Copy link
              </button>
              <Link href={`/booking/${event.id}`} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
