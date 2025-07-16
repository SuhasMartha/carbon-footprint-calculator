import React, { useState, useEffect } from 'react';
import { Calendar, TrendingDown, TrendingUp, Plus, BarChart3 } from 'lucide-react';
import { MonthlyEntry, HouseholdData } from '../types';
import { calculateEmissions } from '../utils/calculations';
import { calculateBadges } from '../utils/badgeSystem';
import { useTranslation } from '../contexts/AppContext';
import LineChart from '../components/LineChart';
import BadgeDisplay from '../components/BadgeDisplay';

const TrackerPage: React.FC = () => {
  const { t } = useTranslation();
  const [monthlyEntries, setMonthlyEntries] = useState<MonthlyEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('monthlyEntries');
    if (saved) {
      setMonthlyEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntries = (entries: MonthlyEntry[]) => {
    setMonthlyEntries(entries);
    localStorage.setItem('monthlyEntries', JSON.stringify(entries));
  };

  const addEntry = (data: HouseholdData) => {
    const results = calculateEmissions(data);
    const newEntry: MonthlyEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      data,
      results,
    };

    const updatedEntries = [...monthlyEntries, newEntry].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    saveEntries(updatedEntries);
    setShowAddForm(false);
  };

  const getTrend = () => {
    if (monthlyEntries.length < 2) return null;
    
    const latest = monthlyEntries[monthlyEntries.length - 1];
    const previous = monthlyEntries[monthlyEntries.length - 2];
    const change = latest.results.total - previous.results.total;
    const percentage = (change / previous.results.total) * 100;
    
    return { change, percentage };
  };

  const trend = getTrend();
  const badges = monthlyEntries.length > 0 
    ? calculateBadges(monthlyEntries, monthlyEntries[monthlyEntries.length - 1].results)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Calendar className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Monthly Footprint Tracker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your carbon footprint over time and see your progress
          </p>
        </div>

        {/* Stats Cards */}
        {monthlyEntries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Latest Footprint</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(monthlyEntries[monthlyEntries.length - 1].results.total / 1000).toFixed(1)} tons
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Trend</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {trend ? Math.abs(trend.percentage).toFixed(1) : '0'}%
                    </p>
                    {trend && (
                      trend.change < 0 ? (
                        <TrendingDown className="h-6 w-6 text-green-600" />
                      ) : (
                        <TrendingUp className="h-6 w-6 text-red-600" />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{badges.length}</p>
                </div>
                <div className="text-2xl">🏆</div>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        {monthlyEntries.length > 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Emission Trends
            </h2>
            <LineChart data={monthlyEntries} />
          </div>
        )}

        {/* Badges */}
        {badges.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Your Achievements
            </h2>
            <BadgeDisplay badges={badges} showAll />
          </div>
        )}

        {/* Add Entry Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Monthly Entry
          </button>
        </div>

        {/* Add Entry Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Add Monthly Entry
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This will use your current calculator data. Make sure to update your calculator first.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    const savedData = localStorage.getItem('householdData');
                    if (savedData) {
                      addEntry(JSON.parse(savedData));
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Entry
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {monthlyEntries.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No entries yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start tracking your monthly carbon footprint to see trends and earn badges
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Your First Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackerPage;