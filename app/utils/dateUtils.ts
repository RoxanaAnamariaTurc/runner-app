export interface NextOccurrence {
  date: string;
  isNextWeek: boolean;
  daysUntil: number;
}

// Map of day names to their corresponding numbers (0 = Sunday, 1 = Monday, etc.)
const dayNameToNumber: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  // Romanian translations
  duminică: 0,
  luni: 1,
  marți: 2,
  miercuri: 3,
  joi: 4,
  vineri: 5,
  sâmbătă: 6,
};

// Map numbers back to day names for display
const dayNumberToName: Record<number, { en: string; ro: string }> = {
  0: { en: "Sunday", ro: "Duminică" },
  1: { en: "Monday", ro: "Luni" },
  2: { en: "Tuesday", ro: "Marți" },
  3: { en: "Wednesday", ro: "Miercuri" },
  4: { en: "Thursday", ro: "Joi" },
  5: { en: "Friday", ro: "Vineri" },
  6: { en: "Saturday", ro: "Sâmbătă" },
};

/**
 * Calculates the next occurrence of a weekly event
 * @param eventTitle The title of the event to parse for day information
 * @param startTime The start time of the event (e.g., "19:45")
 * @param language The language for formatting ("en" or "ro")
 * @returns NextOccurrence object with formatted date and metadata
 */
export function getNextWeeklyOccurrence(
  eventTitle: string,
  startTime: string,
  language: "en" | "ro" = "en"
): NextOccurrence | null {
  const today = new Date();
  const currentDay = today.getDay();
  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();

  // Parse start time
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const startTimeInMinutes = startHour * 60 + startMinute;
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  // Extract day information from event title
  const eventDays = extractDaysFromTitle(eventTitle);
  if (eventDays.length === 0) {
    return null;
  }

  // Find the next occurrence
  let nextOccurrence: Date | null = null;
  let targetDay = -1;

  for (const day of eventDays) {
    const dayNumber = dayNameToNumber[day.toLowerCase()];
    if (dayNumber === undefined) continue;

    // Calculate next occurrence for this day
    let daysUntilNext = (dayNumber - currentDay + 7) % 7;

    // If it's today but the event time has passed, look for next week
    if (daysUntilNext === 0 && currentTimeInMinutes >= startTimeInMinutes) {
      daysUntilNext = 7;
    }

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilNext);

    // Keep the earliest next occurrence
    if (!nextOccurrence || nextDate < nextOccurrence) {
      nextOccurrence = nextDate;
      targetDay = dayNumber;
    }
  }

  if (!nextOccurrence || targetDay === -1) {
    return null;
  }

  // Calculate days until
  const daysUntil = Math.ceil(
    (nextOccurrence.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isNextWeek = daysUntil > 6;

  // Format the date
  const dayName = dayNumberToName[targetDay][language];
  const date = nextOccurrence.getDate();
  const month = nextOccurrence.toLocaleDateString(
    language === "ro" ? "ro-RO" : "en-US",
    {
      month: "long",
    }
  );

  let formattedDate: string;
  if (daysUntil === 0) {
    formattedDate =
      language === "ro" ? `Astăzi, ${startTime}` : `Today, ${startTime}`;
  } else if (daysUntil === 1) {
    formattedDate =
      language === "ro" ? `Mâine, ${startTime}` : `Tomorrow, ${startTime}`;
  } else if (daysUntil <= 6) {
    formattedDate =
      language === "ro"
        ? `${dayName}, ${date} ${month}, ${startTime}`
        : `${dayName}, ${month} ${date}, ${startTime}`;
  } else {
    formattedDate =
      language === "ro"
        ? `${dayName}, ${date} ${month}, ${startTime}`
        : `${dayName}, ${month} ${date}, ${startTime}`;
  }

  return {
    date: formattedDate,
    isNextWeek,
    daysUntil,
  };
}

/**
 * Extracts day names from event titles
 * Handles patterns like "Easy Run Mon & Fri", "Coffee Run", "Tempo Running Session Wednesday"
 */
function extractDaysFromTitle(title: string): string[] {
  const days: string[] = [];
  const titleLower = title.toLowerCase();

  // Common day abbreviations and full names
  const dayPatterns = [
    { pattern: /\bmon\b|\bmonday\b|\bluni\b/i, day: "monday" },
    { pattern: /\btue\b|\btuesday\b|\bmarți\b/i, day: "tuesday" },
    { pattern: /\bwed\b|\bwednesday\b|\bmiercuri\b/i, day: "wednesday" },
    { pattern: /\bthu\b|\bthursday\b|\bjoi\b/i, day: "thursday" },
    { pattern: /\bfri\b|\bfriday\b|\bvineri\b/i, day: "friday" },
    { pattern: /\bsat\b|\bsaturday\b|\bsâmbătă\b/i, day: "saturday" },
    { pattern: /\bsun\b|\bsunday\b|\bduminică\b/i, day: "sunday" },
  ];

  for (const { pattern, day } of dayPatterns) {
    if (pattern.test(titleLower)) {
      days.push(day);
    }
  }

  // Special handling for "Coffee Run" (weekly on Saturday based on your data)
  if (titleLower.includes("coffee run") && days.length === 0) {
    days.push("saturday");
  }

  return days;
}

/**
 * Determines if an event is a weekly recurring event
 */
export function isWeeklyEvent(eventDate: string): boolean {
  const dateLower = eventDate.toLowerCase();
  return (
    dateLower.includes("săptămânal") ||
    dateLower.includes("weekly") ||
    dateLower.includes("în fiecare") ||
    dateLower.includes("every")
  );
}

/**
 * Formats a date string for display, showing next occurrence for weekly events
 */
export function getDisplayDate(
  event: { date: string; title: string; startTime: string },
  language: "en" | "ro" = "en"
): string {
  if (isWeeklyEvent(event.date)) {
    const nextOccurrence = getNextWeeklyOccurrence(
      event.title,
      event.startTime,
      language
    );
    if (nextOccurrence) {
      const prefix = language === "ro" ? "Următorul: " : "Next: ";
      return prefix + nextOccurrence.date;
    }
  }

  return event.date;
}
