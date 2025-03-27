import React from 'react';
import { Card } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import './EmergencyUpdates.css';

const EmergencyUpdates = ({ updates }) => {
  return (
    <div className="emergency-updates">
      <div className="section-header">
        <FaExclamationTriangle className="section-icon" />
        <h2>Emergency Updates</h2>
      </div>
      <div className="updates-grid">
        {updates.map((update) => (
          <Card key={update.id} className="emergency-card">
            <Card.Body>
              <div className="emergency-status" data-severity={update.severity}>
                {update.severity}
              </div>
              <Card.Title>{update.title}</Card.Title>
              <Card.Text>{update.description}</Card.Text>
              <div className="emergency-meta">
                <span className="emergency-date">{update.date}</span>
                <span className="emergency-location">{update.location}</span>
              </div>
              <a href={update.link} className="emergency-link">
                Read more
              </a>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmergencyUpdates;
