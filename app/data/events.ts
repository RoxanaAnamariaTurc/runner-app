export const eventsData: Event[] = [
  {
    id: 1,
    title: "Crosul Sperantei Blaj - Editia a VIII-a",
    date: "4 Octombrie 2025",
    location: "Campia Libertatii, Blaj",
    description:
      "Evenimentul principal al anului - crosul care aduna comunitatea pentru o cauza nobila.",
    image: require("../../assets/images/img1.jpg"),
    featured: true,
    detailedDescription:
      "Alătură-te celei de-a VIII-a ediții a Crosului Speranței, un eveniment care combină sportul cu spiritul caritabil. Acest cros nu este doar o competiție, ci o mișcare de solidaritate pentru susținerea persoanelor cu dizabilități din comunitatea noastră.",
    difficulty: ["Incepator", "Intermediar", "Avansat"],
    prices: {
      copii: "Gratuit (sub 12 ani)",
      amatori: "TBC RON",
      semimaraton: "TBC RON",
    },
    distances: ["3 km", "10 km", "21 km (semimaraton)"],
    startTime: "09:00",
    registrationUrl: "https://racetime.ro/events/153/register",
  },
  {
    id: 2,
    title: "Coffee Run",
    date: "Sâmbătă, 19 Iulie (Săptămânal)",
    location: "15400 (Vezi harta pentru rută)",
    description:
      "Alergare relaxantă de 10km pentru începători - în fiecare sâmbătă dimineața.",
    image: require("../../assets/images/coffee-run.jpg"),
    featured: true,
    detailedDescription:
      "Eveniment săptămânal relaxant pentru începători. Coffee Run este o sesiune de alergare de 10km care are loc în fiecare sâmbătă dimineața. Perfect pentru cei care vor să înceapă ziua cu energie și să se conecteze cu comunitatea de alergători.",
    difficulty: ["Începător"],
    prices: {
      participare: "Gratuit",
    },
    distances: ["10 km"],
    startTime: "06:00",
    registrationUrl: "https://strava.app.link/UcfoBqKd0Ub",
  },
  {
    id: 3,
    title: "1h Tempo Running Session Wednesday",
    date: "Miercuri, 16 Iulie (Săptămânal)",
    location: "Stadionul C.I.L.",
    description:
      "Sesiune de antrenament tempo de 1 oră - nivel intermediar și începător.",
    image: require("../../assets/images/tempo.jpg"),
    featured: true,
    detailedDescription:
      "Sesiune săptămânală de antrenament tempo în fiecare miercuri seara. Includes 1h Tempo Running - Intermediar Level și 30min Tempo Running - Beginner Level. Perfectă pentru dezvoltarea rezistenței și vitezei.",
    difficulty: ["Începător", "Intermediar"],
    prices: {
      participare: "Gratuit",
    },
    distances: ["Variază în funcție de nivel"],
    startTime: "19:45",
    registrationUrl: "https://strava.app.link/KjhhilId0Ub",
  },
  {
    id: 4,
    title: "Easy Run Mon & Fri",
    date: "Luni și Vineri, 14 Iulie (Săptămânal)",
    location: "Kime Market",
    description:
      "Alergare ușoară pentru începători - în fiecare luni și vineri seara.",
    image: require("../../assets/images/easy.jpg"),
    featured: true,
    detailedDescription:
      "Sesiuni de alergare ușoară în fiecare luni și vineri seara. Perfecte pentru începători sau pentru sesiuni de recuperare. Atmosferă relaxantă și prietenească pentru toți nivelurile.",
    difficulty: ["Începător"],
    prices: {
      participare: "Gratuit",
    },
    distances: ["3-5 km (în funcție de nivel)"],
    startTime: "21:30",
    registrationUrl: "https://strava.app.link/39KHNpGd0Ub",
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
};

// Add a default export to prevent route warning
export default function EventsData() {
  return null;
}
