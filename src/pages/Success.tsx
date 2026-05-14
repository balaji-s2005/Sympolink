import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Download, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import PageBackground from "@/components/PageBackground";
import bgSuccess from "@/assets/bg-success.jpg";
import { EVENTS } from "@/lib/eventData";
import type { RegistrationData } from "@/lib/eventData";

const Success = () => {
  const location = useLocation();
  const data = location.state as RegistrationData | null;
  const receiptRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  if (!data) {
    return (
      <PageBackground backgroundImage={bgSuccess}>
        <div className="min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="text-center">
            <h1 className="font-display text-3xl text-primary text-glow-cyan mb-4">NO DATA FOUND</h1>
            <Link to="/" className="font-display text-sm text-primary underline">Go Home</Link>
          </div>
        </div>
      </PageBackground>
    );
  }

  const selectedEventDetails = EVENTS.filter((e) => data.selectedEvents.includes(e.id));

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: "#0a0a0f",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 10;

      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`PROGENI26-Receipt-${data.registrationNumber}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <PageBackground backgroundImage={bgSuccess}>
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-4 border-2 border-neon-green flex items-center justify-center"
              style={{ boxShadow: "0 0 30px hsl(120 100% 50% / 0.4)" }}
            >
              <span className="text-neon-green text-4xl">✓</span>
            </motion.div>
            <h1 className="font-display text-3xl md:text-5xl text-neon-green text-glow-green mb-3 tracking-wider">
              REGISTERED!
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              You're in the arena. See you at PROGEN'I-26!
            </p>
          </motion.div>

          {/* ---- Receipt (captured for PDF) ---- */}
          <motion.div
            ref={receiptRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border border-neon-green bg-card/60 p-6 md:p-8 backdrop-blur-sm"
            style={{ boxShadow: "0 0 20px hsl(120 100% 50% / 0.15)", background: "hsl(240 20% 5% / 0.95)" }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="font-display text-xs tracking-[0.3em] text-muted-foreground mb-1">RECEIPT</div>
              <div className="font-display text-sm text-primary tracking-wider">PROGEN'I-26 • GCE-CSE</div>
            </div>

            {/* Reg number */}
            <div className="border-t border-b border-border py-4 mb-4">
              <div className="text-center">
                <div className="font-display text-[10px] tracking-widest text-muted-foreground">REGISTRATION NUMBER</div>
                <div className="font-mono-cyber text-2xl text-secondary text-glow-magenta mt-1">
                  {data.registrationNumber}
                </div>
              </div>
            </div>

            {/* Personal info */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
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

            {/* Events */}
            <div className="border-t border-border pt-4 mb-4">
              <div className="font-display text-[10px] tracking-widest text-muted-foreground mb-2">EVENTS REGISTERED</div>
              {selectedEventDetails.map((event) => (
                <div key={event.id} className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-0">
                  <span className="font-body text-foreground text-sm">{event.title}</span>
                  <div className="flex items-center gap-3">
                    <span className={`font-display text-[9px] tracking-widest px-1.5 py-0.5 border ${event.type === "tech" ? "text-primary border-primary/40" : "text-secondary border-secondary/40"}`}>
                      {event.type.toUpperCase()}
                    </span>
                    <span className="font-mono-cyber text-xs text-muted-foreground">
                      {data.isCombo ? "—" : `₹${event.price}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-border pt-4 flex justify-between items-center">
              <span className="font-display text-sm tracking-wider text-foreground">
                AMOUNT PAID {data.isCombo && <span className="text-[10px] text-muted-foreground ml-1">(COMBO)</span>}
              </span>
              <span className="font-mono-cyber text-2xl text-neon-green text-glow-green">₹{data.totalAmount}</span>
            </div>

            {/* Footer stamp */}
            <div className="mt-6 pt-4 border-t border-border/40 flex justify-between items-center">
              <div className="font-display text-[9px] tracking-widest text-muted-foreground/50">
                GCE-CSE DEPARTMENT
              </div>
              <div className="font-mono-cyber text-[9px] text-muted-foreground/50">
                {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
              </div>
              <div className="font-display text-[9px] tracking-widest text-neon-green/50">
                VERIFIED ✓
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <button
              onClick={downloadReceipt}
              disabled={downloading}
              className="font-display text-sm px-8 py-3 bg-neon-green text-background border border-neon-green hover:bg-neon-green/80 transition-all tracking-widest flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 0 15px hsl(120 100% 50% / 0.35)" }}
            >
              {downloading ? (
                <><Loader2 size={16} className="animate-spin" /> GENERATING PDF…</>
              ) : (
                <><Download size={16} /> DOWNLOAD RECEIPT</>
              )}
            </button>
            <Link
              to="/"
              className="font-display text-sm px-8 py-3 bg-primary text-primary-foreground border border-primary hover:bg-primary/80 transition-all border-glow-cyan tracking-widest flex items-center justify-center gap-2"
            >
              <Home size={16} /> BACK TO HOME
            </Link>
          </motion.div>
        </div>
      </div>
    </PageBackground>
  );
};

export default Success;
