import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HealthDataProvider } from './context/HealthDataContext';
import { AlertProvider } from './context/AlertContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';
import RegionalDataPage from './pages/RegionalDataPage';
import VaccinationSitesPage from './pages/VaccinationSitesPage';
import TestingCentersPage from './pages/TestingCentersPage';
import AboutPage from './pages/AboutPage';

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
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/regional-data" element={<RegionalDataPage />} />
                <Route path="/vaccination-sites" element={<VaccinationSitesPage />} />
                <Route path="/testing-centers" element={<TestingCentersPage />} />
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
