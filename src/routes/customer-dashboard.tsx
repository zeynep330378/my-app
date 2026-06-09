import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Send, Bookmark, Bell, Clock, MapPin, Plus, Star, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockRequests, serviceCategories } from "@/lib/mock-data";

export const Route = createFileRoute("/customer-dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ProService Skills Network" }] }),
  component: CustomerDashboard,
});

const statusColors: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  accepted: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  completed: "bg-primary/10 text-primary",
};

function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("requests");
  const [showNewRequest, setShowNewRequest] = useState(false);
  const tabs = [
    { id: "requests", label: "My Requests", icon: Send },
    { id: "saved", label: "Saved Pros", icon: Bookmark },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "history", label: "History", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="text-lg font-bold text-foreground">Pro<span className="gradient-text">Service</span></Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Alex Morgan</span>
            <Button asChild variant="ghost" size="sm"><Link to="/"><LogOut className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome, Alex</h1>
            <p className="text-sm text-muted-foreground">Manage your service requests</p>
          </div>
          <Button variant="hero" onClick={() => setShowNewRequest(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Request
          </Button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Total Requests", value: "12", color: "primary" },
            { label: "Pending", value: "3", color: "warning" },
            { label: "Completed", value: "8", color: "success" },
            { label: "Saved Pros", value: "5", color: "accent" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "requests" && (
          <div className="space-y-3">
            {mockRequests.map((req) => (
              <motion.div key={req.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{req.id}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[req.status]}`}>{req.status}</span>
                    </div>
                    <h3 className="mt-1 font-semibold text-card-foreground">{req.service}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{req.message}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {req.distance}</span>
                      <span>{req.date}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "saved" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[{ name: "Emily Rose", title: "Bridal Makeup", rating: 5.0, avatar: "ER" }, { name: "Anna Wells", title: "IT Specialist", rating: 4.9, avatar: "AW" }].map((pro, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">{pro.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">{pro.name}</h4>
                    <p className="text-xs text-muted-foreground">{pro.title}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {pro.rating}</div>
                <Button variant="outline" size="sm" className="mt-3 w-full">Send Request</Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-3">
            {["Your request REQ-002 has been accepted!", "Emily Rose sent you a message", "Rate your recent service with Tom"].map((msg, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full gradient-primary" />
                  <p className="text-sm text-card-foreground">{msg}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-3">
            {mockRequests.filter((r) => r.status === "completed").map((req) => (
              <div key={req.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-card-foreground">{req.service}</h3>
                    <p className="text-sm text-muted-foreground">{req.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{req.date}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[req.status]}`}>{req.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {showNewRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={() => setShowNewRequest(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-elevated" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-card-foreground">New Service Request</h2>
              <form className="mt-4 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowNewRequest(false); }}>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Service Category</label>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required>
                    <option value="">Select a service</option>
                    {serviceCategories.map((c) => <option key={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Request Details</label>
                  <textarea className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" rows={3} placeholder="Describe what you need..." required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Your Location</label>
                  <div className="flex gap-2">
                    <input className="flex-1 rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter your address..." required />
                    <Button type="button" variant="outline"><MapPin className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowNewRequest(false)}>Cancel</Button>
                  <Button type="submit" variant="hero" className="flex-1">Send Request</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}