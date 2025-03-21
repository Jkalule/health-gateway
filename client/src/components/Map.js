import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './Map.css';

const Map = ({ data, selectedDisease }) => {
  const [regionData, setRegionData] = useState({
    central: { cases: 0, color: '#f8d7da' },
    eastern: { cases: 0, color: '#f8d7da' },
    northern: { cases: 0, color: '#f8d7da' },
    western: { cases: 0, color: '#f8d7da' }
  });
  
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  // Process the data for map visualization
  useEffect(() => {
    if (!data || !data.regions) return;
    
    const regions = data.regions;
    const processedData = {};
    let maxCases = 0;
    
    // Find the maximum number of cases for color scaling
    Object.keys(regions).forEach(region => {
      const cases = regions[region].cases || 0;
      if (cases > maxCases) maxCases = cases;
    });
    
    // Calculate color intensity based on cases
    Object.keys(regions).forEach(region => {
      const cases = regions[region].cases || 0;
      const intensity = maxCases > 0 ? (cases / maxCases) : 0;
      
      // Color ranges from light pink to dark red
      // Convert to HSL for better color transitions
      const color = getColorForIntensity(intensity);
      
      processedData[region] = {
        cases,
        recoveries: regions[region].recoveries || 0,
        deaths: regions[region].deaths || 0,
        color
      };
    });
    
    setRegionData(processedData);
  }, [data]);
  
  // Function to determine color based on intensity
  const getColorForIntensity = (intensity) => {
    // Start with light red (HSL: 0, 80%, 90%)
    // End with dark red (HSL: 0, 80%, 40%)
    const lightness = 90 - (intensity * 50);
    return `hsl(0, 80%, ${lightness}%)`;
  };
  
  // Handle region click
  const handleRegionClick = (region) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };
  
  // Render region info card
  const renderRegionInfo = () => {
    if (!selectedRegion || !regionData[selectedRegion]) return null;
    
    const region = regionData[selectedRegion];
    
    return (
      <Card className="region-info-card">
        <Card.Body>
          <Card.Title>
            {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} Region
          </Card.Title>
          <div className="region-stats">
            <div className="stat-item">
              <span className="stat-label">Total Cases:</span>
              <span className="stat-value">{region.cases.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Recoveries:</span>
              <span className="stat-value">{region.recoveries.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Deaths:</span>
              <span className="stat-value">{region.deaths.toLocaleString()}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };
  
  // If no data, show a message
  if (!data) {
    return <div className="no-data-message">No regional data available</div>;
  }
  
  return (
    <div className="map-container">
      <div className="map-title">
        {selectedDisease === 'all' ? 'All Diseases' : selectedDisease.toUpperCase()} by Region
      </div>
      
      <div className="map-visualization">
        {/* Simple SVG map representation */}
        <svg viewBox="0 0 400 400" className="region-map">
          {/* Northern Region */}
          <path 
            d="M 100,100 L 300,100 L 300,150 L 100,150 Z" 
            fill={regionData.northern.color}
            onClick={() => handleRegionClick('northern')}
            className={`region ${selectedRegion === 'northern' ? 'selected' : ''}`}
          />
          <text x="200" y="125" textAnchor="middle">Northern</text>
          
          {/* Western Region */}
          <path 
            d="M 100,150 L 175,150 L 175,300 L 100,300 Z" 
            fill={regionData.western.color}
            onClick={() => handleRegionClick('western')}
            className={`region ${selectedRegion === 'western' ? 'selected' : ''}`}
          />
          <text x="137.5" y="225" textAnchor="middle">Western</text>
          
          {/* Central Region */}
          <path 
            d="M 175,150 L 225,150 L 225,300 L 175,300 Z" 
            fill={regionData.central.color}
            onClick={() => handleRegionClick('central')}
            className={`region ${selectedRegion === 'central' ? 'selected' : ''}`}
          />
          <text x="200" y="225" textAnchor="middle">Central</text>
          
          {/* Eastern Region */}
          <path 
            d="M 225,150 L 300,150 L 300,300 L 225,300 Z" 
            fill={regionData.eastern.color}
            onClick={() => handleRegionClick('eastern')}
            className={`region ${selectedRegion === 'eastern' ? 'selected' : ''}`}
          />
          <text x="262.5" y="225" textAnchor="middle">Eastern</text>
        </svg>
        
        {/* Legend */}
        <div className="map-legend">
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: 'hsl(0, 80%, 90%)' }}></div>
            <span>Low</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: 'hsl(0, 80%, 65%)' }}></div>
            <span>Medium</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: 'hsl(0, 80%, 40%)' }}></div>
            <span>High</span>
          </div>
        </div>
      </div>
      
      {/* Selected region information */}
      {renderRegionInfo()}
    </div>
  );
};

export default Map; 