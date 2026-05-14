export interface EventItem {
  id: string;
  title: string;
  description: string;
  type: "tech" | "non-tech";
  price: number;
}

export const EVENTS: EventItem[] = [
  {
    id: "startup-pitch",
    title: "Startup Pitch",
    description: "Present your innovative startup idea to a panel of judges. Showcase your business model, market strategy, and vision for the future. Best pitches win exciting prizes!",
    type: "tech",
    price: 150,
  },
  {
    id: "db",
    title: "dB",
    description: "Test your database skills in this intense coding challenge. Design schemas, write optimized queries, and solve real-world database problems under time pressure.",
    type: "tech",
    price: 100,
  },
  {
    id: "mr-engineer",
    title: "Mr. Engineer",
    description: "The ultimate engineering quiz! Demonstrate your technical knowledge across multiple domains. From circuits to algorithms, prove you're the top engineer.",
    type: "tech",
    price: 100,
  },
  {
    id: "connection",
    title: "Connection",
    description: "A fun networking game where participants connect clues to find hidden relationships between concepts, people, and ideas. Think fast and make connections!",
    type: "non-tech",
    price: 50,
  },
  {
    id: "treasure-hunt",
    title: "Treasure Hunt",
    description: "Embark on an exciting adventure across the campus! Solve riddles, decode clues, and race against other teams to find the hidden treasure first.",
    type: "non-tech",
    price: 50,
  },
  {
    id: "think-and-link",
    title: "Think and Link",
    description: "A brain-teasing puzzle event where you connect dots between seemingly unrelated topics. Test your lateral thinking and creative problem-solving skills.",
    type: "non-tech",
    price: 50,
  },
];

export const COMBO_PRICE = 399;
export const DEADLINE_DATE = new Date("2026-03-15T23:59:59");

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  collegeName: string;
  selectedEvents: string[];
  registrationNumber: string;
  isCombo: boolean;
  totalAmount: number;
}

export const generateRegNumber = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "PGI26-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
