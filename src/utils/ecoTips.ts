import { HouseholdData, EmissionResults, EcoTip } from '../types';

export const generateEcoTips = (data: HouseholdData, results: EmissionResults): EcoTip[] => {
  const tips: EcoTip[] = [
    {
      id: 'led-lighting',
      category: 'Energy',
      tip: 'Switch to LED bulbs throughout your home to reduce energy consumption.',
      potentialSavings: Math.round(results.electricity * 0.1),
      applicable: data.electricity > 200,
    },
    {
      id: 'thermostat',
      category: 'Energy',
      tip: 'Install a programmable thermostat to optimize heating and cooling.',
      potentialSavings: Math.round(results.electricity * 0.15),
      applicable: data.electricity > 300,
    },
    {
      id: 'public-transport',
      category: 'Transportation',
      tip: 'Use public transportation or bike for short trips to reduce vehicle emissions.',
      potentialSavings: Math.round(results.transportation * 0.3),
      applicable: data.weeklyDistance > 100,
    },
    {
      id: 'electric-vehicle',
      category: 'Transportation',
      tip: 'Consider switching to an electric or hybrid vehicle for your next purchase.',
      potentialSavings: Math.round(results.transportation * 0.6),
      applicable: data.vehicleType === 'petrol' || data.vehicleType === 'diesel',
    },
    {
      id: 'reduce-meat',
      category: 'Diet',
      tip: 'Reduce meat consumption by 2 days per week to lower your dietary footprint.',
      potentialSavings: Math.round(results.diet * 0.2),
      applicable: data.dietType === 'meat-heavy' || data.dietType === 'average',
    },
    {
      id: 'local-food',
      category: 'Diet',
      tip: 'Buy local and seasonal produce to reduce transportation emissions.',
      potentialSavings: Math.round(results.diet * 0.1),
      applicable: true,
    },
    {
      id: 'energy-audit',
      category: 'Energy',
      tip: 'Conduct a home energy audit to identify areas for improvement.',
      potentialSavings: Math.round(results.electricity * 0.2),
      applicable: data.electricity > 400,
    },
    {
      id: 'renewable-energy',
      category: 'Energy',
      tip: 'Consider installing solar panels or switching to renewable energy.',
      potentialSavings: Math.round(results.electricity * 0.8),
      applicable: data.electricity > 500,
    },
    {
      id: 'reduce-flights',
      category: 'Transportation',
      tip: 'Consider virtual meetings or train travel instead of short-haul flights.',
      potentialSavings: Math.round((data.flightsShortHaul || 0) * 200 * 0.5),
      applicable: (data.flightsShortHaul || 0) > 2,
    },
    {
      id: 'sustainable-fashion',
      category: 'Goods',
      tip: 'Buy fewer, higher-quality clothing items and consider second-hand options.',
      potentialSavings: Math.round((data.clothingPurchases || 0) * 22 * 0.3),
      applicable: (data.clothingPurchases || 0) > 15,
    },
    {
      id: 'reduce-packaging',
      category: 'Digital',
      tip: 'Choose eco-friendly delivery options and reduce online shopping frequency.',
      potentialSavings: Math.round((data.onlineOrders || 0) * 12 * 2),
      applicable: (data.onlineOrders || 0) > 5,
    },
    {
      id: 'green-investments',
      category: 'Finance',
      tip: 'Consider switching to ESG or green investment funds.',
      potentialSavings: 500,
      applicable: data.investmentType === 'fossil-heavy',
    },
  ];

  return tips.filter(tip => tip.applicable).sort((a, b) => b.potentialSavings - a.potentialSavings);
};