import React from 'react';
import { Card } from 'react-bootstrap';
import './HealthDataCard.css';

const HealthDataCard = ({ source }) => {
  const handleClick = () => {
    window.open(source.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      className="health-data-card" 
      onClick={handleClick}
    >
      <Card.Img 
        variant="top" 
        src={source.imageUrl} 
        alt={`${source.title} logo`}
        className="card-image"
      />
      <Card.Body>
        <Card.Title>{source.title}</Card.Title>
        <Card.Text>{source.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HealthDataCard;
