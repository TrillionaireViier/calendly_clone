"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);

  // In a real application, bookings would be fetched from the database
  const mockBookings = [
    { id: 1, title: "30 Minute Meeting", date: "2026-09-15", time: "10:00", name: "Alice Johnson" },
    { id: 2, title: "1 Hour Consultation", date: "2026-09-16", time: "14:00", name: "Bob Smith" },
  ];

  const handleTestNotification = async () => {
    setNotificationStatus("Sending...");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: "test",
          title: "Test Notification Event",
          date: new Date().toISOString().split('T')[0],
          time: "12:00",
        })
      });
      
      if (res.ok) {
        setNotificationStatus("Sent successfully! Check Telegram.");
      } else {
        setNotificationStatus("Failed to send. Check console/API logs.");
      }
    } catch (err) {
      setNotificationStatus("Error sending notification.");
    }
    
    setTimeout(() => setNotificationStatus(null), 5000);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 className="page-title">Admin Dashboard</h1>
        <button className="btn btn-primary" onClick={handleTestNotification}>
          Test TG Notification
        </button>
      </div>

      {notificationStatus && (
        <div style={{ padding: "1rem", marginBottom: "2rem", background: "var(--surface)", border: "1px solid var(--primary)", borderRadius: "var(--radius)", color: "var(--primary)" }}>
          {notificationStatus}
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Make sure you have set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your environment variables.
          </div>
        </div>
      )}

      <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Upcoming Bookings</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {mockBookings.map(booking => (
          <div key={booking.id} style={{ background: "var(--surface)", padding: "1.5rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{booking.title}</h3>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                with <strong>{booking.name}</strong>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 600 }}>{booking.date}</div>
              <div style={{ color: "var(--text-muted)" }}>{booking.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
