import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Uganda Health Gateway</h5>
            <p className="footer-description">
              Real-time health data and pandemic outbreak tracking across Uganda.
              Stay informed about disease outbreaks and health alerts.
            </p>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Navigation</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/alerts">Alerts</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Resources</h5>
            <ul className="footer-links">
              <li>
                <Link to="/resources/regional-data">Regional Data</Link>
              </li>
              <li>
                <Link to="/resources/vaccination">Vaccination Sites</Link>
              </li>
              <li>
                <Link to="/resources/testing">Testing Centers</Link>
              </li>
              <li>
                <Link to="/resources/guidelines">Health Guidelines</Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="footer-heading">Contact</h5>
            <ul className="footer-links contact-links">
              <li>
                <i className="bi bi-telephone"></i> 0800-100-066
              </li>
              <li>
                <i className="bi bi-envelope"></i> info@health.go.ug
              </li>
              <li>
                <i className="bi bi-geo-alt"></i> Kampala, Uganda
              </li>
            </ul>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <p className="mb-0">
            &copy; {currentYear} Uganda Health Gateway. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
