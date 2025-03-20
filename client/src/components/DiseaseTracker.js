import React from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { LineChart, BarChart } from './Charts';
import DiseaseSelector from './DiseaseSelector';
import RegionFilter from './RegionFilter';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const DiseaseTracker = () => {
  const { 
    healthData, 
    selectedDisease, 
    setSelectedDisease,
    selectedRegion,
    setSelectedRegion
  } = useHealthData();

  const { loading, error } = healthData;
  const diseaseData = healthData.diseases[selectedDisease];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!diseaseData) return <ErrorMessage message={`No data available for ${selectedDisease}`} />;

  return (
    <div className="disease-tracker">
      <div className="tracker-controls">
        <DiseaseSelector 
          selectedDisease={selectedDisease}
          onChange={setSelectedDisease}
          diseases={Object.keys(healthData.diseases)}
        />
        <RegionFilter
          selectedRegion={selectedRegion}
          onChange={setSelectedRegion}
        />
      </div>
      
      <div className="tracker-statistics">
        <div className="stat-card">
          <h3>Total Cases</h3>
          <p className="stat-value">{diseaseData.totalCases.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Active Cases</h3>
          <p className="stat-value">{diseaseData.activeCases.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Recoveries</h3>
          <p className="stat-value">{diseaseData.recoveries.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Deaths</h3>
          <p className="stat-value">{diseaseData.deaths.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="tracker-charts">
        <div className="chart-container">
          <h3>Daily New Cases</h3>
          <LineChart data={diseaseData.dailyCases} />
        </div>
        <div className="chart-container">
          <h3>Cases by Region</h3>
          <BarChart data={diseaseData.regionData} />
        </div>
      </div>
    </div>
  );
};

export default DiseaseTracker;
