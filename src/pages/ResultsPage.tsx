import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, PieChart, Download, Lightbulb, ArrowLeft } from 'lucide-react';
import { HouseholdData, EmissionResults } from '../types';
import { calculateEmissions, formatEmissions } from '../utils/calculations';
import { generateEcoTips } from '../utils/ecoTips';
import PieChartComponent from '../components/PieChart';
import BarChartComponent from '../components/BarChart';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<HouseholdData | null>(null);
  const [results, setResults] = useState<EmissionResults | null>(null);
  const [showChart, setShowChart] = useState<'pie' | 'bar'>('pie');

  useEffect(() => {
    const savedData = localStorage.getItem('householdData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
      setResults(calculateEmissions(parsedData));
    } else {
      navigate('/calculator');
    }
  }, [navigate]);

  if (!data || !results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Calculating your carbon footprint...</p>
        </div>
      </div>
    );
  }

  const ecoTips = generateEcoTips(data, results);

  const handleDownloadReport = () => {
    const reportData = {
      date: new Date().toISOString().split('T')[0],
      householdData: data,
      results: results,
      ecoTips: ecoTips,
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carbon-footprint-report-${reportData.date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Carbon Footprint Results
          </h1>
          <p className="text-lg text-gray-600">
            Based on your household data, here's your estimated annual CO₂ emissions
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {formatEmissions(results.total)}
            </div>
            <div className="text-gray-600">Total Annual CO₂</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <div className="text-xl font-bold text-green-600 mb-1">
                  {formatEmissions(results.electricity)}
                </div>
                <div className="text-sm text-gray-600">Utilities</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600 mb-1">
                  {formatEmissions(results.transportation)}
                </div>
                <div className="text-sm text-gray-600">Transport</div>
              </div>
              <div>
                <div className="text-xl font-bold text-yellow-600 mb-1">
                  {formatEmissions(results.diet)}
                </div>
                <div className="text-sm text-gray-600">Diet</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600 mb-1">
                  {formatEmissions(results.goods)}
                </div>
                <div className="text-sm text-gray-600">Goods</div>
              </div>
              <div>
                <div className="text-xl font-bold text-red-600 mb-1">
                  {formatEmissions(results.digital)}
                </div>
                <div className="text-sm text-gray-600">Digital</div>
              </div>
              <div>
                <div className="text-xl font-bold text-orange-600 mb-1">
                  {formatEmissions(results.travel)}
                </div>
                <div className="text-sm text-gray-600">Travel</div>
              </div>
            </div>
          </div>
        </div>

        {/* Per Person Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatEmissions(results.perPerson)}
            </div>
            <div className="text-gray-600">Per Person</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              2.3 tons
            </div>
            <div className="text-gray-600">Global Target</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-gray-600 mb-2">
              4.8 tons
            </div>
            <div className="text-gray-600">Global Average</div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Emission Breakdown
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowChart('pie')}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  showChart === 'pie'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <PieChart className="mr-2 h-4 w-4" />
                Pie Chart
              </button>
              <button
                onClick={() => setShowChart('bar')}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  showChart === 'bar'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Bar Chart
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            {showChart === 'pie' ? (
              <PieChartComponent data={results} />
            ) : (
              <BarChartComponent data={results} />
            )}
          </div>
        </div>

        {/* Eco Tips */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <Lightbulb className="h-8 w-8 text-yellow-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Personalized Eco-Tips
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ecoTips.map((tip) => (
              <div key={tip.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {tip.category}
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    -{formatEmissions(tip.potentialSavings)}/year
                  </span>
                </div>
                <p className="text-gray-700">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/calculator')}
            className="flex items-center justify-center px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Recalculate
          </button>
          <button
            onClick={handleDownloadReport}
            className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;