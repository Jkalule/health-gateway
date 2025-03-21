import React from 'react';

const RegionFilter = ({ selectedRegion, onRegionChange, regions }) => {
  return (
    <div className="filter-component region-filter">
      <div className="filter-header">
        <div className="filter-icon">🗺️</div>
        <label htmlFor="region-select">Region</label>
      </div>
      <select
        id="region-select"
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Regions</option>
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>
      <div className="filter-badge">{regions.length}</div>
    </div>
  );
};

export default RegionFilter; 