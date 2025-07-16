import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import InputFormPage from './pages/InputFormPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import TrackerPage from './pages/TrackerPage';
import FamilyPage from './pages/FamilyPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculator" element={<InputFormPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/family" element={<FamilyPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;