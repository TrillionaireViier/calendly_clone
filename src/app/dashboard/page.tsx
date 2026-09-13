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
  
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [editingWorkflowId, setEditingWorkflowId] = useState<number | null>(null);
  const [newWorkflow, setNewWorkflow] = useState({ name: "", description: "", active: true });
  const [activeTab, setActiveTab] = useState("event_types");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [workflows, setWorkflows] = useState([
    { id: 1, name: "Email reminder to invitee", description: "Send an email to invitee 24 hours before event", active: true },
    { id: 2, name: "Text reminder to host", description: "Send a text to host 1 hour before event", active: false },
    { id: 3, name: "Thank you email", description: "Send a thank you email to invitee after event", active: true },
  ]);

  const username = "danyloviier";

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

  const handleWorkflowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWorkflowId !== null) {
      setWorkflows(workflows.map(w => w.id === editingWorkflowId ? { ...w, ...newWorkflow } : w));
    } else {
      const newId = workflows.length > 0 ? Math.max(...workflows.map(w => w.id)) + 1 : 1;
      setWorkflows([...workflows, { id: newId, ...newWorkflow }]);
    }
    setIsWorkflowModalOpen(false);
    setNewWorkflow({ name: "", description: "", active: true });
    setEditingWorkflowId(null);
  };

  const openEditWorkflow = (wf: { id: number; name: string; description: string; active: boolean }) => {
    setEditingWorkflowId(wf.id);
    setNewWorkflow({ name: wf.name, description: wf.description, active: wf.active });
    setIsWorkflowModalOpen(true);
  };

  const handleDeleteWorkflow = () => {
    if (editingWorkflowId !== null) {
      setWorkflows(workflows.filter(w => w.id !== editingWorkflowId));
      setIsWorkflowModalOpen(false);
      setNewWorkflow({ name: "", description: "", active: true });
      setEditingWorkflowId(null);
    }
  };

  const filteredEvents = eventTypes.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ display: "flex", gap: "2rem", minHeight: "70vh" }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: "250px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button className="btn btn-outline" style={{ textAlign: "left", padding: "1rem", border: "none", background: "var(--surface)", fontWeight: 600 }}>🏠 Home</button>
        <button className="btn btn-outline" style={{ textAlign: "left", padding: "1rem", border: "none", color: "var(--text-muted)" }}>📅 Availability</button>
        <button className="btn btn-outline" style={{ textAlign: "left", padding: "1rem", border: "none", color: "var(--text-muted)" }}>🔗 Integrations</button>
        <button className="btn btn-outline" style={{ textAlign: "left", padding: "1rem", border: "none", color: "var(--text-muted)" }}>⚙️ Help & Settings</button>
      </aside>

      {/* Main Dashboard Content */}
      <main style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
                D
              </div>
              <div>
                <h2 style={{ fontSize: "1.5rem", margin: 0 }}>Danila Vier</h2>
                <Link href={`/${username}`} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
                  calendly.clone/{username}
                </Link>
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ New Event Type</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "2rem", borderBottom: "1px solid var(--border)", marginBottom: "2rem" }}>
          <button 
            onClick={() => setActiveTab("event_types")}
            style={{ padding: "1rem 0", background: "none", border: "none", borderBottom: activeTab === "event_types" ? "2px solid var(--primary)" : "2px solid transparent", color: activeTab === "event_types" ? "var(--foreground)" : "var(--text-muted)", cursor: "pointer", fontWeight: 600, fontSize: "1rem" }}
          >
            Event Types
          </button>
          <button 
            onClick={() => setActiveTab("scheduled")}
            style={{ padding: "1rem 0", background: "none", border: "none", borderBottom: activeTab === "scheduled" ? "2px solid var(--primary)" : "2px solid transparent", color: activeTab === "scheduled" ? "var(--foreground)" : "var(--text-muted)", cursor: "pointer", fontWeight: 600, fontSize: "1rem" }}
          >
            Scheduled Events
          </button>
          <button 
            onClick={() => setActiveTab("workflows")}
            style={{ padding: "1rem 0", background: "none", border: "none", borderBottom: activeTab === "workflows" ? "2px solid var(--primary)" : "2px solid transparent", color: activeTab === "workflows" ? "var(--foreground)" : "var(--text-muted)", cursor: "pointer", fontWeight: 600, fontSize: "1rem" }}
          >
            Workflows
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "event_types" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <input 
                type="text" 
                placeholder="🔍 Filter event types..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: "0.75rem", width: "300px", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
              />
            </div>

            <div className="event-grid">
              {filteredEvents.map((event) => (
                <div key={event.id} className="event-card" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-meta" style={{ marginBottom: "1rem" }}>
                      <span>⏱ {event.duration}</span>
                      <span>👤 {event.type}</span>
                    </div>
                  </div>
                  <div className="event-actions" style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
                    <button className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", border: "none", background: "var(--background)" }}>
                      🔗 Copy link
                    </button>
                    <Link href={`/${username}/${event.id}`} className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", border: "none", background: "var(--background)" }}>
                      👁️ View Page
                    </Link>
                  </div>
                </div>
              ))}
              {filteredEvents.length === 0 && (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "var(--text-muted)", background: "var(--surface)", borderRadius: "var(--radius)" }}>
                  No event types found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "scheduled" && (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "var(--foreground)" }}>No Upcoming Events</h3>
            <p>You have no scheduled events for the upcoming week.</p>
          </div>
        )}

        {activeTab === "workflows" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Your Workflows</h3>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setEditingWorkflowId(null);
                  setNewWorkflow({ name: "", description: "", active: true });
                  setIsWorkflowModalOpen(true);
                }}
              >
                + Create Workflow
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {workflows.map(wf => (
                <div key={wf.id} style={{ padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", display: "flex", flexDirection: "column", gap: "1rem", transition: "all 0.2s ease" }}>
                  <div>
                    <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "var(--foreground)" }}>{wf.name}</h4>
                    <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.4" }}>{wf.description}</p>
                  </div>
                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                      <input 
                        type="checkbox" 
                        checked={wf.active} 
                        onChange={() => setWorkflows(workflows.map(w => w.id === wf.id ? {...w, active: !w.active} : w))}
                        style={{ width: "1.2rem", height: "1.2rem", accentColor: "var(--primary)", cursor: "pointer" }} 
                      />
                      <span style={{ fontSize: "0.9rem", fontWeight: 500, color: wf.active ? "var(--foreground)" : "var(--text-muted)" }}>{wf.active ? "Active" : "Inactive"}</span>
                    </label>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem", background: "var(--background)" }}
                      onClick={() => openEditWorkflow(wf)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* New Event Modal */}
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

      {/* Workflow Modal */}
      {isWorkflowModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", 
          alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            background: "var(--background)", padding: "2rem", borderRadius: "var(--radius)",
            width: "100%", maxWidth: "500px", border: "1px solid var(--border)"
          }}>
            <h2 style={{ marginBottom: "1.5rem" }}>{editingWorkflowId ? "Edit Workflow" : "Create Workflow"}</h2>
            <form onSubmit={handleWorkflowSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>Workflow Name</label>
                <input 
                  required
                  type="text" 
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
                  placeholder="e.g. Email reminder"
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>Description</label>
                <textarea 
                  required
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)", minHeight: "80px", resize: "vertical" }}
                  placeholder="What does this workflow do?"
                />
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", justifyContent: "space-between" }}>
                <div>
                  {editingWorkflowId && (
                    <button type="button" className="btn btn-outline" style={{ color: "#ef4444", borderColor: "#ef4444" }} onClick={handleDeleteWorkflow}>Delete</button>
                  )}
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button type="button" className="btn btn-outline" onClick={() => setIsWorkflowModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingWorkflowId ? "Save" : "Create"}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

