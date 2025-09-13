import { getCurrentPrices } from "../utils/pricing";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";

export const eventsData: Event[] = [
  {
    id: 1,
    title: "Annual Community Run",
    date: "Coming Soon 2024",
    location: "City Center Park",
    description:
      "The main event of the year - bringing the community together for a great cause.",
    image: img1,
    featured: true,
    detailedDescription:
      "Join our annual community run, an event that combines fitness with community spirit. This run is not just a competition, but a movement of solidarity to support local causes.",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    prices: getCurrentPrices(), // Dynamic pricing based on current date
    distances: ["5 km", "10 km", "21 km (half marathon)"],
    startTime: "09:00",
    registrationUrl: "#",
    hasDynamicPricing: true, // Flag to indicate this event uses dynamic pricing
  },
  {
    id: 2,
    title: "Weekly Coffee Run",
    date: "Every Saturday Morning",
    location: "Community Meeting Point",
    description: "Relaxing 10km run for beginners - every Saturday morning.",
    image: img2,
    featured: true,
    detailedDescription:
      "Weekly relaxing event for beginners. Coffee Run is a 10km running session that takes place every Saturday morning. Perfect for those who want to start the day with energy and connect with the running community.",
    difficulty: ["Beginner"],
    prices: {
      participation: "Free",
    },
    distances: ["10 km"],
    startTime: "07:00",
    registrationUrl: "#",
  },
  {
    id: 3,
    title: "Midweek Training Session",
    date: "Every Wednesday Evening",
    location: "Local Sports Center",
    description:
      "1-hour tempo training session - intermediate and beginner level.",
    image: img3,
    featured: true,
    detailedDescription:
      "Weekly tempo training session every Wednesday evening. Includes structured tempo training designed to improve running pace and endurance. Open to intermediate and beginner runners.",
    difficulty: ["Beginner", "Intermediate"],
    prices: {
      participation: "Free",
    },
    distances: ["Varies by level"],
    startTime: "19:00",
    registrationUrl: "#",
  },
  {
    id: 4,
    title: "Easy Pace Group Swim",
    date: "Monday & Friday Evenings",
    location: "Community Park",
    description:
      "Easy-paced swim for beginners - every Monday and Friday evening.",
    image: img4,
    featured: true,
    detailedDescription:
      "Easy swimming sessions every Monday and Friday evening. Perfect for beginners or recovery sessions. Relaxed and friendly atmosphere for all levels.",
    difficulty: ["Beginner"],
    prices: {
      participation: "Free",
    },
    distances: ["3-5 km (depending on level)"],
    startTime: "19:30",
    registrationUrl: "#",
  },
];

export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: any;
  featured: boolean;
  detailedDescription: string;
  difficulty: string[];
  prices: Record<string, string>;
  distances: string[];
  startTime: string;
  registrationUrl: string;
  hasDynamicPricing?: boolean; // Optional flag for dynamic pricing
};

// Add a default export to prevent route warning
export default function EventsData() {
  return null;
}
