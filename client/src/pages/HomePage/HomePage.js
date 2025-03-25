import React from 'react';
import { Container } from 'react-bootstrap';
import HealthDataGrid from '../../components/HealthDataGrid/HealthDataGrid';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Container>
        <header className="text-center mb-5">
          <h1>Health Gateway</h1>
          <p className="lead">
            Your central hub for real-time health data from trusted global sources
          </p>
        </header>
        <HealthDataGrid />
      </Container>
    </div>
  );
};

export default HomePage;
