import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <Container>
          <h1>About Uganda Health Gateway</h1>
          <p className="lead">Real-time health data and pandemic outbreak tracking across Uganda</p>
        </Container>
      </div>
      
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={12}>
            <Card className="about-card">
              <Card.Body>
                <h2>Our Mission</h2>
                <p className="mission-statement">
                  To provide accurate, timely, and accessible health data to empower Uganda's citizens, 
                  healthcare professionals, and policymakers in making informed decisions about public health.
                </p>
                <p>
                  The Uganda Health Gateway is dedicated to tracking disease outbreaks, providing health alerts, 
                  and delivering comprehensive health data in an easy-to-understand format. Our platform integrates 
                  data from various sources including the Uganda Ministry of Health, World Health Organization, 
                  and other partners to create a unified resource for health information.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mb-5">
          <Col lg={6} md={12} className="mb-4">
            <Card className="h-100 shadow-sm about-card">
              <Card.Body>
                <h3>Data Sources</h3>
                <p>Our health data is collected from multiple authoritative sources to ensure accuracy and comprehensiveness:</p>
                <ul className="source-list">
                  <li><strong>Uganda Ministry of Health</strong> - Official government health data</li>
                  <li><strong>World Health Organization (WHO)</strong> - Global health standards and statistics</li>
                  <li><strong>UNICEF</strong> - Child health data and vaccination statistics</li>
                  <li><strong>Local Health Districts</strong> - Regional and community health metrics</li>
                  <li><strong>Uganda Bureau of Statistics</strong> - Demographic and population data</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} md={12} className="mb-4">
            <Card className="h-100 shadow-sm about-card">
              <Card.Body>
                <h3>Our Approach</h3>
                <p>We follow several key principles in our data collection and presentation:</p>
                <ul className="approach-list">
                  <li><strong>Accuracy</strong> - Rigorous verification of all health data</li>
                  <li><strong>Timeliness</strong> - Regular updates to provide the most current information</li>
                  <li><strong>Accessibility</strong> - Information presented in clear, understandable formats</li>
                  <li><strong>Inclusivity</strong> - Comprehensive coverage across all regions of Uganda</li>
                  <li><strong>Privacy</strong> - Adherence to data protection standards</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mb-5">
          <Col lg={12}>
            <Card className="about-card">
              <Card.Body>
                <h3>Frequently Asked Questions</h3>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>How often is the data updated?</Accordion.Header>
                    <Accordion.Body>
                      Our data is updated multiple times daily for urgent alerts and health emergencies. 
                      Regular health statistics are updated every 24 hours, with more comprehensive 
                      analyses available on a weekly basis. The last update time is displayed on each dashboard.
                    </Accordion.Body>
                  </Accordion.Item>
                  
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>How can I report a health concern or outbreak?</Accordion.Header>
                    <Accordion.Body>
                      If you're aware of a potential health concern or disease outbreak, please contact the 
                      Uganda Ministry of Health directly at their toll-free number: 0800-100-066. For 
                      emergencies, please call the national emergency line at 999 or 112.
                    </Accordion.Body>
                  </Accordion.Item>
                  
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Is the information on this platform official?</Accordion.Header>
                    <Accordion.Body>
                      Yes, the Uganda Health Gateway partners with official health authorities including the 
                      Ministry of Health to provide verified information. While we strive for accuracy, we 
                      always recommend following the most recent guidelines issued directly by health authorities.
                    </Accordion.Body>
                  </Accordion.Item>
                  
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>How can I use this data for research or reporting?</Accordion.Header>
                    <Accordion.Body>
                      Our data is available for academic research, journalism, and public health initiatives. 
                      Please contact us at data@ugandahealthgateway.org for data access requests, and kindly 
                      cite Uganda Health Gateway as your source when publishing.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col lg={12}>
            <Card className="about-card team-card">
              <Card.Body>
                <h3>Our Partners</h3>
                <div className="partners-section">
                  <div className="partner">
                    <div className="partner-logo">MOH</div>
                    <h4>Ministry of Health</h4>
                  </div>
                  <div className="partner">
                    <div className="partner-logo">WHO</div>
                    <h4>World Health Organization</h4>
                  </div>
                  <div className="partner">
                    <div className="partner-logo">UNICEF</div>
                    <h4>UNICEF Uganda</h4>
                  </div>
                  <div className="partner">
                    <div className="partner-logo">UBOS</div>
                    <h4>Uganda Bureau of Statistics</h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage; 