// Dynamic pricing utility for Crosul Sperantei events
export interface PricingPeriod {
  name: string;
  startDate: Date;
  endDate: Date;
  prices: {
    "3km": number;
    "10km": number;
    semimaraton: number;
    copii: number;
  };
}

// Pricing periods for Crosul Sperantei 2025 (October 4th event)
export const pricingPeriods: PricingPeriod[] = [
  {
    name: "Early Bird",
    startDate: new Date("2025-07-14"),
    endDate: new Date("2025-07-31"),
    prices: {
      "3km": 50,
      "10km": 70,
      semimaraton: 90,
      copii: 40,
    },
  },
  {
    name: "Regular",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-08-31"),
    prices: {
      "3km": 60,
      "10km": 80,
      semimaraton: 100,
      copii: 40,
    },
  },
  {
    name: "Late Registration",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-09-28"),
    prices: {
      "3km": 80,
      "10km": 100,
      semimaraton: 120,
      copii: 40,
    },
  },
];

// Get current pricing period
export const getCurrentPricingPeriod = (
  currentDate: Date = new Date()
): PricingPeriod | null => {
  return (
    pricingPeriods.find(
      (period) =>
        currentDate >= period.startDate && currentDate <= period.endDate
    ) || null
  );
};

// Get current prices for Crosul Sperantei event
export const getCurrentPrices = (currentDate: Date = new Date()) => {
  const currentPeriod = getCurrentPricingPeriod(currentDate);

  if (!currentPeriod) {
    // If no current period found, registration might be closed
    return {
      copii: "Înregistrările sunt închise",
      amatori: "Înregistrările sunt închise",
      semimaraton: "Înregistrările sunt închise",
      period: "Înregistrările sunt închise",
    };
  }

  return {
    copii: `${currentPeriod.prices["copii"]} RON`,
    amatori: `${currentPeriod.prices["3km"]} RON (3km) / ${currentPeriod.prices["10km"]} RON (10km)`,
    semimaraton: `${currentPeriod.prices["semimaraton"]} RON`,
    period: currentPeriod.name,
  };
};

// Get next pricing period info (for showing upcoming price changes)
export const getNextPricingPeriod = (
  currentDate: Date = new Date()
): PricingPeriod | null => {
  return (
    pricingPeriods.find((period) => currentDate < period.startDate) || null
  );
};

// Get days until next price change
export const getDaysUntilPriceChange = (
  currentDate: Date = new Date()
): number | null => {
  const nextPeriod = getNextPricingPeriod(currentDate);
  if (!nextPeriod) return null;

  const diffTime = nextPeriod.startDate.getTime() - currentDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Check if registration is still open
export const isRegistrationOpen = (currentDate: Date = new Date()): boolean => {
  const lastPeriod = pricingPeriods[pricingPeriods.length - 1];
  return currentDate <= lastPeriod.endDate;
};
