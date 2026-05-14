import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import PageBackground from "@/components/PageBackground";
import bgRegister from "@/assets/bg-register.jpg";
import { EVENTS, COMBO_PRICE, generateRegNumber } from "@/lib/eventData";
import type { RegistrationData } from "@/lib/eventData";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [isCombo, setIsCombo] = useState(false);

  const toggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
    setIsCombo(false);
  };

  const selectCombo = () => {
    setIsCombo(true);
    setSelectedEvents(EVENTS.map((e) => e.id));
  };

  const totalAmount = isCombo
    ? COMBO_PRICE
    : EVENTS.filter((e) => selectedEvents.includes(e.id)).reduce((sum, e) => sum + e.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !collegeName || selectedEvents.length === 0) return;

    const data: RegistrationData = {
      name,
      email,
      phone,
      collegeName,
      selectedEvents,
      registrationNumber: generateRegNumber(),
      isCombo,
      totalAmount,
    };

    navigate("/payment", { state: data });
  };

  return (
    <PageBackground backgroundImage={bgRegister}>
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-4xl md:text-6xl text-primary text-glow-cyan mb-3 tracking-wider">
              REGISTER
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Enter the arena. Provide your credentials.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-border bg-card/50 p-6 md:p-8 mb-8 backdrop-blur-sm"
            >
              <h2 className="font-display text-lg text-primary tracking-wider mb-6">
                // PERSONAL_DATA
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: "NAME", value: name, setter: setName, type: "text", placeholder: "Enter your full name" },
                  { label: "EMAIL", value: email, setter: setEmail, type: "email", placeholder: "Enter your email" },
                  { label: "PHONE", value: phone, setter: setPhone, type: "tel", placeholder: "Enter phone number" },
                  { label: "COLLEGE", value: collegeName, setter: setCollegeName, type: "text", placeholder: "Enter college name" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="font-display text-xs tracking-widest text-muted-foreground mb-2 block">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-input border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:border-glow-cyan transition-all"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Event Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-border bg-card/50 p-6 md:p-8 mb-8 backdrop-blur-sm"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <h2 className="font-display text-lg text-primary tracking-wider">
                  // SELECT_EVENTS
                </h2>
                <button
                  type="button"
                  onClick={selectCombo}
                  className={`font-display text-xs px-5 py-2 border tracking-widest transition-all ${
                    isCombo
                      ? "border-secondary bg-secondary/20 text-secondary border-glow-magenta"
                      : "border-secondary text-secondary hover:bg-secondary/10"
                  }`}
                >
                  ⚡ COMBO - ₹{COMBO_PRICE}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {EVENTS.map((event) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    description={event.description}
                    type={event.type}
                    selected={selectedEvents.includes(event.id)}
                    onToggle={() => toggleEvent(event.id)}
                    price={event.price}
                  />
                ))}
              </div>
            </motion.div>

            {/* Summary & Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border border-border bg-card/50 p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-display text-xs tracking-widest text-muted-foreground">
                    {selectedEvents.length} EVENT(S) SELECTED {isCombo && "• COMBO"}
                  </div>
                  <div className="font-mono-cyber text-3xl text-primary text-glow-cyan mt-1">
                    ₹{totalAmount}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={selectedEvents.length === 0 || !name || !email || !phone || !collegeName}
                  className="font-display text-sm px-8 py-3 bg-primary text-primary-foreground border border-primary hover:bg-primary/80 transition-all border-glow-cyan tracking-widest disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  PROCEED TO PAYMENT →
                </button>
              </div>
            </motion.div>
          </form>
        </div>
      </div>
    </PageBackground>
  );
};

export default Register;
