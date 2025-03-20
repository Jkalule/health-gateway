import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Uganda Health Gateway</h3>
          <p>Real-time health data and pandemic outbreak tracking across Uganda.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/alerts">Alerts</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li><a href="https://www.who.int" target="_blank" rel="noopener noreferrer">World Health Organization</a></li>
            <li><a href="https://health.go.ug" target="_blank" rel="noopener noreferrer">Uganda Ministry of Health</a></li>
            <li><a href="https://www.unicef.org/uganda" target="_blank" rel="noopener noreferrer">UNICEF Uganda</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@ugandahealthgateway.org</p>
          <p>Phone: +256 414 123456</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Uganda Health Gateway. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
