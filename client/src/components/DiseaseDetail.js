import React from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './DiseaseDetail.css';

const DiseaseDetail = ({ disease }) => {
  const navigate = useNavigate();
  const Icon = disease.icon;

  return (
    <div className="disease-detail">
      <Container>
        <Button 
          variant="link" 
          className="back-button mb-4"
          onClick={() => navigate('/health-guidelines')}
        >
          <FaArrowLeft /> Back to Guidelines
        </Button>

        <div className="disease-header">
          <div className="d-flex align-items-center mb-3">
            <div className="disease-icon">
              <Icon />
            </div>
            <div className="disease-title">
              <h1>{disease.title}</h1>
              <div className="disease-meta">
                <span className={`severity-badge ${disease.severity.toLowerCase().replace(' ', '-')}`}>
                  Severity: {disease.severity}
                </span>
                <span className="category-badge">
                  {disease.category}
                </span>
              </div>
            </div>
          </div>

          <Alert variant="warning" className="urgency-alert">
            <FaExclamationTriangle className="me-2" />
            <strong>Urgency Notice:</strong> {disease.urgency}
          </Alert>

          <div className="disease-overview">
            <p>{disease.overview}</p>
          </div>

          <div className="transmission-box">
            <h5>Transmission</h5>
            <ul className="transmission-list">
              {disease.transmission.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <Row className="mt-4">
          {Object.entries(disease.sections).map(([key, section]) => (
            <Col md={6} lg={6} key={key} className="mb-4">
              <Card className="section-card h-100">
                <Card.Header>
                  <h3>{section.title}</h3>
                </Card.Header>
                <Card.Body>
                  <ul className="section-list">
                    {section.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="emergency-box mt-4">
          <h4>Emergency Warning Signs</h4>
          <p>Seek immediate medical attention if you experience any severe symptoms or your condition worsens rapidly.</p>
          <div className="d-flex justify-content-center mt-3">
            <Button variant="danger" size="lg">
              Find Nearest Healthcare Facility
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DiseaseDetail;
