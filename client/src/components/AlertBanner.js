import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AlertBanner = ({ alerts }) => {
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

  return (
    <div className="alert-banner severity-critical">
      <div className="alert-content">
        <span className="alert-label">Critical Health Alert:</span>
        <span className="alert-message">{currentAlert.title}</span>
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
        <Link to="/alerts" className="alert-details-link">
          View Details
        </Link>
        <button className="alert-dismiss-button" onClick={handleDismiss} aria-label="Dismiss alerts">
          ✕
        </button>
      </div>
    </div>
  );
};

export default AlertBanner; 