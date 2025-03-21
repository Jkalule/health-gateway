import React from 'react';

const DiseaseSelector = ({ selectedDisease, onDiseaseChange, diseases }) => {
  return (
    <div className="filter-component disease-selector">
      <div className="filter-header">
        <div className="filter-icon">🦠</div>
        <label htmlFor="disease-select">Disease</label>
      </div>
      <select
        id="disease-select"
        value={selectedDisease}
        onChange={(e) => onDiseaseChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Diseases</option>
        {diseases.map((disease) => (
          <option key={disease.id} value={disease.id}>
            {disease.name}
          </option>
        ))}
      </select>
      <div className="filter-badge">{diseases.length}</div>
    </div>
  );
};

export default DiseaseSelector; 