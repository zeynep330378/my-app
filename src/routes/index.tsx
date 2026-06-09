import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star, Shield, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { serviceCategories, featuredProfessionals } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProService Skills Network — Find Skilled Professionals Near You" },
      { name: "description", content: "Connect with verified local professionals for video editing, electricians, renovation, photography and more." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServiceCategoriesSection />
      <HowItWorksSection />
      <FeaturedProfessionals />
      <CTASection />
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-primary py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" /> Find Pros Near You
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Skilled Professionals,<br />Right at Your Doorstep
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
            Connect with verified local experts for any job — from home renovation to wedding photography. Fast, reliable, and close by.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="hero-outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/services">Browse Services <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="xl" className="bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90">
              <Link to="/register">Join as Professional</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4" /> 300+ Professionals</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4" /> Verified & Trusted</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Location Matching</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCategoriesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Browse Service Categories</h2>
          <p className="mt-3 text-muted-foreground">Find the right professional for your needs</p>
        </motion.div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to="/services" className="group block rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: `color-mix(in oklch, ${cat.color} 12%, transparent)` }}>
                  <cat.icon className="h-6 w-6" style={{ color: cat.color }} />
                </div>
                <h3 className="font-semibold text-card-foreground">{cat.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                <p className="mt-3 text-xs font-medium text-primary">{cat.professionals} professionals →</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: Users, title: "Search Professionals", desc: "Browse verified local experts in your area" },
    { icon: MapPin, title: "Send a Request", desc: "Describe your needs and share your location" },
    { icon: Clock, title: "Get Matched", desc: "Nearby professionals respond to your request" },
    { icon: Star, title: "Job Done", desc: "Service completed, leave a review" },
  ];

  return (
    <section className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-3 text-muted-foreground">Four simple steps to get the help you need</p>
        </motion.div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
                <step.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="mb-2 text-xs font-bold text-primary">STEP {i + 1}</div>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProfessionals() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Top Professionals</h2>
            <p className="mt-2 text-muted-foreground">Highly rated experts near you</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex">
            <Link to="/services">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProfessionals.map((pro, i) => (
            <motion.div key={pro.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">{pro.avatar}</div>
                <div>
                  <h4 className="font-semibold text-card-foreground text-sm">{pro.name}</h4>
                  <p className="text-xs text-muted-foreground">{pro.title}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {pro.rating}</span>
                <span>({pro.reviews} reviews)</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {pro.distance}</span>
                <span className="text-sm font-semibold text-primary">${pro.hourlyRate}/hr</span>
              </div>
              <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                <Link to="/services">Request Service</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="gradient-primary py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">Ready to Get Started?</h2>
        <p className="mt-4 text-primary-foreground/80">Join thousands of customers and professionals already using ProService Skills Network.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="xl" className="bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90">
            <Link to="/register">Find a Professional</Link>
          </Button>
          <Button asChild variant="hero-outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link to="/register">Offer Your Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}