import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Users, ShieldCheck, FileText, BarChart3, LogOut, Ban, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin-dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — ProService Skills Network" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  const stats = [
    { label: "Total Users", value: "1,248", icon: Users, change: "+12%" },
    { label: "Active Pros", value: "329", icon: ShieldCheck, change: "+8%" },
    { label: "Open Requests", value: "87", icon: FileText, change: "+24%" },
    { label: "Revenue", value: "$12.4k", icon: BarChart3, change: "+15%" },
  ];

  const users = [
    { id: 1, name: "Alex Morgan", email: "alex@mail.com", role: "Customer", status: "active", joined: "Jan 2026" },
    { id: 2, name: "Sarah Chen", email: "sarah@mail.com", role: "Professional", status: "active", joined: "Dec 2025" },
    { id: 3, name: "Mike Johnson", email: "mike@mail.com", role: "Professional", status: "pending", joined: "Feb 2026" },
    { id: 4, name: "Lisa Park", email: "lisa@mail.com", role: "Customer", status: "suspended", joined: "Mar 2026" },
    { id: 5, name: "James Lee", email: "james@mail.com", role: "Professional", status: "active", joined: "Nov 2025" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="text-lg font-bold text-foreground">Pro<span className="gradient-text">Service</span> <span className="text-xs font-normal text-muted-foreground">Admin</span></Link>
          <Button asChild variant="ghost" size="sm"><Link to="/"><LogOut className="h-4 w-4" /></Link></Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-2xl font-bold text-foreground">Admin Dashboard</h1>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-xs text-success">{stat.change} this month</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
          {[
            { id: "users", label: "Users & Professionals" },
            { id: "requests", label: "Service Requests" },
            { id: "analytics", label: "Analytics" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>{tab.label}</button>
          ))}
        </div>

        {activeTab === "users" && (
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Joined</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-card-foreground">{user.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${user.role === "Professional" ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"}`}>{user.role}</span></td>
                      <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${user.status === "active" ? "bg-success/10 text-success" : user.status === "pending" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>{user.status}</span></td>
                      <td className="px-4 py-3 text-muted-foreground">{user.joined}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {user.status === "pending" && <Button variant="ghost" size="icon" className="h-8 w-8 text-success"><CheckCircle className="h-4 w-4" /></Button>}
                          {user.status !== "suspended" && <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Ban className="h-4 w-4" /></Button>}
                          {user.status === "suspended" && <Button variant="ghost" size="icon" className="h-8 w-8 text-success"><CheckCircle className="h-4 w-4" /></Button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="space-y-3">
            {[
              { id: "REQ-001", customer: "Alex Morgan", professional: "Mike Johnson", service: "Electricians", status: "pending", date: "May 6" },
              { id: "REQ-002", customer: "Lisa Park", professional: "Sarah Chen", service: "Video Editors", status: "accepted", date: "May 5" },
              { id: "REQ-003", customer: "Tom Wilson", professional: "Robert Diaz", service: "Photographers", status: "completed", date: "May 3" },
            ].map((req) => (
              <div key={req.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{req.id}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${req.status === "pending" ? "bg-warning/10 text-warning" : req.status === "accepted" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>{req.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-card-foreground"><strong>{req.customer}</strong> → <strong>{req.professional}</strong></p>
                    <p className="text-xs text-muted-foreground">{req.service} · {req.date}</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-semibold text-card-foreground">Top Services</h3>
              <div className="mt-4 space-y-3">
                {[
                  { name: "Electricians", pct: 28 },
                  { name: "Photographers", pct: 22 },
                  { name: "Video Editors", pct: 18 },
                  { name: "Car Mechanics", pct: 15 },
                ].map((svc) => (
                  <div key={svc.name}>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{svc.name}</span>
                      <span className="font-medium text-foreground">{svc.pct}%</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full gradient-primary" style={{ width: `${svc.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-semibold text-card-foreground">Request Summary</h3>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Completed", value: 142, icon: CheckCircle, color: "text-success" },
                  { label: "In Progress", value: 38, icon: FileText, color: "text-primary" },
                  { label: "Cancelled", value: 12, icon: XCircle, color: "text-destructive" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}