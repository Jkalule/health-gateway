import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HealthDataProvider } from './context/HealthDataContext';
import { NotificationProvider } from './context/NotificationContext';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import HealthGuidelines from './pages/HealthGuidelines';
import RegionalDataPage from './pages/RegionalDataPage';
import VaccinationSitesPage from './pages/VaccinationSitesPage';
import TestingCentersPage from './pages/TestingCentersPage';
import AboutPage from './pages/AboutPage';
import { ROUTES } from './constants/routes.constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <HealthDataProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.HEALTH_GUIDELINES} element={<HealthGuidelines />} />
                <Route path={ROUTES.RESOURCES.REGIONAL_DATA} element={<RegionalDataPage />} />
                <Route path={ROUTES.RESOURCES.VACCINATION} element={<VaccinationSitesPage />} />
                <Route path={ROUTES.RESOURCES.TESTING} element={<TestingCentersPage />} />
                <Route path={ROUTES.ABOUT} element={<AboutPage />} />
              </Routes>
            </Layout>
          </Router>
        </HealthDataProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
