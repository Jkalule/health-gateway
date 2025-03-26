import React from 'react';
import { Card } from 'react-bootstrap';
import './Map.css';

const Map = ({ data }) => {
  if (!data || !data.regions) return null;

  const getColorIntensity = (region) => {
    const maxCases = Math.max(...Object.values(data.regions).map(r => r.cases));
    const intensity = (region.cases / maxCases) * 100;
    return `rgba(220, 53, 69, ${intensity * 0.7 / 100})`;
  };

  return (
    <div className="map-container">
      <div className="uganda-map">
        {Object.entries(data.regions).map(([id, region]) => (
          <div key={id} className={`region ${id}`}>
            <div 
              className="region-shape"
              style={{ backgroundColor: getColorIntensity(region) }}
            >
              <div className="region-tooltip">
                <strong>{region.name}</strong>
                <div>Cases: {region.cases.toLocaleString()}</div>
                <div>Active: {region.active.toLocaleString()}</div>
                <div>Critical: {region.critical.toLocaleString()}</div>
                <div>Change: {region.changeRate >= 0 ? '+' : ''}{region.changeRate}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="map-summary">
        <div className="summary-item">
          <label>Most Affected Region:</label>
          <span>{data.summary.mostAffected}</span>
        </div>
        <div className="summary-item">
          <label>Total Active Cases:</label>
          <span>{data.summary.totalActive.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <label>Total Critical Cases:</label>
          <span>{data.summary.totalCritical.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Map;