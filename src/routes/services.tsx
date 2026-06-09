import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, MapPin, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { serviceCategories, featuredProfessionals } from "@/lib/mock-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Browse Services — ProService Skills Network" },
      { name: "description", content: "Explore all service categories and find skilled professionals near you." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfessionals = [
    ...featuredProfessionals,
    { id: 5, name: "David Kim", title: "House Renovator", category: "House Renovation", rating: 4.6, reviews: 56, hourlyRate: 70, location: "Westside", distance: "1.8 km", avatar: "DK" },
    { id: 6, name: "Anna Wells", title: "IT Specialist", category: "Computer Technicians", rating: 4.9, reviews: 78, hourlyRate: 60, location: "Central", distance: "0.5 km", avatar: "AW" },
    { id: 7, name: "Robert Diaz", title: "Photographer", category: "Photographers", rating: 4.8, reviews: 92, hourlyRate: 75, location: "Northside", distance: "2.0 km", avatar: "RD" },
    { id: 8, name: "Grace Liu", title: "EMT Professional", category: "Emergency Medical", rating: 5.0, reviews: 34, hourlyRate: 90, location: "Downtown", distance: "0.3 km", avatar: "GL" },
  ];

  const filtered = allProfessionals.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Browse Services</h1>
          <p className="mt-2 text-muted-foreground">Find verified professionals near your location</p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search professionals..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <Button variant="outline" size="default"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <button onClick={() => setActiveCategory("all")} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeCategory === "all" ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>All</button>
          {serviceCategories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.title)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeCategory === cat.title ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>{cat.title}</button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((pro, i) => (
            <motion.div key={pro.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">{pro.avatar}</div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{pro.name}</h3>
                  <p className="text-xs text-muted-foreground">{pro.title}</p>
                </div>
              </div>
              <div className="mt-2 inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{pro.category}</div>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {pro.rating}</span>
                <span>({pro.reviews} reviews)</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {pro.distance}</span>
                <span className="text-sm font-bold text-primary">${pro.hourlyRate}/hr</span>
              </div>
              <Button asChild variant="default" size="sm" className="mt-4 w-full">
                <Link to="/customer-dashboard">Request Service</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}