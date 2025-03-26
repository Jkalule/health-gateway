import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './DiseaseCard.css';

const DiseaseCard = ({ disease }) => {
  const Icon = disease.icon;

  return (
    <Card className="disease-card h-100">
      <Card.Body>
        <div className="disease-card-header">
          <div className="disease-icon">
            <Icon />
          </div>
          <div className="disease-meta">
            <div className={`severity-indicator ${disease.severity.toLowerCase().replace(' ', '-')}`}>
              {disease.severity}
            </div>
          </div>
        </div>
        <Card.Title>{disease.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{disease.category}</Card.Subtitle>
        <Card.Text>{disease.shortDescription}</Card.Text>
        <div className="transmission-list">
          <small className="text-muted">Transmission:</small>
          <ul>
            {disease.transmission.slice(0, 2).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <Link 
          to={`/health-guidelines/${disease.id}`} 
          className="stretched-link"
          aria-label={`View detailed information about ${disease.name}`}
        />
      </Card.Body>
      <Card.Footer>
        <small className="text-danger">
          <strong>Urgency:</strong> {disease.urgency}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default DiseaseCard;
