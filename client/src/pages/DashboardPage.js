import React, { useEffect, useState } from 'react';
import { useHealthData } from '../context/HealthDataContext';
import DiseaseTracker from '../components/DiseaseTracker';
import Charts from '../components/Charts';
import MapView from '../components/MapView';

const DashboardPage = () => {
  const { healthData, loading, error } = useHealthData();
  const [activeDisease, setActiveDisease] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');

  if (loading) {
    return <div className="loading-container"><div className="loader"></div></div>;
  }

  if (error) {
    return <div className="error-message">Error loading health data: {error}</div>;
  }

  const diseaseOptions = [
    { id: 'all', name: 'All Diseases' },
    { id: 'covid19', name: 'COVID-19' },
    { id: 'ebola', name: 'Ebola' },
    { id: 'malaria', name: 'Malaria' },
    { id: 'tuberculosis', name: 'Tuberculosis' }
  ];

  const timeRangeOptions = [
    { id: '7days', name: '7 Days' },
    { id: '30days', name: '30 Days' },
    { id: '90days', name: '90 Days' },
    { id: '1year', name: '1 Year' }
  ];

  const filteredData = activeDisease === 'all' 
    ? healthData 
    : healthData.filter(item => item.disease === activeDisease);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Health Data Dashboard</h1>
        <div className="dashboard-filters">
          <div className="filter-group">
            <label htmlFor="disease-filter">Disease:</label>
            <select 
              id="disease-filter" 
              value={activeDisease} 
              onChange={(e) => setActiveDisease(e.target.value)}
            >
              {diseaseOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="time-filter">Time Range:</label>
            <select 
              id="time-filter" 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
            >
              {timeRangeOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="disease-tracker-section">
        <h2>Current Status</h2>
        <DiseaseTracker data={filteredData} timeRange={timeRange} />
      </div>

      <div className="charts-section">
        <h2>Trend Analysis</h2>
        <Charts data={filteredData} disease={activeDisease} timeRange={timeRange} />
      </div>

      <div className="map-section">
        <h2>Geographic Distribution</h2>
        <MapView data={filteredData} disease={activeDisease} />
      </div>
    </div>
  );
};

export default DashboardPage; 