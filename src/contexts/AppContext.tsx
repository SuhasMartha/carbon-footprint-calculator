import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Language, Theme, Household, User } from '../types';
import { detectUserCountry } from '../data/countries';
import { translations } from '../data/translations';

interface AppState {
  language: Language;
  theme: Theme;
  currentUser: User | null;
  currentHousehold: Household | null;
  isVoiceEnabled: boolean;
  userLocation: string;
}

type AppAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_HOUSEHOLD'; payload: Household | null }
  | { type: 'TOGGLE_VOICE'; payload: boolean }
  | { type: 'SET_LOCATION'; payload: string };

const initialState: AppState = {
  language: 'en',
  theme: 'light',
  currentUser: null,
  currentHousehold: null,
  isVoiceEnabled: false,
  userLocation: 'US',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_HOUSEHOLD':
      return { ...state, currentHousehold: action.payload };
    case 'TOGGLE_VOICE':
      return { ...state, isVoiceEnabled: action.payload };
    case 'SET_LOCATION':
      return { ...state, userLocation: action.payload };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedUser = localStorage.getItem('currentUser');
    const savedHousehold = localStorage.getItem('currentHousehold');

    if (savedLanguage) {
      dispatch({ type: 'SET_LANGUAGE', payload: savedLanguage });
    }

    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }

    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }

    if (savedHousehold) {
      dispatch({ type: 'SET_HOUSEHOLD', payload: JSON.parse(savedHousehold) });
    }

    // Detect user location
    detectUserCountry().then(country => {
      dispatch({ type: 'SET_LOCATION', payload: country });
    });

    // Apply theme to document
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, []);

  useEffect(() => {
    // Save preferences to localStorage
    localStorage.setItem('language', state.language);
    localStorage.setItem('theme', state.theme);
    
    if (state.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    }
    
    if (state.currentHousehold) {
      localStorage.setItem('currentHousehold', JSON.stringify(state.currentHousehold));
    }

    // Apply theme
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.language, state.theme, state.currentUser, state.currentHousehold]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { state } = useApp();
  
  const t = (key: string): string => {
    return translations[state.language]?.[key] || key;
  };

  return { t, language: state.language };
};