import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message-container">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <div className="error-details">
          <h3 className="error-title">Error Occurred</h3>
          <p className="error-text">
            {message || 'An error occurred while loading data. Please try again later.'}
          </p>
        </div>
      </div>
      <div className="error-actions">
        <button className="error-action-button" onClick={() => window.location.reload()}>
          <span className="action-icon">🔄</span> Refresh
        </button>
        <button className="error-action-button" onClick={() => console.log('Support request sent')}>
          <span className="action-icon">📞</span> Contact Support
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage; 