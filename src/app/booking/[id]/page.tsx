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

  // Dynamic Date Logic
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyPrefixDays = Array.from({ length: firstDay }, (_, i) => i);
  const monthName = today.toLocaleString('default', { month: 'long' });

  // Mock data
  const eventDetails = {
    "15min": { title: "15 Minute Meeting", duration: "15 min" },
    "30min": { title: "30 Minute Meeting", duration: "30 min" },
    "45min": { title: "45 Minute Meeting", duration: "45 min" },
    "60min": { title: "1 Hour Consultation", duration: "60 min" },
  }[eventId] || { title: "Meeting", duration: "30 min" };

  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "13:30", "14:00", "14:30", "15:00", "16:00"];

  const handleConfirm = async () => {
    if (selectedDate && selectedTime) {
      // Trigger API Route to notify Admin via Telegram Bot
      try {
        await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            title: eventDetails.title,
            date: `${year}-${month + 1}-${selectedDate}`,
            time: selectedTime,
          })
        });
      } catch (err) {
        console.error("Failed to notify admin", err);
      }
      
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
        
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "1rem", textAlign: "center" }}>{monthName} {year}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem", textAlign: "center" }}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{d}</div>
              ))}
              
              {emptyPrefixDays.map(i => <div key={`empty-${i}`} />)}
              
              {daysArray.map(d => {
                const isPast = d < today.getDate();
                return (
                  <button 
                    key={d}
                    disabled={isPast}
                    onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                    style={{ 
                      padding: "0.75rem 0",
                      borderRadius: "50%",
                      background: selectedDate === d ? "var(--primary)" : "transparent",
                      color: selectedDate === d ? "white" : (isPast ? "var(--text-muted)" : "var(--primary)"),
                      fontWeight: 600,
                      cursor: isPast ? "not-allowed" : "pointer",
                      opacity: isPast ? 0.5 : 1,
                      border: "none",
                      outline: "none",
                      transition: "background 0.2s"
                    }}
                    onMouseOver={(e) => {
                      if (selectedDate !== d && !isPast) e.currentTarget.style.background = "var(--surface)";
                    }}
                    onMouseOut={(e) => {
                      if (selectedDate !== d && !isPast) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
          
          {selectedDate && (
            <div style={{ flex: "0 0 240px" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "1rem", textAlign: "center" }}>
                {new Date(year, month, selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", height: "300px", overflowY: "auto", paddingRight: "0.5rem" }}>
                {times.map(t => (
                  <div key={t} style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => setSelectedTime(t)}
                      className={`btn ${selectedTime === t ? "btn-primary" : "btn-outline"}`}
                      style={{ flex: 1, padding: "0.75rem", border: selectedTime === t ? "none" : "1px solid var(--primary)" }}
                    >
                      {t}
                    </button>
                    {selectedTime === t && (
                      <button onClick={handleConfirm} className="btn btn-primary" style={{ flex: 1, padding: "0.75rem" }}>
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
