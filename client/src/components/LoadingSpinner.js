import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">
        <p className="loading-message">Loading health data</p>
        <p className="loading-hint">This may take a few moments</p>
      </div>
      <div className="loading-progress">
        <div className="loading-progress-bar"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 