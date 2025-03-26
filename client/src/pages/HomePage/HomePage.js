import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HealthDataGrid from '../../components/HealthDataGrid/HealthDataGrid';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="hero-title">
                Uganda Health Gateway
                <span className="accent-dot">.</span>
              </h1>
              <p className="hero-subtitle">
                Real-time health data tracking and analysis for informed decision-making
              </p>
              <div className="hero-actions">
                <Link to="/dashboard">
                  <Button variant="primary" size="lg" className="main-cta">
                    View Dashboard
                  </Button>
                </Link>
                <Link to="/alerts">
                  <Button variant="outline-light" size="lg" className="secondary-cta">
                    Health Alerts
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="main-content">
        <section className="features-section">
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="section-title">Real-Time Health Insights</h2>
              <p className="section-subtitle">
                Access comprehensive health data from trusted sources across Uganda
              </p>
            </Col>
          </Row>
          <HealthDataGrid />
        </section>
      </Container>
    </div>
  );
};

export default HomePage;
