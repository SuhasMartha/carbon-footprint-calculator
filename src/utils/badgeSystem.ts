import { Badge, EmissionResults, MonthlyEntry } from '../types';

export const calculateBadges = (
  monthlyEntries: MonthlyEntry[],
  currentResults: EmissionResults
): Badge[] => {
  const badges: Badge[] = [];
  const now = new Date().toISOString();

  // Footprint-based badges
  const perPersonFootprint = currentResults.perPerson;
  
  if (perPersonFootprint <= 1500) {
    badges.push({
      id: 'climate-hero',
      name: 'Climate Hero',
      description: 'Achieved under 1.5 tons CO₂ per person annually',
      icon: '🌟',
      level: 'platinum',
      earnedDate: now,
      criteria: { type: 'footprint', threshold: 1500 }
    });
  } else if (perPersonFootprint <= 2300) {
    badges.push({
      id: 'eco-champion',
      name: 'Eco Champion',
      description: 'Achieved under 2.3 tons CO₂ per person annually',
      icon: '🏆',
      level: 'gold',
      earnedDate: now,
      criteria: { type: 'footprint', threshold: 2300 }
    });
  } else if (perPersonFootprint <= 4800) {
    badges.push({
      id: 'green-guardian',
      name: 'Green Guardian',
      description: 'Below global average footprint',
      icon: '🥈',
      level: 'silver',
      earnedDate: now,
      criteria: { type: 'footprint', threshold: 4800 }
    });
  } else if (perPersonFootprint <= 8000) {
    badges.push({
      id: 'eco-starter',
      name: 'Eco Starter',
      description: 'Started your sustainability journey',
      icon: '🥉',
      level: 'bronze',
      earnedDate: now,
      criteria: { type: 'footprint', threshold: 8000 }
    });
  }

  // Reduction badges
  if (monthlyEntries.length >= 2) {
    const latest = monthlyEntries[monthlyEntries.length - 1];
    const previous = monthlyEntries[monthlyEntries.length - 2];
    const reduction = ((previous.results.total - latest.results.total) / previous.results.total) * 100;

    if (reduction >= 30) {
      badges.push({
        id: 'super-reducer',
        name: 'Super Reducer',
        description: 'Reduced emissions by 30% or more',
        icon: '⚡',
        level: 'gold',
        earnedDate: now,
        criteria: { type: 'reduction', threshold: 30 }
      });
    } else if (reduction >= 15) {
      badges.push({
        id: 'emission-cutter',
        name: 'Emission Cutter',
        description: 'Reduced emissions by 15% or more',
        icon: '✂️',
        level: 'silver',
        earnedDate: now,
        criteria: { type: 'reduction', threshold: 15 }
      });
    } else if (reduction >= 5) {
      badges.push({
        id: 'progress-maker',
        name: 'Progress Maker',
        description: 'Reduced emissions by 5% or more',
        icon: '📈',
        level: 'bronze',
        earnedDate: now,
        criteria: { type: 'reduction', threshold: 5 }
      });
    }
  }

  // Consistency badges
  if (monthlyEntries.length >= 6) {
    badges.push({
      id: 'consistent-tracker',
      name: 'Consistent Tracker',
      description: 'Tracked emissions for 6+ months',
      icon: '📊',
      level: 'silver',
      earnedDate: now,
      criteria: { type: 'consistency', threshold: 6 }
    });
  }

  if (monthlyEntries.length >= 12) {
    badges.push({
      id: 'year-long-champion',
      name: 'Year-Long Champion',
      description: 'Tracked emissions for a full year',
      icon: '🗓️',
      level: 'gold',
      earnedDate: now,
      criteria: { type: 'consistency', threshold: 12 }
    });
  }

  return badges;
};

export const calculatePoints = (badges: Badge[]): number => {
  const pointValues = {
    bronze: 10,
    silver: 25,
    gold: 50,
    platinum: 100
  };

  return badges.reduce((total, badge) => total + pointValues[badge.level], 0);
};