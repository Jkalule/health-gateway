import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookMedical, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import './HealthResources.css';

const HealthResources = ({ resources }) => {
  return (
    <div className="health-resources">
      <div className="section-header">
        <FaBookMedical className="section-icon" />
        <h2>Health Resources & Publications</h2>
      </div>
      <div className="resources-grid">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div className="resource-type">
              <span className="resource-badge" data-type={resource.type}>
                {resource.type}
              </span>
            </div>
            <h3 className="resource-title">{resource.title}</h3>
            <p className="resource-description">{resource.description}</p>
            <div className="resource-meta">
              <span className="resource-date">{resource.date}</span>
              <span className="resource-format">{resource.format}</span>
            </div>
            <div className="resource-actions">
              {resource.downloadUrl ? (
                <a 
                  href={resource.downloadUrl} 
                  className="resource-download"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload /> Download
                </a>
              ) : (
                <Link to={resource.link} className="resource-link">
                  <FaExternalLinkAlt /> View Details
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="resources-footer">
        <Link to="/resources" className="view-all-link">
          Browse all resources
        </Link>
      </div>
    </div>
  );
};

export default HealthResources;
