import React from 'react';
import { Link } from 'react-router-dom';
import { useAlerts } from '../context/AlertContext';
import AlertBanner from '../components/AlertBanner';

const HomePage = () => {
  const { alerts } = useAlerts();
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');
  
  return (
    <div className="home-page">
      {criticalAlerts.length > 0 && (
        <AlertBanner alerts={criticalAlerts} />
      )}
      
      <div className="hero-section">
        <h1>Uganda Health Information Gateway</h1>
        <p>Real-time health data and pandemic outbreak tracking across Uganda</p>
        <div className="hero-buttons">
          <Link to="/dashboard" className="primary-button">View Dashboard</Link>
          <Link to="/alerts" className="secondary-button">Health Alerts</Link>
        </div>
      </div>
      
      <div className="features-grid">
        <div className="feature-card">
          <h3>Real-time Disease Tracking</h3>
          <p>Monitor active cases, recoveries, and trends for COVID-19, Ebola, Monkeypox, and other diseases</p>
          <Link to="/dashboard">Explore Dashboard</Link>
        </div>
        
        <div className="feature-card">
          <h3>Regional Data</h3>
          <p>View health statistics filtered by Central, Western, Eastern, and Northern Uganda</p>
          <Link to="/regional-data">View Regional Data</Link>
        </div>
        
        <div className="feature-card">
          <h3>Vaccination Sites</h3>
          <p>Find vaccination locations near you with information on available vaccines</p>
          <Link to="/vaccination-sites">Find Vaccination Sites</Link>
        </div>
        
        <div className="feature-card">
          <h3>Testing Centers</h3>
          <p>Locate testing facilities with details on test types and operating hours</p>
          <Link to="/testing-centers">Find Testing Centers</Link>
        </div>
      </div>
      
      <div className="data-sources">
        <h3>Data Sources</h3>
        <p>Our data is aggregated from trusted sources including:</p>
        <ul>
          <li>World Health Organization (WHO)</li>
          <li>Uganda Ministry of Health</li>
          <li>UNICEF</li>
          <li>Major hospitals and healthcare facilities</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
