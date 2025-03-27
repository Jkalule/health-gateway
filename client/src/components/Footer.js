import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';
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
              Your trusted source for health information and disease tracking.
              Access real-time updates and comprehensive health guidelines.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com/ugandahealth" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook />
              </a>
              <a href="https://twitter.com/ugandahealth" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/ugandahealth" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
            </div>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/health-guidelines">Health Guidelines</Link>
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
                <Link to="/resources/alerts">Health Alerts</Link>
              </li>
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Contact</h5>
            <ul className="footer-links">
              <li>
                <a href="tel:0800100066" className="d-flex align-items-center">
                  <FaPhone className="me-2" />
                  0800-100-066
                </a>
              </li>
              <li>
                <a href="mailto:info@health.go.ug" className="d-flex align-items-center">
                  <FaEnvelope className="me-2" />
                  info@health.go.ug
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} Uganda Health Gateway. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
