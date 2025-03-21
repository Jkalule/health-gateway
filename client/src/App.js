import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HealthDataProvider } from './context/HealthDataContext';
import { AlertProvider } from './context/AlertContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AlertsPage from './pages/AlertsPage';
import RegionalDataPage from './pages/RegionalDataPage';
import VaccinationSitesPage from './pages/VaccinationSitesPage';
import TestingCentersPage from './pages/TestingCentersPage';
import HealthGuidelinesPage from './pages/HealthGuidelinesPage';
import AboutPage from './pages/AboutPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <HealthDataProvider>
        <AlertProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/alerts" element={<AlertsPage />} />
                
                {/* Resource Routes */}
                <Route path="/resources/regional-data" element={<RegionalDataPage />} />
                <Route path="/resources/vaccination" element={<VaccinationSitesPage />} />
                <Route path="/resources/testing" element={<TestingCentersPage />} />
                <Route path="/resources/guidelines" element={<HealthGuidelinesPage />} />
                
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AlertProvider>
      </HealthDataProvider>
    </Router>
  );
}

export default App;
