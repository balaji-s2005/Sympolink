import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  type: "tech" | "non-tech";
  selected?: boolean;
  onToggle?: () => void;
  price: number;
}

const EventCard = ({ title, description, type, selected, onToggle, price }: EventCardProps) => {
  const isTech = type === "tech";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`relative cursor-pointer border p-5 md:p-6 transition-all duration-300 ${
        selected
          ? isTech
            ? "border-primary bg-primary/10 border-glow-cyan"
            : "border-secondary bg-secondary/10 border-glow-magenta"
          : "border-border bg-card/50 hover:border-muted-foreground"
      }`}
    >
      {selected && (
        <div className={`absolute top-3 right-3 w-6 h-6 flex items-center justify-center ${
          isTech ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        }`}>
          <Check size={14} />
        </div>
      )}
      <div className={`font-display text-xs tracking-widest mb-2 ${
        isTech ? "text-primary" : "text-secondary"
      }`}>
        {type.toUpperCase()}
      </div>
      <h3 className="font-display text-lg md:text-xl text-foreground mb-2">{title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
      <div className={`font-mono-cyber text-sm ${isTech ? "text-primary" : "text-secondary"}`}>
        ₹{price}
      </div>
    </motion.div>
  );
};

export default EventCard;
