import React from 'react';
import PropTypes from 'prop-types';
import HealthDataCard from './HealthDataCard';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import './HealthDataGrid.css';

const HealthDataGrid = ({ 
  items, 
  loading = false, 
  error = null,
  className = '' 
}) => {
  if (loading) {
    return (
      <div className="health-data-loading">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="health-data-error">
        <p>{error}</p>
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="health-data-empty">
        <p>No health data available.</p>
      </div>
    );
  }

  return (
    <div className={`health-data-grid ${className}`}>
      {items.map((item, index) => (
        <div key={item.id || index} className="health-data-grid-item">
          <HealthDataCard {...item} />
        </div>
      ))}
    </div>
  );
};

HealthDataGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      stats: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          label: PropTypes.string.isRequired
        })
      ),
      linkTo: PropTypes.string
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string
};

export default HealthDataGrid;
