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
              Your trusted source for health information and disease tracking.
              Access real-time updates and comprehensive health guidelines.
            </p>
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
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Contact</h5>
            <ul className="footer-links">
              <li>
                <a href="tel:0800100066">Hotline: 0800-100-066</a>
              </li>
              <li>
                <a href="mailto:info@health.go.ug">info@health.go.ug</a>
              </li>
            </ul>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col className="text-center">
            <p className="copyright">
              &copy; {currentYear} Uganda Health Gateway. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
