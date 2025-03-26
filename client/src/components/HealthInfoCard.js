import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './HealthInfoCard.css';

const HealthInfoCard = ({ title, description, imageUrl, sourceUrl, source, date }) => {
  return (
    <Card className="health-info-card">
      <div className="card-image-container">
        <Card.Img variant="top" src={imageUrl} alt={title} className="card-image" />
        <div className="source-badge">{source}</div>
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="card-footer">
          <small className="text-muted">{new Date(date).toLocaleDateString()}</small>
          <Button 
            variant="outline-primary" 
            href={sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Read More
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HealthInfoCard;
