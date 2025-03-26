import React, { useState } from 'react';

const AlertBanner = ({ alerts, onViewDetails }) => {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || alerts.length === 0) {
    return null;
  }

  const currentAlert = alerts[currentAlertIndex];

  const handleNext = () => {
    setCurrentAlertIndex((prev) => (prev + 1) % alerts.length);
  };

  const handlePrevious = () => {
    setCurrentAlertIndex((prev) => (prev - 1 + alerts.length) % alerts.length);
  };

  const handleDismiss = () => {
    setDismissed(true);
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'high':
        return 'severity-critical';
      case 'medium':
        return 'severity-warning';
      default:
        return 'severity-info';
    }
  };

  return (
    <div className={`alert-banner ${getSeverityClass(currentAlert.severity)}`}>
      <div className="alert-content">
        <span className="alert-label">Health Alert:</span>
        <span className="alert-message">{currentAlert.message}</span>
        {alerts.length > 1 && (
          <div className="alert-counter">
            {currentAlertIndex + 1} of {alerts.length}
          </div>
        )}
      </div>
      
      <div className="alert-actions">
        {alerts.length > 1 && (
          <>
            <button className="alert-nav-button" onClick={handlePrevious} aria-label="Previous alert">
              &#8249;
            </button>
            <button className="alert-nav-button" onClick={handleNext} aria-label="Next alert">
              &#8250;
            </button>
          </>
        )}
        <button 
          className="alert-details-button" 
          onClick={() => onViewDetails(currentAlert)}
        >
          View Details
        </button>
        <button 
          className="alert-dismiss-button" 
          onClick={handleDismiss} 
          aria-label="Dismiss alert"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;