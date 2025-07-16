export interface HouseholdData {
  // Household & Utilities
  electricity: number; // kWh per month
  naturalGas: number; // therms per month
  lpgUsage: number; // kg per month
  waterUsage: number; // L per day
  wasteGeneration: number; // kg per week
  recyclingRate: number; // percentage
  
  // Transportation
  weeklyDistance: number; // km per week
  vehicleType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  monthlyFuel: number; // liters per month
  publicTransport: number; // km per week
  flightsShortHaul: number; // per year
  flightsLongHaul: number; // per year
  rideshareUsage: number; // km per month
  evCharging: number; // kWh per month
  
  // Food & Diet
  dietType: 'vegan' | 'vegetarian' | 'average' | 'meat-heavy';
  foodWaste: number; // kg per month
  localOrganicFood: number; // percentage
  mealsOut: number; // per week
  
  // Goods & Services
  clothingPurchases: number; // items per year
  electronicsPurchases: number; // items per year
  furnitureSpending: number; // currency per year
  streamingHours: number; // hours per month
  streamingQuality: 'SD' | 'HD' | '4K';
  
  // Shopping & Lifestyle
  onlineOrders: number; // packages per month
  packagingWaste: number; // kg per month
  deliveryPreference: 'eco' | 'standard' | 'express';
  
  // Finance & Digital
  investmentType: 'green' | 'neutral' | 'fossil-heavy';
  dataUsage: number; // GB per month
  cryptoTransactions: number; // per month
  
  // Leisure & Travel
  hotelNights: number; // per year
  eventAttendance: 'in-person' | 'virtual' | 'mixed';
  recreationalDriving: number; // km per month
  
  // Basic info
  householdSize: number;
  location?: string;
}

export interface EmissionResults {
  electricity: number;
  transportation: number;
  diet: number;
  goods: number;
  digital: number;
  travel: number;
  total: number;
  perPerson: number;
}

export interface EcoTip {
  id: string;
  category: string;
  tip: string;
  potentialSavings: number; // kg CO2 per year
  applicable: boolean;
}

export interface MonthlyEntry {
  id: string;
  date: string;
  data: HouseholdData;
  results: EmissionResults;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'member';
  avatar?: string;
  personalData?: Partial<HouseholdData>;
}

export interface Household {
  id: string;
  name: string;
  members: User[];
  monthlyEntries: MonthlyEntry[];
  badges: Badge[];
  totalPoints: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  earnedDate: string;
  criteria: {
    type: 'footprint' | 'reduction' | 'consistency' | 'challenge';
    threshold: number;
  };
}

export interface Country {
  code: string;
  name: string;
  electricityFactor: number; // kg CO2 per kWh
  flag: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'energy' | 'transport' | 'diet' | 'general';
  points: number;
  duration: number; // days
  target: number;
  completed: boolean;
  assignedTo?: string[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  location: string;
  footprint: number;
  reduction: number;
  badges: number;
  points: number;
}

export type Language = 'en' | 'hi' | 'te' | 'es' | 'fr' | 'de';
export type Theme = 'light' | 'dark';