import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Language resources
const resources = {
  en: {
    translation: {
      // Navigation & Common
      home: "Home",
      about: "About Us",
      events: "Events",
      eventsPageTitle: "Events",
      contact: "Contact",
      details: "DETAILS",
      allEvents: "All Events",

      // Home Page
      mainTitle: "CROSUL SPERANTEI BLAJ",
      subtitle: "8th Edition",
      featuredEventsTitle: "Ongoing Events",
      featuredEventsNote: "Some events are ongoing and you can join anytime!",
      previousEventsTitle: "Previous Events",
      partnersTitle: "Our Partners",

      // Loading
      loading: "Loading...",

      // Events
      eventDetails: "Event Details",
      difficulty: "Difficulty",
      difficultyLevel: "Difficulty Level",
      prices: "Prices",
      registrationPrices: "Registration Prices",
      distances: "Distances",
      availableDistances: "Available Distances",
      startTime: "Start Time",
      register: "Register",

      // About Page
      aboutTitle: "About Us",
      aboutMission: "Our Mission",
      aboutMissionText:
        "Crosul Speranței is more than just a running event. It's a community movement that brings together people from all walks of life to support those with disabilities in our community.",
      aboutValues: "Our Values",
      aboutSolidarity: "Solidarity",
      aboutSolidarityText: "Supporting each other in achieving common goals",
      aboutInclusion: "Inclusion",
      aboutInclusionText: "Creating opportunities for everyone to participate",
      aboutCommunity: "Community",
      aboutCommunityText:
        "Building stronger connections within our local community",
      aboutImpact: "Impact",
      aboutImpactText: "Making a real difference in people's lives",

      // About page detailed content
      associationTitle: "🏃‍♂️ Running & Cycling Club Blaj Sports Association",
      founded: "📅 Founded: 2017",
      purpose: "Purpose",
      purposeText:
        "Promoting mass sports, cultural and sports values, involvement in charitable activities and organizing community events with the support of volunteers.",
      values: "💡 Values",
      integrity: "Integrity",
      enthusiasm: "Enthusiasm",
      passion: "Passion",
      professionalism: "Professionalism",
      teamSpirit: "Team Spirit",
      altruism: "Altruism",
      majorProjects: "🌟 Major Projects",
      crosulSperantei: "1. Crosul Speranței",
      crosulDescription:
        "Charity & sports to support people with Down Syndrome and disabilities.",
      participants: "participants",
      adults: "adults",
      children: "children",
      races: "Events:",
      childrenRaces: "🏃 200m – 1300m children",
      amateurRaces: "🏃‍♂️ 2.5 km, 8 km – amateurs",
      advancedRaces: "🏅 Half marathon 21 km / 26.4 km – advanced",
      donationHighlight:
        "💡 Funds raised were donated to young people with disabilities",
      edition1: "• Edition I (2017): 666 participants",
      edition2: "• Edition II (2018): 262 adults, 405 children",
      edition3: "• Edition III (2019): 723 participants",
      giveHopeCampaign: '2. "Give Hope" Campaign',
      giveHopeDescription:
        "Distributes food to isolated people (Trascău Mountains, Rîmeț), every year at Easter and Christmas.",
      autism24h: "3. Autism 24H – Black Sea",
      autismDescription:
        "Participation in national event to support children with autism and Down Syndrome.",
      blajAmbassadors: '🏃‍♂️ Blaj: 20 ambassadors, 1500+ km "auctioned"',
      viaScriptorum: '4. "Via Scriptorum" Project',
      viaScriptorumDescription:
        "Promoting written culture through track games inspired by",

      // Event Data
      // Event 1 - Crosul Sperantei
      event1Title: "Crosul Sperantei Blaj - 8th Edition",
      event1Date: "October 4, 2025",
      event1Location: "Campia Libertatii, Blaj",
      event1Description:
        "The main event of the year - the cross that brings the community together for a noble cause.",
      event1DetailedDescription:
        "Join the 8th edition of Crosul Speranței, an event that combines sports with charitable spirit. This cross-country run is not just a competition, but a solidarity movement to support people with disabilities in our community.",

      // Event 2 - Coffee Run
      event2Title: "Coffee Run",
      event2Date: "Saturday, July 19 (Weekly)",
      event2Location: "15400 (See map for route)",
      event2Description:
        "Relaxing 10km run for beginners - every Saturday morning.",
      event2DetailedDescription:
        "Weekly relaxing event for beginners. Coffee Run is a 10km running session that takes place every Saturday morning. Perfect for those who want to start the day with energy and connect with the running community.",

      // Event 3 - Tempo Running
      event3Title: "1h Tempo Running Session Wednesday",
      event3Date: "Wednesday, July 16 (Weekly)",
      event3Location: "C.I.L. Stadium",
      event3Description:
        "1-hour tempo training session - intermediate and beginner level.",
      event3DetailedDescription:
        "Structured tempo training session designed to improve running pace and endurance. Open to intermediate and beginner runners who want to take their training to the next level.",

      // Event 4 - Easy Run
      event4Title: "Easy Run Mon & Fri",
      event4Date: "Monday and Friday, July 14 (Weekly)",
      event4Location: "Kime Market",
      event4Description:
        "Easy run for beginners - every Monday and Friday evening.",
      event4DetailedDescription:
        "Easy running sessions every Monday and Friday evening. Perfect for beginners or recovery sessions. Relaxed and friendly atmosphere for all levels.",

      // Event types and difficulty labels
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      forEveryone: "For Everyone",
      forKids: "For Kids",

      // Specific difficulty labels from event data (Romanian keys)
      incepator: "Beginner",
      Incepator: "Beginner",
      începător: "Beginner",
      Începător: "Beginner",
      intermediar: "Intermediate",
      Intermediar: "Intermediate",
      avansat: "Advanced",
      Avansat: "Advanced",

      // Specific price labels from event data (Romanian keys)
      copii: "Children",
      amatori: "Amateurs",
      semimaraton: "Half Marathon",
      participare: "Participation",
      gratuit: "Free",

      // Distance labels
      "Variază în funcție de nivel": "Varies by level",
      "3-5 km (în funcție de nivel)": "3-5 km (depending on level)",
      "21 km (semimaraton)": "21 km (half marathon)",

      // Project titles for About page
      viaScriptorumProject: '"Via Scriptorum" Project',
      scrisorareIepurasului: "Easter Bunny Letter",
      kidsRace2021: "Kids Race (2021)",
      autism24h2021: "Autism24H 2021",

      // Project descriptions
      viaScriptorumDetails1:
        "📚 Collaboration with 10+ schools and high schools",
      viaScriptorumDetails2: "🎯 100 young participants",
      viaScriptorumDetails3: "🏆 Nominated for AFCN awards",
      scrisorareDescription:
        "Children from needy families receive gifts based on letters collected before Easter.",
      kidsRaceDetails1: "🚴‍♀️ Cycling competition for children under 14",
      kidsRaceDetails2: "🗓 July 6, 2021 – linked to Sibiu Cycling Tour",
      kidsRaceDetails3: "👧👦 100 participants",
      autism24hDetails1: "🏁 70 national teams",
      autism24hDetails2: "🥇 Blaj Club – 7th place (1209 km run)",
      autism24hDetails3: "🥉 3rd place in auctioned km",

      // Price labels
      childrenLabel: "Children",
      amateursLabel: "Amateurs",
      halfMarathonLabel: "Half Marathon",
      participationLabel: "Participation",
      tbcLabel: "TBC",

      // Event details page
      aboutEvent: "About Event",

      // Pricing
      currentPeriod: "Current Period",
      priceIncreaseIn: "Prices increase in",
      days: "days",
      nextPeriod: "Next Period",
      registrationClosed: "Registration is closed",

      // Footer
      followUs: "Follow us on:",
      copyright: "© 2025 Crosul Speranței Blaj",

      // Common
      free: "Free",
      ongoing: "Ongoing",
      eventNotFound: "Event not found",

      // Explicit value translations
      Gratuit: "Free",
    },
  },
  ro: {
    translation: {
      // Navigation & Common
      home: "Acasă",
      about: "Despre Noi",
      events: "Evenimente",
      eventsPageTitle: "Evenimente",
      contact: "Contact",
      details: "DETALII",
      allEvents: "Toate Evenimentele",

      // Home Page
      mainTitle: "CROSUL SPERANTEI BLAJ",
      subtitle: "Editia a VIII-a",
      featuredEventsTitle: "Evenimente în desfășurare",
      featuredEventsNote:
        "Unele evenimente sunt în desfășurare și te poți alătura oricând!",
      previousEventsTitle: "Evenimente Precedente",
      partnersTitle: "Partenerii Noștri",

      // Loading
      loading: "Se încarcă...",

      // Events
      eventDetails: "Detalii Eveniment",
      difficulty: "Dificultate",
      difficultyLevel: "Nivel de Dificultate",
      prices: "Prețuri",
      registrationPrices: "Prețuri Înregistrare",
      distances: "Distanțe",
      availableDistances: "Distanțe Disponibile",
      startTime: "Ora de Start",
      register: "Înregistrează-te",

      // About Page
      aboutTitle: "Despre Noi",
      aboutMission: "Misiunea Noastră",
      aboutMissionText:
        "Crosul Speranței este mai mult decât un simplu eveniment de alergare. Este o mișcare comunitară care aduce împreună oameni din toate sferele vieții pentru a sprijini persoanele cu dizabilități din comunitatea noastră.",
      aboutValues: "Valorile Noastre",
      aboutSolidarity: "Solidaritate",
      aboutSolidarityText:
        "Sprijinirea reciprocă pentru atingerea obiectivelor comune",
      aboutInclusion: "Incluziune",
      aboutInclusionText:
        "Crearea de oportunități pentru ca toată lumea să participe",
      aboutCommunity: "Comunitate",
      aboutCommunityText:
        "Construirea de legături mai puternice în comunitatea noastră locală",
      aboutImpact: "Impact",
      aboutImpactText: "Să facem o diferență reală în viețile oamenilor",

      // About page detailed content
      associationTitle:
        "🏃‍♂️ Asociația Clubul Sportiv Running & Cycling Club Blaj",
      founded: "📅 Fondat: 2017",
      purpose: "Scop",
      purposeText:
        "Promovarea sportului de masă, valorilor culturale și sportive, implicarea în activități caritabile și organizarea de evenimente pentru comunitate, cu sprijinul voluntarilor.",
      values: "💡 Valori",
      integrity: "Integritate",
      enthusiasm: "Entuziasm",
      passion: "Pasiune",
      professionalism: "Profesionalism",
      teamSpirit: "Spirit de echipă",
      altruism: "Altruism",
      majorProjects: "🌟 Proiecte Majore",
      crosulSperantei: "1. Crosul Speranței",
      crosulDescription:
        "Caritate & sport pentru susținerea persoanelor cu Sindrom Down și dizabilități.",
      participants: "participanți",
      adults: "adulți",
      children: "copii",
      races: "Probe:",
      childrenRaces: "🏃 200m – 1300m copii",
      amateurRaces: "🏃‍♂️ 2.5 km, 8 km – amatori",
      advancedRaces: "🏅 Semimaraton 21 km / 26.4 km – avansați",
      donationHighlight:
        "💡 Fondurile strânse au fost donate tinerilor cu dizabilități",
      edition1: "• Ediția I (2017): 666 participanți",
      edition2: "• Ediția II (2018): 262 adulți, 405 copii",
      edition3: "• Ediția III (2019): 723 participanți",
      giveHopeCampaign: '2. Campania "Daruieste Speranta"',
      giveHopeDescription:
        "Distribuie alimente persoanelor izolate (Munții Trascău, Rîmeț), în fiecare an de Paști și Crăciun.",
      autism24h: "3. Autism 24H – Marea Neagră",
      autismDescription:
        "Participare la eveniment național pentru sprijinul copiilor cu autism și Sindrom Down.",
      blajAmbassadors: '🏃‍♂️ Blaj: 20 ambasadori, 1500+ km "licitați"',
      viaScriptorum: '4. Proiect "Via Scriptorum"',
      viaScriptorumDescription:
        "Promovarea culturii scrise prin jocuri de pistă inspirate din",

      // Event Data
      // Event 1 - Crosul Sperantei
      event1Title: "Crosul Sperantei Blaj - Editia a VIII-a",
      event1Date: "4 Octombrie 2025",
      event1Location: "Campia Libertatii, Blaj",
      event1Description:
        "Evenimentul principal al anului - crosul care aduna comunitatea pentru o cauza nobila.",
      event1DetailedDescription:
        "Alătură-te celei de-a VIII-a ediții a Crosului Speranței, un eveniment care combină sportul cu spiritul caritabil. Acest cros nu este doar o competiție, ci o mișcare de solidaritate pentru susținerea persoanelor cu dizabilități din comunitatea noastră.",

      // Event 2 - Coffee Run
      event2Title: "Coffee Run",
      event2Date: "Sâmbătă, 19 Iulie (Săptămânal)",
      event2Location: "15400 (Vezi harta pentru rută)",
      event2Description:
        "Alergare relaxantă de 10km pentru începători - în fiecare sâmbătă dimineața.",
      event2DetailedDescription:
        "Eveniment săptămânal relaxant pentru începători. Coffee Run este o sesiune de alergare de 10km care are loc în fiecare sâmbătă dimineața. Perfect pentru cei care vor să înceapă ziua cu energie și să se conecteze cu comunitatea de alergători.",

      // Event 3 - Tempo Running
      event3Title: "1h Tempo Running Session Wednesday",
      event3Date: "Miercuri, 16 Iulie (Săptămânal)",
      event3Location: "Stadionul C.I.L.",
      event3Description:
        "Sesiune de antrenament tempo de 1 oră - nivel intermediar și începător.",
      event3DetailedDescription:
        "Sesiune de antrenament tempo structurat, concepută pentru îmbunătățirea ritmului și rezistenței la alergare. Deschis alergătorilor intermediari și începători care doresc să-și ducă antrenamentul la următorul nivel.",

      // Event 4 - Easy Run
      event4Title: "Easy Run Mon & Fri",
      event4Date: "Luni și Vineri, 14 Iulie (Săptămânal)",
      event4Location: "Kime Market",
      event4Description:
        "Alergare ușoară pentru începători - în fiecare luni și vineri seara.",
      event4DetailedDescription:
        "Sesiuni de alergare ușoară în fiecare luni și vineri seara. Perfecte pentru începători sau pentru sesiuni de recuperare. Atmosferă relaxantă și prietenească pentru toți nivelurile.",

      // Event types and difficulty labels
      beginner: "Începător",
      intermediate: "Intermediar",
      advanced: "Avansat",
      forEveryone: "Pentru toți",
      forKids: "Pentru copii",

      // Specific difficulty labels from event data (keep Romanian as is)
      incepator: "Începător",
      Incepator: "Începător",
      începător: "Începător",
      Începător: "Începător",
      intermediar: "Intermediar",
      Intermediar: "Intermediar",
      avansat: "Avansat",
      Avansat: "Avansat",

      // Specific price labels from event data (keep Romanian as is)
      copii: "Copii",
      amatori: "Amatori",
      semimaraton: "Semimaraton",
      participare: "Participare",
      gratuit: "Gratuit",

      // Distance labels
      "Variază în funcție de nivel": "Variază în funcție de nivel",
      "3-5 km (în funcție de nivel)": "3-5 km (în funcție de nivel)",
      "21 km (semimaraton)": "21 km (semimaraton)",

      // Project titles for About page
      viaScriptorumProject: 'Proiect "Via Scriptorum"',
      scrisorareIepurasului: "Scrisoare Iepurașului",
      kidsRace2021: "Kids Race (2021)",
      autism24h2021: "Autism24H 2021",

      // Project descriptions
      viaScriptorumDetails1: "📚 Colaborare cu 10+ școli și licee",
      viaScriptorumDetails2: "🎯 100 de tineri participanți",
      viaScriptorumDetails3: "🏆 Nominalizat la premiile AFCN",
      scrisorareDescription:
        "Copii din familii nevoiașe primesc cadouri pe baza scrisorilor colectate înainte de Paști.",
      kidsRaceDetails1: "🚴‍♀️ Competiție de ciclism pentru copii sub 14 ani",
      kidsRaceDetails2: "🗓 6 iulie 2021 – legată de Turul Ciclist al Sibiului",
      kidsRaceDetails3: "👧👦 100 de participanți",
      autism24hDetails1: "🏁 70 echipe naționale",
      autism24hDetails2: "🥇 Clubul din Blaj – locul 7 (1209 km alergați)",
      autism24hDetails3: "🥉 Locul 3 la km licitați",

      // Price labels
      childrenLabel: "Copii",
      amateursLabel: "Amatori",
      halfMarathonLabel: "Semimaraton",
      participationLabel: "Participare",
      tbcLabel: "TBC",

      // Event details page
      aboutEvent: "Despre Eveniment",

      // Pricing
      currentPeriod: "Perioada Curentă",
      priceIncreaseIn: "Prețurile cresc în",
      days: "zile",
      nextPeriod: "Următoarea Perioadă",
      registrationClosed: "Înregistrările sunt închise",

      // Footer
      followUs: "Urmăriți-ne pe:",
      copyright: "© 2025 Crosul Speranței Blaj",

      // Common
      free: "Gratuit",
      ongoing: "În desfășurare",
      eventNotFound: "Evenimentul nu a fost găsit",

      // Explicit value translations (keep as is in Romanian)
      Gratuit: "Gratuit",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ro", // Default language (Romanian)
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
