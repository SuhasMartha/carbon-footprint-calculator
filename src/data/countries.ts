import { Country } from '../types';

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', electricityFactor: 0.855, flag: '🇺🇸' },
  { code: 'IN', name: 'India', electricityFactor: 0.82, flag: '🇮🇳' },
  { code: 'CN', name: 'China', electricityFactor: 0.681, flag: '🇨🇳' },
  { code: 'DE', name: 'Germany', electricityFactor: 0.401, flag: '🇩🇪' },
  { code: 'FR', name: 'France', electricityFactor: 0.056, flag: '🇫🇷' },
  { code: 'GB', name: 'United Kingdom', electricityFactor: 0.233, flag: '🇬🇧' },
  { code: 'JP', name: 'Japan', electricityFactor: 0.518, flag: '🇯🇵' },
  { code: 'CA', name: 'Canada', electricityFactor: 0.130, flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', electricityFactor: 0.634, flag: '🇦🇺' },
  { code: 'BR', name: 'Brazil', electricityFactor: 0.074, flag: '🇧🇷' },
  { code: 'RU', name: 'Russia', electricityFactor: 0.322, flag: '🇷🇺' },
  { code: 'ZA', name: 'South Africa', electricityFactor: 0.928, flag: '🇿🇦' },
  { code: 'KR', name: 'South Korea', electricityFactor: 0.459, flag: '🇰🇷' },
  { code: 'MX', name: 'Mexico', electricityFactor: 0.458, flag: '🇲🇽' },
  { code: 'ID', name: 'Indonesia', electricityFactor: 0.709, flag: '🇮🇩' },
  { code: 'TR', name: 'Turkey', electricityFactor: 0.486, flag: '🇹🇷' },
  { code: 'SA', name: 'Saudi Arabia', electricityFactor: 0.631, flag: '🇸🇦' },
  { code: 'AR', name: 'Argentina', electricityFactor: 0.364, flag: '🇦🇷' },
  { code: 'IT', name: 'Italy', electricityFactor: 0.233, flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', electricityFactor: 0.154, flag: '🇪🇸' },
  { code: 'TH', name: 'Thailand', electricityFactor: 0.521, flag: '🇹🇭' },
  { code: 'PL', name: 'Poland', electricityFactor: 0.781, flag: '🇵🇱' },
  { code: 'NL', name: 'Netherlands', electricityFactor: 0.285, flag: '🇳🇱' },
  { code: 'MY', name: 'Malaysia', electricityFactor: 0.708, flag: '🇲🇾' },
  { code: 'BD', name: 'Bangladesh', electricityFactor: 0.610, flag: '🇧🇩' },
];

export const getCountryByCode = (code: string): Country | undefined => {
  return COUNTRIES.find(country => country.code === code);
};

export const detectUserCountry = async (): Promise<string> => {
  try {
    // Try to detect country using timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countryMappings: Record<string, string> = {
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'America/Chicago': 'US',
      'Asia/Kolkata': 'IN',
      'Asia/Shanghai': 'CN',
      'Europe/Berlin': 'DE',
      'Europe/Paris': 'FR',
      'Europe/London': 'GB',
      'Asia/Tokyo': 'JP',
      'America/Toronto': 'CA',
      'Australia/Sydney': 'AU',
      'America/Sao_Paulo': 'BR',
    };
    
    return countryMappings[timezone] || 'US';
  } catch {
    return 'US'; // Default fallback
  }
};