import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LanguageStorage } from "../utils/languageStorage";

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
      mainTitle: "RUNNER",
      subtitle: "Community Edition",
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
        "Our running community is more than just a fitness group. It's a community movement that brings together people from all walks of life to support local causes and promote healthy living.",
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
      associationTitle: "🏃‍♂️ Local Running & Fitness Community",
      founded: "📅 Founded: Recently",
      purpose: "Purpose",
      purposeText:
        "Promoting fitness, wellness, community values, involvement in charitable activities and organizing community events with the support of volunteers.",
      values: "💡 Values",
      integrity: "Integrity",
      enthusiasm: "Enthusiasm",
      passion: "Passion",
      professionalism: "Professionalism",
      teamSpirit: "Team Spirit",
      altruism: "Community Support",
      majorProjects: "🌟 Major Projects",
      crosulSperantei: "1. Annual Community Run",
      crosulDescription:
        "Fitness & community spirit to support local causes and charities.",
      participants: "participants",
      adults: "adults",
      children: "children",
      races: "Events:",
      childrenRaces: "🏃 Fun runs for kids",
      amateurRaces: "🏃‍♂️ 5 km, 10 km – recreational runners",
      advancedRaces: "🏅 Half marathon 21 km – competitive runners",
      donationHighlight:
        "💡 Funds raised are donated to local community causes",
      edition1: "• Previous events: 500+ participants",
      edition2: "• Growing community engagement",
      edition3: "• Regular weekly activities",
      giveHopeCampaign: '2. "Community Support" Campaign',
      giveHopeDescription:
        "Regular community outreach and support activities throughout the year.",
      autism24h: "3. Charity Partnership Events",
      autismDescription:
        "Participation in regional events to support various charitable causes.",
      blajAmbassadors: "🏃‍♂️ Local ambassadors promoting fitness and community",
      viaScriptorum: '4. "Fitness Education" Project',
      viaScriptorumDescription:
        "Promoting health and wellness education through community workshops.",

      // Event Data
      // Event 1 - Crosul Sperantei
      event1Title: "Annual Community Run",
      event1Date: "Coming Soon 2024",
      event1Location: "City Center Park",
      event1Description:
        "The main event of the year - bringing the community together for a great cause.",
      event1DetailedDescription:
        "Join our annual community run, an event that combines fitness with community spirit. This run is not just a competition, but a movement of solidarity to support local causes.",

      // Event 2 - Coffee Run
      event2Title: "Weekly Coffee Run",
      event2Date: "Every Saturday Morning",
      event2Location: "Community Meeting Point",
      event2Description:
        "Relaxing 10km run for beginners - every Saturday morning.",
      event2DetailedDescription:
        "Weekly relaxing event for beginners. Coffee Run is a 10km running session that takes place every Saturday morning. Perfect for those who want to start the day with energy and connect with the running community.",

      // Event 3 - Tempo Running
      event3Title: "Midweek Training Session",
      event3Date: "Every Wednesday Evening",
      event3Location: "Local Sports Center",
      event3Description:
        "1-hour tempo training session - intermediate and beginner level.",
      event3DetailedDescription:
        "Weekly tempo training session every Wednesday evening. Includes structured tempo training designed to improve running pace and endurance. Open to intermediate and beginner runners.",

      // Event 4 - Easy Run
      event4Title: "Easy Pace Group Swim",
      event4Date: "Monday & Friday Evenings",
      event4Location: "Community Park",
      event4Description:
        "Easy-paced swim for beginners - every Monday and Friday evening.",
      event4DetailedDescription:
        "Easy swimming sessions every Monday and Friday evening. Perfect for beginners or recovery sessions. Relaxed and friendly atmosphere for all levels.",

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
      autism24hDetails2: "🥇 Local Team – 7th place (1209 km run)",
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
      copyright: "© 2025 RUNNER",

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
      mainTitle: "RUNNER",
      subtitle: "Ediția Comunității",
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
      associationTitle: "🏃‍♂️ Asociația Clubul Sportiv Local de Alergare",
      founded: "📅 Fondat: Recent",
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
      crosulSperantei: "1. Alergarea Anuala a Comunitatii",
      crosulDescription:
        "Caritate & sport pentru susținerea cauzelor locale și persoanelor cu dizabilități.",
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
      giveHopeCampaign: '2. Campania "Sprijin Comunitar"',
      giveHopeDescription:
        "Activități de sprijin comunitar și caritate în fiecare an, pe perioada sărbătorilor.",
      autism24h: "3. Evenimente de Caritate Parteneriat",
      autismDescription:
        "Participare la evenimente regionale pentru sprijinul copiilor cu dizabilități.",
      blajAmbassadors: "🏃‍♂️ Ambasadori locali: 20 voluntari, 1500+ km alergați",
      viaScriptorum: '4. Proiect "Via Scriptorum"',
      viaScriptorumDescription:
        "Promovarea culturii scrise prin jocuri de pistă inspirate din scriitori locali.",

      // Event Data
      // Event 1 - Crosul Sperantei
      event1Title: "Alergarea Anuala a Comunitatii",
      event1Date: "In Curand 2024",
      event1Location: "Parcul Centrului Orasului",
      event1Description:
        "Evenimentul principal al anului - adunand comunitatea pentru o cauza nobila.",
      event1DetailedDescription:
        "Alătură-te alergării anuale a comunității, un eveniment care combină fitness-ul cu spiritul comunitar. Această alergare nu este doar o competiție, ci o mișcare de solidaritate pentru susținerea cauzelor locale.",

      // Event 2 - Coffee Run
      event2Title: "Alergarea Saptamanala cu Cafea",
      event2Date: "In Fiecare Sambata Dimineata",
      event2Location: "Punct de Intalnire al Comunitatii",
      event2Description:
        "Alergare relaxanta de 10km pentru incepatori - in fiecare sambata dimineata.",
      event2DetailedDescription:
        "Eveniment săptămânal relaxant pentru începători. Alergarea cu Cafea este o sesiune de alergare de 10km care are loc în fiecare sâmbătă dimineața. Perfect pentru cei care vor să înceapă ziua cu energie și să se conecteze cu comunitatea de alergători.",

      // Event 3 - Tempo Running
      event3Title: "Sesiunea de Antrenament de Mijloc de Saptamana",
      event3Date: "In Fiecare Miercuri Seara",
      event3Location: "Centrul Sportiv Local",
      event3Description:
        "Sesiune de antrenament tempo de 1 ora - nivel intermediar si incepator.",
      event3DetailedDescription:
        "Sesiune de antrenament tempo săptămânală în fiecare miercuri seara. Include antrenament tempo structurat conceput pentru îmbunătățirea ritmului și rezistenței la alergare. Deschis alergătorilor intermediari și începători.",

      // Event 4 - Easy Run
      event4Title: "Innot Usor de Grup",
      event4Date: "Luni si Vineri Searile",
      event4Location: "Parcul Comunitatii",
      event4Description:
        "Innot cu ritm usor pentru incepatori - in fiecare luni si vineri seara.",
      event4DetailedDescription:
        "Sesiuni de innot ușor în fiecare luni și vineri seara. Perfecte pentru începători sau pentru sesiuni de recuperare. Atmosferă relaxantă și prietenească pentru toți nivelurile.",

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
      autism24hDetails2: "🥇 Echipa locală – locul 7 (1209 km alergați)",
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
      copyright: "© 2025 Aplicația Comunității de Alergare",

      // Common
      free: "Gratuit",
      ongoing: "În desfășurare",
      eventNotFound: "Evenimentul nu a fost găsit",

      // Explicit value translations (keep as is in Romanian)
      Gratuit: "Gratuit",
    },
  },
};

// Initialize i18n with persistent language support
const initializeI18n = async () => {
  try {
    // Load saved language preference
    const savedLanguage = await LanguageStorage.loadLanguage();
    const defaultLanguage = savedLanguage || "ro"; // Default to Romanian

    await i18n.use(initReactI18next).init({
      resources,
      lng: defaultLanguage,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });

    // Save language change events to storage
    i18n.on("languageChanged", (language) => {
      LanguageStorage.saveLanguage(language);
    });
  } catch (error) {
    console.warn("Failed to initialize i18n with saved language:", error);

    // Fallback to default initialization
    await i18n.use(initReactI18next).init({
      resources,
      lng: "ro",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
  }
};

// Initialize i18n
initializeI18n();

export default i18n;
