import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Zap, Users, Trophy } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import PageBackground from "@/components/PageBackground";
import bgHome from "@/assets/bg-home.jpg";
import { DEADLINE_DATE, COMBO_PRICE } from "@/lib/eventData";

const Index = () => {
  return (
    <PageBackground backgroundImage={bgHome}>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display text-xs md:text-sm tracking-[0.3em] text-muted-foreground mb-4"
          >
            DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-xl md:text-3xl text-secondary text-glow-magenta mb-2 tracking-wider"
          >
            GCE-CSE PRESENTS
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            className="font-display text-5xl md:text-8xl lg:text-9xl font-black text-primary text-glow-cyan mb-6 tracking-wider animate-flicker"
          >
            PROGEN'I-26
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-body text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            The ultimate inter-college technical symposium. Compete, innovate, and conquer in the cyber arena.
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-6"
          >
            <div className="font-display text-xs tracking-[0.2em] text-secondary mb-3">
              REGISTRATION CLOSES IN
            </div>
            <div className="flex justify-center">
              <CountdownTimer targetDate={DEADLINE_DATE} />
            </div>
            <div className="font-mono-cyber text-xs text-muted-foreground mt-3">
              DEADLINE: {DEADLINE_DATE.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </motion.div>

          {/* Combo Offer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-10 inline-block border border-secondary bg-secondary/10 px-6 py-3 border-glow-magenta"
          >
            <div className="font-display text-xs tracking-widest text-secondary mb-1">⚡ COMBO OFFER ⚡</div>
            <div className="font-body text-base text-foreground">
              Register for ALL events at just <span className="font-mono-cyber text-secondary text-glow-magenta">₹{COMBO_PRICE}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="font-display text-sm px-8 py-3 bg-primary text-primary-foreground border border-primary hover:bg-primary/80 transition-all border-glow-cyan tracking-widest flex items-center justify-center gap-2"
            >
              REGISTER NOW <ChevronRight size={16} />
            </Link>
            <Link
              to="/events"
              className="font-display text-sm px-8 py-3 bg-transparent text-secondary border border-secondary hover:bg-secondary/10 transition-all border-glow-magenta tracking-widest flex items-center justify-center gap-2"
            >
              VIEW EVENTS <Zap size={16} />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { icon: Zap, label: "EVENTS", value: "6" },
              { icon: Users, label: "COLLEGES", value: "50+" },
              { icon: Trophy, label: "PRIZES", value: "₹25K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon size={20} className="text-primary mx-auto mb-1" />
                <div className="font-mono-cyber text-xl text-foreground">{stat.value}</div>
                <div className="font-display text-[10px] tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageBackground>
  );
};

export default Index;
