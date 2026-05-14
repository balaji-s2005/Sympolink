import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode, Copy, Check } from "lucide-react";
import { useState } from "react";
import PageBackground from "@/components/PageBackground";
import bgPayment from "@/assets/bg-payment.jpg";
import { EVENTS } from "@/lib/eventData";
import type { RegistrationData } from "@/lib/eventData";

const UPI_ID = "gcecse@upi";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as RegistrationData | null;
  const [copied, setCopied] = useState(false);

  if (!data) {
    navigate("/register");
    return null;
  }

  const selectedEventDetails = EVENTS.filter((e) => data.selectedEvents.includes(e.id));

  const copyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmPayment = () => {
    navigate("/success", { state: data });
  };

  return (
    <PageBackground backgroundImage={bgPayment}>
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-4xl md:text-6xl text-primary text-glow-cyan mb-3 tracking-wider">
              PAYMENT
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Complete the transaction to secure your slot.
            </p>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-border bg-card/50 p-6 md:p-8 mb-6 backdrop-blur-sm"
          >
            <h2 className="font-display text-sm tracking-widest text-primary mb-4">// ORDER_SUMMARY</h2>
            <div className="space-y-3 mb-4">
              {selectedEventDetails.map((event) => (
                <div key={event.id} className="flex justify-between items-center">
                  <span className="font-body text-foreground">{event.title}</span>
                  <span className="font-mono-cyber text-sm text-muted-foreground">
                    {data.isCombo ? "COMBO" : `₹${event.price}`}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-display text-sm tracking-wider text-foreground">TOTAL</span>
              <span className="font-mono-cyber text-2xl text-primary text-glow-cyan">₹{data.totalAmount}</span>
            </div>
          </motion.div>

          {/* Registration Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-border bg-card/50 p-6 md:p-8 mb-6 backdrop-blur-sm"
          >
            <h2 className="font-display text-sm tracking-widest text-primary mb-4">// REGISTRATION_ID</h2>
            <div className="font-mono-cyber text-2xl text-secondary text-glow-magenta text-center py-3">
              {data.registrationNumber}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div>
                <span className="font-display text-[10px] tracking-widest text-muted-foreground">NAME</span>
                <p className="font-body text-foreground">{data.name}</p>
              </div>
              <div>
                <span className="font-display text-[10px] tracking-widest text-muted-foreground">EMAIL</span>
                <p className="font-body text-foreground break-all">{data.email}</p>
              </div>
              <div>
                <span className="font-display text-[10px] tracking-widest text-muted-foreground">PHONE</span>
                <p className="font-body text-foreground">{data.phone}</p>
              </div>
              <div>
                <span className="font-display text-[10px] tracking-widest text-muted-foreground">COLLEGE</span>
                <p className="font-body text-foreground">{data.collegeName}</p>
              </div>
            </div>
          </motion.div>

          {/* QR / UPI Payment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-border bg-card/50 p-6 md:p-8 mb-6 backdrop-blur-sm text-center"
          >
            <h2 className="font-display text-sm tracking-widest text-primary mb-6">// PAY_VIA_UPI</h2>
            <div className="w-48 h-48 mx-auto bg-foreground/10 border border-border flex items-center justify-center mb-4">
              <QrCode size={120} className="text-primary" />
            </div>
            <p className="font-body text-sm text-muted-foreground mb-3">Scan QR or pay to UPI ID:</p>
            <button
              onClick={copyUpi}
              className="inline-flex items-center gap-2 font-mono-cyber text-lg text-secondary text-glow-magenta border border-secondary px-4 py-2 hover:bg-secondary/10 transition-all"
            >
              {UPI_ID}
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <p className="font-mono-cyber text-xs text-muted-foreground mt-4">
              Amount: ₹{data.totalAmount}
            </p>
          </motion.div>

          {/* Confirm */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <button
              onClick={confirmPayment}
              className="font-display text-sm px-10 py-3 bg-neon-green text-background border border-neon-green hover:bg-neon-green/80 transition-all tracking-widest"
              style={{ boxShadow: "0 0 15px hsl(120 100% 50% / 0.4)" }}
            >
              ✓ PAYMENT COMPLETED
            </button>
            <p className="font-body text-xs text-muted-foreground mt-3">
              Click after completing payment via UPI
            </p>
          </motion.div>
        </div>
      </div>
    </PageBackground>
  );
};

export default Payment;
