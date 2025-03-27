import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartPie, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './HealthStats.css';

const HealthStats = ({ stats }) => {
  const getChangeIcon = (change) => {
    if (change > 0) return <FaArrowUp className="change-icon increase" />;
    if (change < 0) return <FaArrowDown className="change-icon decrease" />;
    return null;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="health-stats">
      <div className="section-header">
        <FaChartPie className="section-icon" />
        <h2>Health Statistics</h2>
      </div>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card" data-category={stat.category}>
            <div className="stat-header">
              <h3>{stat.title}</h3>
              {stat.change !== 0 && (
                <div className={`stat-change ${stat.change > 0 ? 'increase' : 'decrease'}`}>
                  {getChangeIcon(stat.change)}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              )}
            </div>
            <div className="stat-value">
              {formatNumber(stat.value)}
              {stat.unit && <span className="stat-unit">{stat.unit}</span>}
            </div>
            <div className="stat-meta">
              <span className="stat-period">{stat.period}</span>
              <Link to={stat.link} className="stat-details">
                View Details
              </Link>
            </div>
            {stat.subStats && (
              <div className="sub-stats">
                {stat.subStats.map((subStat, index) => (
                  <div key={index} className="sub-stat">
                    <span className="sub-stat-label">{subStat.label}</span>
                    <span className="sub-stat-value">
                      {formatNumber(subStat.value)}
                      {subStat.unit && <span className="sub-stat-unit">{subStat.unit}</span>}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="stats-footer">
        <Link to="/statistics" className="view-all-link">
          View detailed statistics
        </Link>
      </div>
    </div>
  );
};

export default HealthStats;
