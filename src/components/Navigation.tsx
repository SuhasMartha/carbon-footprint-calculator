import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Home, Calculator, BarChart3, Info, Calendar, Users, Trophy } from 'lucide-react';
import { useTranslation } from '../contexts/AppContext';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/calculator', label: t('nav.calculator'), icon: Calculator },
    { path: '/results', label: 'Results', icon: BarChart3 },
    { path: '/tracker', label: t('nav.tracker'), icon: Calendar },
    { path: '/family', label: t('nav.family'), icon: Users },
    { path: '/about', label: t('nav.about'), icon: Info },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">Carbon Calculator</span>
          </Link>
          
          <div className="hidden lg:flex space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>

          <div className="lg:hidden">
            <button className="text-gray-700 hover:text-green-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-4 gap-1 p-2">
            {navItems.slice(0, 4).map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-md text-xs font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;