import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../common/Card/Card';
import Button from '../../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import OptimizedImage from '../../common/OptimizedImage';
import './HealthDataCard.css';

const HealthDataCard = ({
  title,
  description,
  imageUrl,
  stats,
  linkTo,
  className = '',
  onClick
}) => {
  return (
    <Card 
      className={`health-data-card ${className}`}
      headerAction={
        linkTo && (
          <Button 
            variant="text" 
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            onClick={() => window.location.href = linkTo}
          >
            View Details
          </Button>
        )
      }
    >
      <div className="health-data-content" onClick={onClick}>
        {imageUrl && (
          <div className="health-data-image">
            <OptimizedImage
              src={imageUrl}
              alt={title}
              effect="blur"
              width={400}
              className="card-img"
            />
          </div>
        )}
        <div className="health-data-info">
          <h4 className="health-data-title">{title}</h4>
          <p className="health-data-description">{description}</p>
          {stats && (
            <div className="health-data-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

HealthDataCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  linkTo: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default HealthDataCard;
