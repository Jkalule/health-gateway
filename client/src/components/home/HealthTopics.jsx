import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';
import OptimizedImage from '../common/OptimizedImage';
import './HealthTopics.css';

const HealthTopics = ({ topics }) => {
  return (
    <div className="health-topics">
      <div className="section-header">
        <FaHeartbeat className="section-icon" />
        <h2>Featured Health Topics</h2>
      </div>
      <div className="topics-grid">
        {topics.map((topic) => (
          <Link to={topic.link} key={topic.id} className="topic-card">
            <div className="topic-image">
              <OptimizedImage
                src={topic.image}
                alt={topic.title}
                className="topic-img"
                width={400}
                height={225}
              />
            </div>
            <div className="topic-content">
              <h3 className="topic-title">{topic.title}</h3>
              <p className="topic-description">{topic.description}</p>
              <div className="topic-meta">
                <span className="topic-category">{topic.category}</span>
                {topic.isNew && <span className="topic-badge">New</span>}
              </div>
              <div className="topic-resources">
                <span className="resource-count">{topic.resourceCount} resources</span>
                <span className="resource-type">{topic.resourceType}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="topics-footer">
        <Link to="/health-topics" className="view-all-link">
          View all health topics
        </Link>
      </div>
    </div>
  );
};

export default HealthTopics;
