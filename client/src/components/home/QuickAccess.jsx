import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaSyringe, 
  FaHospital, 
  FaPhoneAlt,
  FaChartLine,
  FaClipboardList
} from 'react-icons/fa';
import './QuickAccess.css';

const QuickAccess = () => {
  const quickTools = [
    {
      id: 1,
      title: 'Find Testing Centers',
      description: 'Locate COVID-19 and other disease testing facilities near you',
      icon: <FaMapMarkerAlt />,
      link: '/testing-centers',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Vaccination Sites',
      description: 'Find vaccination locations and schedule appointments',
      icon: <FaSyringe />,
      link: '/vaccination-sites',
      color: 'green'
    },
    {
      id: 3,
      title: 'Health Facilities',
      description: 'Directory of hospitals and health centers',
      icon: <FaHospital />,
      link: '/health-facilities',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Emergency Contacts',
      description: 'Important phone numbers and emergency services',
      icon: <FaPhoneAlt />,
      link: '/emergency-contacts',
      color: 'red'
    },
    {
      id: 5,
      title: 'Health Statistics',
      description: 'View current health data and trends',
      icon: <FaChartLine />,
      link: '/statistics',
      color: 'orange'
    },
    {
      id: 6,
      title: 'Health Guidelines',
      description: 'Access official health guidelines and protocols',
      icon: <FaClipboardList />,
      link: '/guidelines',
      color: 'teal'
    }
  ];

  return (
    <div className="quick-access">
      <div className="section-header">
        <h2>Quick Access</h2>
        <p className="section-description">
          Essential tools and resources at your fingertips
        </p>
      </div>
      <div className="quick-tools-grid">
        {quickTools.map((tool) => (
          <Link to={tool.link} key={tool.id} className="quick-tool-card" data-color={tool.color}>
            <div className="tool-icon">
              {tool.icon}
            </div>
            <div className="tool-content">
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
