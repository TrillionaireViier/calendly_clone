"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [eventTypes, setEventTypes] = useState([
    { id: "15min", title: "15 Minute Meeting", duration: "15 mins", type: "1-on-1" },
    { id: "30min", title: "30 Minute Meeting", duration: "30 mins", type: "1-on-1" },
    { id: "60min", title: "1 Hour Consultation", duration: "60 mins", type: "1-on-1" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", duration: "30", type: "1-on-1" });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const id = newEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setEventTypes([...eventTypes, { 
      id, 
      title: newEvent.title, 
      duration: `${newEvent.duration} mins`, 
      type: newEvent.type 
    }]);
    setIsModalOpen(false);
    setNewEvent({ title: "", duration: "30", type: "1-on-1" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 className="page-title">My Link</h2>
          <p className="page-subtitle">calendly.com/danilavier</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ New Event Type</button>
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

      {isModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", 
          alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            background: "var(--background)", padding: "2rem", borderRadius: "var(--radius)",
            width: "100%", maxWidth: "500px", border: "1px solid var(--border)"
          }}>
            <h2 style={{ marginBottom: "1.5rem" }}>Create New Event Type</h2>
            <form onSubmit={handleCreateEvent}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>Event Name</label>
                <input 
                  required
                  type="text" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
                  placeholder="e.g. Quick Chat"
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>Duration (minutes)</label>
                <select 
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
                >
                  <option value="15">15 mins</option>
                  <option value="30">30 mins</option>
                  <option value="45">45 mins</option>
                  <option value="60">60 mins</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
