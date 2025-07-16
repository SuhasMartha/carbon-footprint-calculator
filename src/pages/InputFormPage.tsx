import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Zap, Car, Utensils, Users, ArrowRight, Home, Droplets, Trash2, ShoppingBag, Smartphone, Plane, CreditCard, MapPin } from 'lucide-react';
import { HouseholdData } from '../types';
import { COUNTRIES, detectUserCountry } from '../data/countries';
import { useTranslation, useApp } from '../contexts/AppContext';
import VoiceInput from '../components/VoiceInput';

const InputFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state } = useApp();
  const [formData, setFormData] = useState<HouseholdData>({
    // Household & Utilities
    electricity: 300,
    naturalGas: 50,
    lpgUsage: 15,
    waterUsage: 150,
    wasteGeneration: 10,
    recyclingRate: 30,
    
    // Transportation
    weeklyDistance: 200,
    vehicleType: 'petrol',
    monthlyFuel: 60,
    publicTransport: 20,
    flightsShortHaul: 2,
    flightsLongHaul: 1,
    rideshareUsage: 50,
    evCharging: 0,
    
    // Food & Diet
    dietType: 'average',
    foodWaste: 5,
    localOrganicFood: 20,
    mealsOut: 3,
    
    // Goods & Services
    clothingPurchases: 20,
    electronicsPurchases: 2,
    furnitureSpending: 5000,
    streamingHours: 30,
    streamingQuality: 'HD',
    
    // Shopping & Lifestyle
    onlineOrders: 8,
    packagingWaste: 3,
    deliveryPreference: 'standard',
    
    // Finance & Digital
    investmentType: 'neutral',
    dataUsage: 50,
    cryptoTransactions: 0,
    
    // Leisure & Travel
    hotelNights: 5,
    eventAttendance: 'mixed',
    recreationalDriving: 100,
    
    // Basic info
    householdSize: 2,
    location: state.userLocation,
  });

  const [errors, setErrors] = useState<Partial<HouseholdData>>({});

  React.useEffect(() => {
    if (!formData.location) {
      detectUserCountry().then(country => {
        setFormData(prev => ({ ...prev, location: country }));
      });
    }
  }, []);

  const handleInputChange = (field: keyof HouseholdData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<HouseholdData> = {};
    
    if (formData.electricity <= 0) {
      newErrors.electricity = 'Electricity usage must be greater than 0';
    }
    
    if (formData.weeklyDistance < 0) {
      newErrors.weeklyDistance = 'Distance cannot be negative';
    }
    
    if (formData.householdSize <= 0) {
      newErrors.householdSize = 'Household size must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save to localStorage
      localStorage.setItem('householdData', JSON.stringify(formData));
      navigate('/results');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Calculator className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('calc.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('calc.description')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Household Size
                </label>
                <input
                  type="number"
                  value={formData.householdSize}
                  onChange={(e) => handleInputChange('householdSize', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="2"
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Household & Utilities */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Home className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Household & Utilities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Electricity (kWh)
                </label>
                <input
                  type="number"
                  value={formData.electricity}
                  onChange={(e) => handleInputChange('electricity', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="300"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Natural Gas (therms)
                </label>
                <input
                  type="number"
                  value={formData.naturalGas}
                  onChange={(e) => handleInputChange('naturalGas', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="50"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly LPG Usage (kg)
                </label>
                <input
                  type="number"
                  value={formData.lpgUsage}
                  onChange={(e) => handleInputChange('lpgUsage', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="15"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Daily Water Usage (L)
                </label>
                <input
                  type="number"
                  value={formData.waterUsage}
                  onChange={(e) => handleInputChange('waterUsage', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="150"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weekly Waste (kg)
                </label>
                <input
                  type="number"
                  value={formData.wasteGeneration}
                  onChange={(e) => handleInputChange('wasteGeneration', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="10"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recycling Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.recyclingRate}
                  onChange={(e) => handleInputChange('recyclingRate', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="30"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Transportation */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Car className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transportation</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weekly Driving Distance (km)
                </label>
                <input
                  type="number"
                  value={formData.weeklyDistance}
                  onChange={(e) => handleInputChange('weeklyDistance', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="200"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vehicle Type
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Fuel (L)
                </label>
                <input
                  type="number"
                  value={formData.monthlyFuel}
                  onChange={(e) => handleInputChange('monthlyFuel', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="60"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weekly Public Transport (km)
                </label>
                <input
                  type="number"
                  value={formData.publicTransport}
                  onChange={(e) => handleInputChange('publicTransport', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="20"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short-haul Flights/Year
                </label>
                <input
                  type="number"
                  value={formData.flightsShortHaul}
                  onChange={(e) => handleInputChange('flightsShortHaul', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="2"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Long-haul Flights/Year
                </label>
                <input
                  type="number"
                  value={formData.flightsLongHaul}
                  onChange={(e) => handleInputChange('flightsLongHaul', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="1"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Food & Diet */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Utensils className="h-6 w-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Food & Diet</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Diet Type
                </label>
                <select
                  value={formData.dietType}
                  onChange={(e) => handleInputChange('dietType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                >
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="average">Average</option>
                  <option value="meat-heavy">Meat-heavy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Food Waste (kg)
                </label>
                <input
                  type="number"
                  value={formData.foodWaste}
                  onChange={(e) => handleInputChange('foodWaste', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Local/Organic Food (%)
                </label>
                <input
                  type="number"
                  value={formData.localOrganicFood}
                  onChange={(e) => handleInputChange('localOrganicFood', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="20"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weekly Meals Out
                </label>
                <input
                  type="number"
                  value={formData.mealsOut}
                  onChange={(e) => handleInputChange('mealsOut', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="3"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Goods & Services */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Goods & Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Annual Clothing Purchases
                </label>
                <input
                  type="number"
                  value={formData.clothingPurchases}
                  onChange={(e) => handleInputChange('clothingPurchases', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="20"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Annual Electronics Purchases
                </label>
                <input
                  type="number"
                  value={formData.electronicsPurchases}
                  onChange={(e) => handleInputChange('electronicsPurchases', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="2"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Annual Furniture Spending
                </label>
                <input
                  type="number"
                  value={formData.furnitureSpending}
                  onChange={(e) => handleInputChange('furnitureSpending', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="5000"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Streaming Hours
                </label>
                <input
                  type="number"
                  value={formData.streamingHours}
                  onChange={(e) => handleInputChange('streamingHours', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="30"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Streaming Quality
                </label>
                <select
                  value={formData.streamingQuality}
                  onChange={(e) => handleInputChange('streamingQuality', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                >
                  <option value="SD">SD</option>
                  <option value="HD">HD</option>
                  <option value="4K">4K</option>
                </select>
              </div>
            </div>
          </div>

          {/* Digital & Finance */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Digital & Finance</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Online Orders
                </label>
                <input
                  type="number"
                  value={formData.onlineOrders}
                  onChange={(e) => handleInputChange('onlineOrders', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="8"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Data Usage (GB)
                </label>
                <input
                  type="number"
                  value={formData.dataUsage}
                  onChange={(e) => handleInputChange('dataUsage', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="50"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investment Type
                </label>
                <select
                  value={formData.investmentType}
                  onChange={(e) => handleInputChange('investmentType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                >
                  <option value="green">Green/ESG</option>
                  <option value="neutral">Neutral</option>
                  <option value="fossil-heavy">Fossil-fuel heavy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Crypto Transactions
                </label>
                <input
                  type="number"
                  value={formData.cryptoTransactions}
                  onChange={(e) => handleInputChange('cryptoTransactions', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Travel & Leisure */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Plane className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Travel & Leisure</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Annual Hotel Nights
                </label>
                <input
                  type="number"
                  value={formData.hotelNights}
                  onChange={(e) => handleInputChange('hotelNights', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Attendance
                </label>
                <select
                  value={formData.eventAttendance}
                  onChange={(e) => handleInputChange('eventAttendance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                >
                  <option value="virtual">Mostly Virtual</option>
                  <option value="mixed">Mixed</option>
                  <option value="in-person">Mostly In-person</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Recreational Driving (km)
                </label>
                <input
                  type="number"
                  value={formData.recreationalDriving}
                  onChange={(e) => handleInputChange('recreationalDriving', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                  placeholder="100"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-all duration-200"
            >
              Calculate My Carbon Footprint
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputFormPage;