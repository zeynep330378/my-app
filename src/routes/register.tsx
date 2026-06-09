import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — ProService Skills Network" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const [role, setRole] = useState<"customer" | "professional">("customer");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "professional") navigate({ to: "/professional-dashboard" });
    else navigate({ to: "/customer-dashboard" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join ProService Skills Network today</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="mb-6 flex rounded-lg bg-muted p-1">
              {(["customer", "professional"] as const).map((r) => (
                <button key={r} onClick={() => setRole(r)} className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${role === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
                  {r === "customer" ? "I need a service" : "I offer services"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">First name</label>
                  <input className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="John" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Last name</label>
                  <input className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Doe" required />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <input type="email" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
                <input type="tel" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+1 (555) 000-0000" required />
              </div>
              {role === "professional" && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Service category</label>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required>
                    <option value="">Select a category</option>
                    <option>Video Editors</option><option>Electricians</option><option>House Renovation</option><option>Wedding Makeup</option><option>Photographers</option><option>Computer Technicians</option><option>Car Mechanics</option><option>Emergency Medical</option>
                  </select>
                </div>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
                <input type="password" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" required />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">Create Account</Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}