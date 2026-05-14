import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import PageBackground from "@/components/PageBackground";
import bgEvents from "@/assets/bg-events.jpg";
import { EVENTS } from "@/lib/eventData";

const Events = () => {
  const [filter, setFilter] = useState<"all" | "tech" | "non-tech">("all");

  const filtered = filter === "all" ? EVENTS : EVENTS.filter((e) => e.type === filter);

  return (
    <PageBackground backgroundImage={bgEvents}>
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-4xl md:text-6xl text-primary text-glow-cyan mb-3 tracking-wider">
              EVENTS
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Choose your battleground. Compete. Dominate.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex justify-center gap-3 mb-10">
            {(["all", "tech", "non-tech"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-display text-xs tracking-widest px-5 py-2 border transition-all ${
                  filter === f
                    ? "border-primary bg-primary/10 text-primary border-glow-cyan"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {f.toUpperCase().replace("-", " ")}
              </button>
            ))}
          </div>

          {/* Event Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <EventCard
                  title={event.title}
                  description={event.description}
                  type={event.type}
                  price={event.price}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              to="/register"
              className="font-display text-sm px-8 py-3 bg-primary text-primary-foreground border border-primary hover:bg-primary/80 transition-all border-glow-cyan tracking-widest inline-block"
            >
              REGISTER FOR EVENTS
            </Link>
          </motion.div>
        </div>
      </div>
    </PageBackground>
  );
};

export default Events;
