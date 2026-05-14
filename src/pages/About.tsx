import { motion } from "framer-motion";
import { MapPin, Mail, Globe, Calendar } from "lucide-react";
import PageBackground from "@/components/PageBackground";
import bgHome from "@/assets/bg-home.jpg";

const About = () => {
  return (
    <PageBackground backgroundImage={bgHome}>
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-6xl text-primary text-glow-cyan mb-3 tracking-wider">
              ABOUT
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              The mission behind PROGEN'I-26
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-border bg-card/50 p-6 md:p-8 mb-6 backdrop-blur-sm"
          >
            <h2 className="font-display text-lg text-primary tracking-wider mb-4">// THE_SYMPOSIUM</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
              PROGEN'I-26 is the flagship technical symposium organized by the Department of Computer Science and Engineering at GCE. 
              It brings together the brightest minds from colleges across the region to compete, innovate, and network.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Featuring a mix of technical and non-technical events, PROGEN'I-26 offers something for everyone — 
              from hardcore coders to creative thinkers. Join us for a day of intense competition, learning, and fun.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-border bg-card/50 p-6 backdrop-blur-sm"
            >
              <h2 className="font-display text-sm text-secondary tracking-wider mb-4">// CONTACT</h2>
              <div className="space-y-3">
                {[
                  { icon: Mail, text: "cse@gce.edu" },
                  { icon: Globe, text: "www.gce.edu" },
                  { icon: MapPin, text: "Government College of Engineering" },
                  { icon: Calendar, text: "March 2026" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={16} className="text-secondary" />
                    <span className="font-body text-sm text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border border-border bg-card/50 p-6 backdrop-blur-sm"
            >
              <h2 className="font-display text-sm text-secondary tracking-wider mb-4">// WHY_ATTEND</h2>
              <ul className="space-y-2">
                {[
                  "Compete in 6 thrilling events",
                  "Win prizes worth ₹25,000+",
                  "Network with 50+ colleges",
                  "Learn from industry experts",
                  "Certificates for all participants",
                ].map((item) => (
                  <li key={item} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default About;
