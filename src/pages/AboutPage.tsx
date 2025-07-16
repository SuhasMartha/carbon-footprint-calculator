import React from 'react';
import { Leaf, Target, Users, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Carbon Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Understanding climate impact through data-driven insights
          </p>
        </div>

        <div className="space-y-12">
          {/* What is Carbon Footprint */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">What is a Carbon Footprint?</h2>
            </div>
            <div className="prose prose-lg text-gray-700">
              <p>
                A carbon footprint represents the total amount of greenhouse gases, primarily carbon dioxide (CO₂), 
                that are emitted directly or indirectly by an individual, organization, or activity. It's measured 
                in CO₂ equivalent (CO₂e) and serves as a crucial metric for understanding environmental impact.
              </p>
              <p>
                For households, the main sources of carbon emissions typically include:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>Energy consumption:</strong> Electricity, heating, and cooling</li>
                <li><strong>Transportation:</strong> Cars, public transport, and travel</li>
                <li><strong>Diet:</strong> Food production and consumption patterns</li>
                <li><strong>Consumer goods:</strong> Manufacturing and disposal of products</li>
              </ul>
            </div>
          </section>

          {/* How We Calculate */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">How We Calculate Emissions</h2>
            </div>
            <div className="prose prose-lg text-gray-700">
              <p>
                Our calculator uses scientifically-backed emission factors from reputable sources including 
                the EPA, IPCC, and peer-reviewed research. Here's how we calculate each category:
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">🏠 Electricity</h3>
                  <p className="text-sm text-green-700">
                    <strong>Factor:</strong> 0.92 kg CO₂ per kWh<br />
                    <strong>Calculation:</strong> Monthly usage × 12 months × emission factor
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">🚗 Transportation</h3>
                  <p className="text-sm text-blue-700">
                    <strong>Factors:</strong> Petrol (0.271 kg/km), Diesel (0.247 kg/km), Electric (0.053 kg/km)<br />
                    <strong>Calculation:</strong> Weekly distance × 52 weeks × vehicle emission factor
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">🍽️ Diet</h3>
                  <p className="text-sm text-yellow-700">
                    <strong>Factors:</strong> Meat-heavy (3.3 tons/year), Vegetarian (1.7 tons/year), Vegan (1.5 tons/year)<br />
                    <strong>Calculation:</strong> Diet emission factor × household size
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why It Matters */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Why It Matters</h2>
            </div>
            <div className="prose prose-lg text-gray-700">
              <p>
                Understanding your carbon footprint is the first step toward making meaningful environmental changes. 
                By knowing where your emissions come from, you can:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🎯 Set Targets</h3>
                  <p className="text-sm text-gray-600">
                    Establish realistic goals for reducing your environmental impact
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">📊 Track Progress</h3>
                  <p className="text-sm text-gray-600">
                    Monitor improvements over time and see the impact of your actions
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">💡 Make Informed Decisions</h3>
                  <p className="text-sm text-gray-600">
                    Choose actions that will have the biggest impact on your footprint
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🌍 Join the Movement</h3>
                  <p className="text-sm text-gray-600">
                    Be part of the global effort to combat climate change
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Global Context */}
          <section className="bg-green-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Global Context</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">4.8 tons</div>
                <div className="text-green-100">Global average CO₂ per person per year</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">2.3 tons</div>
                <div className="text-green-100">Target to limit warming to 1.5°C</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">16.5 tons</div>
                <div className="text-green-100">Average American household emissions</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;