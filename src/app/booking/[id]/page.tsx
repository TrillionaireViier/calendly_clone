"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Mock data
  const eventDetails = {
    "15min": { title: "15 Minute Meeting", duration: "15 min" },
    "30min": { title: "30 Minute Meeting", duration: "30 min" },
    "60min": { title: "1 Hour Consultation", duration: "60 min" },
  }[eventId] || { title: "Meeting", duration: "30 min" };

  const days = Array.from({ length: 14 }, (_, i) => i + 1); // Mock next 14 days
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "14:00"];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      router.push(`/booking/${eventId}/confirm`);
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-sidebar">
        <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.9rem", display: "inline-block", marginBottom: "2rem" }}>
          ← Back
        </Link>
        <h4 style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>
          Danila Vier
        </h4>
        <h1 className="page-title" style={{ fontSize: "1.75rem" }}>{eventDetails.title}</h1>
        <div style={{ color: "var(--text-muted)", marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          ⏱ {eventDetails.duration}
        </div>
      </div>
      
      <div className="booking-main">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.5rem" }}>Select a Date & Time</h2>
        
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>September 2026</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem", textAlign: "center" }}>
              {["S", "M", "T", "W", "T", "F", "S"].map(d => <div key={d} style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{d}</div>)}
              {Array.from({ length: 1 }, (_, i) => <div key={`empty-${i}`} />)}
              {days.map(d => (
                <button 
                  key={d}
                  onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                  style={{ 
                    padding: "0.75rem 0",
                    borderRadius: "50%",
                    background: selectedDate === d ? "var(--primary)" : "transparent",
                    color: selectedDate === d ? "white" : "var(--primary)",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => {
                    if (selectedDate !== d) e.currentTarget.style.background = "var(--surface)";
                  }}
                  onMouseOut={(e) => {
                    if (selectedDate !== d) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          
          {selectedDate && (
            <div style={{ flex: "0 0 200px" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "1rem", textAlign: "center" }}>
                Thursday, Sep {selectedDate}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", height: "300px", overflowY: "auto", paddingRight: "0.5rem" }}>
                {times.map(t => (
                  <div key={t} style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => setSelectedTime(t)}
                      className={`btn ${selectedTime === t ? "btn-primary" : "btn-outline"}`}
                      style={{ flex: 1, padding: "0.75rem" }}
                    >
                      {t}
                    </button>
                    {selectedTime === t && (
                      <button onClick={handleConfirm} className="btn btn-primary" style={{ flex: 1 }}>
                        Next
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
