import { HouseholdData, EmissionResults } from '../types';
import { getCountryByCode } from '../data/countries';

// Emission factors (kg CO2)
export const EMISSION_FACTORS = {
  electricity: 0.92, // kg CO2 per kWh
  naturalGas: 5.3, // kg CO2 per therm
  lpg: 3.0, // kg CO2 per kg
  water: 0.298, // kg CO2 per liter
  waste: 0.5, // kg CO2 per kg (landfill)
  recycling: -0.2, // kg CO2 saved per kg recycled
  vehicles: {
    petrol: 0.271, // kg CO2 per km
    diesel: 0.247, // kg CO2 per km
    electric: 0.053, // kg CO2 per km (considering electricity mix)
    hybrid: 0.156, // kg CO2 per km
  },
  diet: {
    'meat-heavy': 3300, // kg CO2 per year per person
    average: 2500, // kg CO2 per year per person
    vegetarian: 1700, // kg CO2 per year per person
    vegan: 1500, // kg CO2 per year per person
  },
  goods: {
    clothing: 22, // kg CO2 per item
    electronics: 300, // kg CO2 per item
    furniture: 0.5, // kg CO2 per currency unit
    streaming: {
      SD: 0.0036, // kg CO2 per hour
      HD: 0.0072, // kg CO2 per hour
      '4K': 0.0108, // kg CO2 per hour
    },
  },
  digital: {
    dataUsage: 0.5, // kg CO2 per GB
    crypto: 700, // kg CO2 per transaction
  },
  travel: {
    hotelNight: 30, // kg CO2 per night
    flightShortHaul: 200, // kg CO2 per flight
    flightLongHaul: 1000, // kg CO2 per flight
  },
  packaging: 2.1, // kg CO2 per kg
};

export const calculateEmissions = (data: HouseholdData): EmissionResults => {
  // Get location-specific electricity factor
  const country = getCountryByCode(data.location || 'US');
  const electricityFactor = country?.electricityFactor || EMISSION_FACTORS.electricity;

  // Electricity emissions (annual)
  const electricityEmissions = data.electricity * 12 * electricityFactor;
  
  // Utilities emissions (annual)
  const naturalGasEmissions = (data.naturalGas || 0) * 12 * EMISSION_FACTORS.naturalGas;
  const lpgEmissions = (data.lpgUsage || 0) * 12 * EMISSION_FACTORS.lpg;
  const waterEmissions = (data.waterUsage || 0) * 365 * EMISSION_FACTORS.water;
  const wasteEmissions = (data.wasteGeneration || 0) * 52 * EMISSION_FACTORS.waste;
  const recyclingBenefit = (data.wasteGeneration || 0) * (data.recyclingRate || 0) / 100 * 52 * EMISSION_FACTORS.recycling;

  // Transportation emissions (annual)
  const transportationEmissions = data.weeklyDistance * 52 * EMISSION_FACTORS.vehicles[data.vehicleType];
  const fuelEmissions = (data.monthlyFuel || 0) * 12 * 2.31; // kg CO2 per liter petrol
  const publicTransportEmissions = (data.publicTransport || 0) * 52 * 0.089; // kg CO2 per km
  const flightEmissions = (data.flightsShortHaul || 0) * EMISSION_FACTORS.travel.flightShortHaul + 
                         (data.flightsLongHaul || 0) * EMISSION_FACTORS.travel.flightLongHaul;
  const rideshareEmissions = (data.rideshareUsage || 0) * 12 * 0.2; // kg CO2 per km
  const evChargingEmissions = (data.evCharging || 0) * 12 * electricityFactor;

  // Diet emissions (annual, adjusted for household size)
  const dietEmissions = EMISSION_FACTORS.diet[data.dietType] * data.householdSize;
  const foodWasteEmissions = (data.foodWaste || 0) * 12 * 3.3; // kg CO2 per kg food waste
  const mealsOutEmissions = (data.mealsOut || 0) * 52 * 2.5; // kg CO2 per meal
  
  // Goods & Services emissions (annual)
  const clothingEmissions = (data.clothingPurchases || 0) * EMISSION_FACTORS.goods.clothing;
  const electronicsEmissions = (data.electronicsPurchases || 0) * EMISSION_FACTORS.goods.electronics;
  const furnitureEmissions = (data.furnitureSpending || 0) * EMISSION_FACTORS.goods.furniture;
  const streamingEmissions = (data.streamingHours || 0) * 12 * EMISSION_FACTORS.goods.streaming[data.streamingQuality || 'HD'];
  
  // Shopping & Digital emissions (annual)
  const packagingEmissions = (data.packagingWaste || 0) * 12 * EMISSION_FACTORS.packaging;
  const dataEmissions = (data.dataUsage || 0) * 12 * EMISSION_FACTORS.digital.dataUsage;
  const cryptoEmissions = (data.cryptoTransactions || 0) * 12 * EMISSION_FACTORS.digital.crypto;
  
  // Travel & Leisure emissions (annual)
  const hotelEmissions = (data.hotelNights || 0) * EMISSION_FACTORS.travel.hotelNight;
  const recreationalDrivingEmissions = (data.recreationalDriving || 0) * 12 * EMISSION_FACTORS.vehicles[data.vehicleType];

  // Calculate totals by category
  const utilitiesTotal = electricityEmissions + naturalGasEmissions + lpgEmissions + waterEmissions + wasteEmissions + recyclingBenefit;
  const transportationTotal = transportationEmissions + fuelEmissions + publicTransportEmissions + flightEmissions + rideshareEmissions + evChargingEmissions + recreationalDrivingEmissions;
  const dietTotal = dietEmissions + foodWasteEmissions + mealsOutEmissions;
  const goodsTotal = clothingEmissions + electronicsEmissions + furnitureEmissions + streamingEmissions;
  const digitalTotal = packagingEmissions + dataEmissions + cryptoEmissions;
  const travelTotal = hotelEmissions;
  
  const total = utilitiesTotal + transportationTotal + dietTotal + goodsTotal + digitalTotal + travelTotal;
  const perPerson = Math.round(total / data.householdSize);

  return {
    electricity: Math.round(utilitiesTotal),
    transportation: Math.round(transportationTotal),
    diet: Math.round(dietTotal),
    goods: Math.round(goodsTotal),
    digital: Math.round(digitalTotal),
    travel: Math.round(travelTotal),
    total: Math.round(total),
    perPerson,
  };
};

export const formatEmissions = (emissions: number): string => {
  if (emissions >= 1000) {
    return `${(emissions / 1000).toFixed(1)} tons`;
  }
  return `${emissions} kg`;
};