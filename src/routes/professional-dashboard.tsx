import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Inbox, CheckCircle, DollarSign, Star, MapPin, ToggleLeft, ToggleRight, LogOut, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockRequests } from "@/lib/mock-data";

export const Route = createFileRoute("/professional-dashboard")({
  head: () => ({ meta: [{ title: "Professional Dashboard — ProService Skills Network" }] }),
  component: ProfessionalDashboard,
});

const statusColors: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  accepted: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  completed: "bg-primary/10 text-primary",
};

function ProfessionalDashboard() {
  const [available, setAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState("incoming");

  const stats = [
    { label: "Total Requests", value: "24", icon: Inbox },
    { label: "Accepted Jobs", value: "18", icon: CheckCircle },
    { label: "Earnings", value: "$2,450", icon: DollarSign },
    { label: "Rating", value: "4.9", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="text-lg font-bold text-foreground">Pro<span className="gradient-text">Service</span></Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setAvailable(!available)} className="flex items-center gap-2 text-sm">
              {available ? <ToggleRight className="h-6 w-6 text-success" /> : <ToggleLeft className="h-6 w-6 text-muted-foreground" />}
              <span className={available ? "text-success font-medium" : "text-muted-foreground"}>
                {available ? "Available" : "Offline"}
              </span>
            </button>
            <Button asChild variant="ghost" size="sm"><Link to="/"><LogOut className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Professional Dashboard</h1>
          <p className="text-sm text-muted-foreground">Sarah Chen · Senior Video Editor</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
          {[
            { id: "incoming", label: "Incoming Requests" },
            { id: "accepted", label: "Active Jobs" },
            { id: "reviews", label: "Reviews" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>{tab.label}</button>
          ))}
        </div>

        {activeTab === "incoming" && (
          <div className="space-y-3">
            {mockRequests.filter((r) => r.status === "pending").map((req) => (
              <motion.div key={req.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{req.id}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[req.status]}`}>{req.status}</span>
                    </div>
                    <h3 className="mt-1 font-semibold text-card-foreground">{req.customer}</h3>
                    <p className="text-sm text-muted-foreground">{req.message}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {req.distance}</span>
                      <span>{req.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="hero" size="sm">Accept</Button>
                    <Button variant="outline" size="sm">Decline</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "accepted" && (
          <div className="space-y-3">
            {mockRequests.filter((r) => r.status === "accepted").map((req) => (
              <div key={req.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-card-foreground">{req.customer}</h3>
                    <p className="text-sm text-muted-foreground">{req.message}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {req.distance}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Phone className="mr-1 h-3 w-3" /> Contact</Button>
                    <Button variant="default" size="sm">Mark Complete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-3">
            {[
              { customer: "Alex Morgan", rating: 5, comment: "Incredible video editing work! Highly recommended.", date: "May 3, 2026" },
              { customer: "Lisa Park", rating: 5, comment: "Very professional and delivered on time.", date: "Apr 28, 2026" },
              { customer: "Tom Wilson", rating: 4, comment: "Good quality work, fair pricing.", date: "Apr 20, 2026" },
            ].map((review, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center gap-2">
                  <div className="flex">{Array.from({ length: review.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-warning text-warning" />)}</div>
                  <span className="text-sm font-medium text-card-foreground">{review.customer}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                <p className="mt-1 text-xs text-muted-foreground">{review.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}