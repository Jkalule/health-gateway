import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHealthData } from '../context/HealthDataContext';
import { useAlerts } from '../context/AlertContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './HomePage.css';

const HomePage = () => {
  const { healthData, loading: healthLoading, error: healthError } = useHealthData();
  const { alerts, loading: alertsLoading, error: alertsError } = useAlerts || { alerts: [], loading: false, error: null };
  const [featuredStories, setFeaturedStories] = useState([]);
  const [healthUpdates, setHealthUpdates] = useState([]);
  const [usingMockData, setUsingMockData] = useState(false);
  
  // Set mock data indicator
  useEffect(() => {
    setUsingMockData(
      process.env.NODE_ENV === 'development' || 
      healthError !== null || 
      alertsError !== null ||
      !healthData || 
      !alerts || 
      healthData.length === 0 || 
      alerts.length === 0
    );
  }, [healthData, alerts, healthError, alertsError]);
  
  // Prepare featured stories and health updates
  useEffect(() => {
    if (healthData && healthData.length > 0 && alerts && alerts.length > 0) {
      // Create featured stories from alerts and health data
      const stories = [
        {
          id: 'featured-1',
          title: alerts[0]?.title || 'Health Alert in Uganda',
          description: alerts[0]?.message || 'Important health information for citizens',
          category: alerts[0]?.disease || 'health',
          date: alerts[0]?.date || new Date().toISOString(),
          featured: true
        },
        ...alerts.slice(1, 4).map((alert, index) => ({
          id: `featured-${index + 2}`,
          title: alert.title,
          description: alert.message,
          category: alert.disease,
          date: alert.date
        }))
      ];
      
      setFeaturedStories(stories);
      
      // Group health data by disease for updates
      const diseaseGroups = {};
      healthData.forEach(item => {
        if (!diseaseGroups[item.disease]) {
          diseaseGroups[item.disease] = [];
        }
        diseaseGroups[item.disease].push(item);
      });
      
      // Create health updates from disease groups
      const updates = Object.entries(diseaseGroups).map(([disease, items]) => {
        const totalCases = items.reduce((sum, item) => sum + (item.cases || 0), 0);
        const activeCases = items.reduce((sum, item) => sum + (item.activeCases || 0), 0);
        
        return {
          id: `update-${disease}`,
          title: `${disease.toUpperCase()} Update: ${totalCases.toLocaleString()} Total Cases`,
          description: `Active cases: ${activeCases.toLocaleString()}. See the latest data and trends for ${disease}.`,
          category: disease,
          date: items[0]?.lastUpdated || new Date().toISOString()
        };
      });
      
      setHealthUpdates(updates);
    } else {
      // Fallback mock data if real data isn't available
      setFeaturedStories([
        {
          id: 'featured-1',
          title: 'COVID-19 Cases Decrease in Western Region',
          description: 'Health officials report declining COVID-19 cases across Western Uganda as vaccination rates improve. Recent data shows a 30% reduction in new cases over the past month, attributed to the increased vaccination coverage reaching 65% of eligible adults in the region.',
          category: 'covid19',
          date: '2025-03-15T10:00:00Z',
          featured: true
        },
        {
          id: 'featured-2',
          title: 'New Malaria Prevention Campaign Launched',
          description: 'Ministry of Health distributes 500,000 mosquito nets in Northern Uganda to combat rising malaria cases. The campaign also includes education on proper net usage and maintenance, as well as community-based surveillance to identify early signs of outbreaks.',
          category: 'malaria',
          date: '2025-03-14T14:30:00Z'
        },
        {
          id: 'featured-3',
          title: 'Tuberculosis Awareness Month Begins',
          description: 'Health centers across the country offer free TB screening throughout March. Educational programs are being conducted in schools and community centers to raise awareness about symptoms, prevention methods, and the importance of early detection and treatment.',
          category: 'tuberculosis',
          date: '2025-03-10T09:15:00Z'
        },
        {
          id: 'featured-4',
          title: 'Ebola Readiness Training for Healthcare Workers',
          description: 'Over 2,000 healthcare workers received specialized training on Ebola response protocols in preparation for potential outbreaks. The training covers proper use of PPE, isolation procedures, and the latest treatment guidelines developed by WHO and CDC.',
          category: 'ebola',
          date: '2025-03-08T11:45:00Z'
        }
      ]);
      
      setHealthUpdates([
        {
          id: 'update-covid19',
          title: 'COVID-19 Vaccination Progress',
          description: 'Uganda has administered over 12 million vaccine doses, with 45% of the eligible population fully vaccinated. Focus now shifts to reaching rural communities with mobile vaccination units.',
          category: 'covid19',
          date: '2025-03-20T08:30:00Z'
        },
        {
          id: 'update-malaria',
          title: 'Malaria Prevention Strategies',
          description: 'Indoor residual spraying programs have shown a 40% reduction in malaria cases in pilot districts. Government plans nationwide expansion of the program over the next year.',
          category: 'malaria',
          date: '2025-03-20T08:30:00Z'
        },
        {
          id: 'update-tuberculosis',
          title: 'Tuberculosis Treatment Success',
          description: 'New treatment protocol shows 95% success rate in clinical trials. The shorter course of treatment improves patient compliance and reduces healthcare costs.',
          category: 'tuberculosis',
          date: '2025-03-20T08:30:00Z'
        },
        {
          id: 'update-nutrition',
          title: 'Childhood Nutrition Programs',
          description: 'School feeding programs reach 2.5 million children daily, reducing malnutrition rates by 18% since implementation. Program now integrates locally-grown foods for sustainability.',
          category: 'nutrition',
          date: '2025-03-20T08:30:00Z'
        }
      ]);
    }
  }, [healthData, alerts]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  const renderHeroSection = () => {
    const featured = featuredStories.find(s => s.featured) || featuredStories[0];
    if (!featured) return null;
    
    return (
      <div className="hero-section">
        <Container>
          <h1>Uganda Health Gateway</h1>
          <p className="lead">Your trusted source for health information and disease tracking</p>
          <p className="mb-4">Real-time health data and pandemic outbreak tracking across Uganda</p>
          <div className="hero-button-container">
            <Link to="/dashboard" className="d-inline-block">
              <Button 
                variant="primary" 
                size="lg" 
                className="hero-btn"
              >
                <i className="fas fa-chart-line me-2"></i> Explore Health Data
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  };
  
  const renderFeaturedSection = () => {
    if (featuredStories.length === 0) return null;
    
    return (
      <section className="featured-section">
        <Container>
          <h2 className="section-title">Latest Health News</h2>
          <Row>
            {featuredStories.map((story, index) => (
              <Col key={story.id} lg={index === 0 ? 12 : 4} md={index === 0 ? 12 : 6} sm={12} className="mb-4">
                <Card className={index === 0 ? "featured-card" : "secondary-card"}>
                  <Card.Body>
                    <span className="category-tag">{story.category}</span>
                    <Card.Title>{story.title}</Card.Title>
                    <Card.Text>{story.description}</Card.Text>
                    <div className="card-footer">
                      <span className="date">{formatDate(story.date)}</span>
                      <Link to={`/dashboard?disease=${story.category}`} className="read-more">Read more</Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  };
  
  const renderUpdatesSection = () => {
    if (healthUpdates.length === 0) return null;
    
    return (
      <section className="updates-section">
        <Container>
          <h2 className="section-title">Health Insights</h2>
          <Row>
            {healthUpdates.map(update => (
              <Col key={update.id} md={6} lg={3} sm={12} className="mb-4">
                <Card className="update-card">
                  <Card.Body>
                    <span className="category-tag">{update.category}</span>
                    <Card.Title>{update.title}</Card.Title>
                    <Card.Text>{update.description}</Card.Text>
                    <div className="card-footer">
                      <span className="date">{formatDate(update.date)}</span>
                      <Link to={`/dashboard?disease=${update.category}`} className="read-more">View Dashboard</Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  };
  
  const renderPreventionSection = () => {
    return (
      <section className="prevention-section">
        <Container>
          <h2 className="section-title">Disease Prevention</h2>
          <p className="section-description">Learn how to protect yourself and your community from common diseases</p>
          
          <Row className="mt-4">
            <Col lg={3} md={6} sm={12} className="mb-4">
              <Card className="prevention-card">
                <Card.Body>
                  <div className="prevention-icon">
                    <i className="fas fa-virus-slash"></i>
                  </div>
                  <Card.Title>COVID-19 Prevention</Card.Title>
                  <ul className="prevention-list">
                    <li><i className="fas fa-check"></i> Get vaccinated and boosted</li>
                    <li><i className="fas fa-check"></i> Wear masks in crowded settings</li>
                    <li><i className="fas fa-check"></i> Wash hands frequently</li>
                    <li><i className="fas fa-check"></i> Maintain good ventilation</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} sm={12} className="mb-4">
              <Card className="prevention-card">
                <Card.Body>
                  <div className="prevention-icon">
                    <i className="fas fa-mosquito"></i>
                  </div>
                  <Card.Title>Malaria Prevention</Card.Title>
                  <ul className="prevention-list">
                    <li><i className="fas fa-check"></i> Sleep under treated nets</li>
                    <li><i className="fas fa-check"></i> Use insect repellent</li>
                    <li><i className="fas fa-check"></i> Clear stagnant water</li>
                    <li><i className="fas fa-check"></i> Take preventive medication</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} sm={12} className="mb-4">
              <Card className="prevention-card">
                <Card.Body>
                  <div className="prevention-icon">
                    <i className="fas fa-lungs"></i>
                  </div>
                  <Card.Title>Tuberculosis Prevention</Card.Title>
                  <ul className="prevention-list">
                    <li><i className="fas fa-check"></i> Get tested if exposed</li>
                    <li><i className="fas fa-check"></i> Complete full treatment</li>
                    <li><i className="fas fa-check"></i> Ensure good ventilation</li>
                    <li><i className="fas fa-check"></i> BCG vaccination for children</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} sm={12} className="mb-4">
              <Card className="prevention-card">
                <Card.Body>
                  <div className="prevention-icon">
                    <i className="fas fa-hands-wash"></i>
                  </div>
                  <Card.Title>General Prevention</Card.Title>
                  <ul className="prevention-list">
                    <li><i className="fas fa-check"></i> Practice good hygiene</li>
                    <li><i className="fas fa-check"></i> Stay up to date on vaccines</li>
                    <li><i className="fas fa-check"></i> Eat a balanced diet</li>
                    <li><i className="fas fa-check"></i> Seek early treatment</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <div className="text-center mt-3">
            <Link to="/resources/guidelines">
              <Button variant="primary">View Detailed Prevention Guidelines</Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  };
  
  const renderResourcesSection = () => {
    return (
      <section className="resources-section">
        <Container>
          <h2 className="section-title">Healthcare Resources</h2>
          <Row>
            <Col md={4} sm={12} className="mb-4">
              <Card className="resource-card">
                <Card.Body>
                  <Card.Title>Find Testing Centers</Card.Title>
                  <Card.Text>Locate COVID-19 and other disease testing centers near you</Card.Text>
                  <Link to="/resources/testing">
                    <Button variant="outline-primary">Find Testing Centers</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} sm={12} className="mb-4">
              <Card className="resource-card">
                <Card.Body>
                  <Card.Title>Vaccination Sites</Card.Title>
                  <Card.Text>Find vaccination locations and available vaccines</Card.Text>
                  <Link to="/resources/vaccination">
                    <Button variant="outline-primary">Find Vaccination Sites</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} sm={12} className="mb-4">
              <Card className="resource-card">
                <Card.Body>
                  <Card.Title>Health Guidelines</Card.Title>
                  <Card.Text>Access official health guidelines and recommendations</Card.Text>
                  <Link to="/resources/guidelines">
                    <Button variant="outline-primary">View Guidelines</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    );
  };
  
  const renderSupportSection = () => {
    return (
      <section className="support-section">
        <Container>
          <h2 className="section-title">Support & Information</h2>
          <Row>
            <Col md={6} sm={12}>
              <div className="support-item">
                <h3>Ministry of Health Hotline</h3>
                <p>Call toll-free: 0800-100-066</p>
                <p>For emergencies and health information</p>
              </div>
            </Col>
            <Col md={6} sm={12}>
              <div className="support-item">
                <h3>Uganda Red Cross</h3>
                <p>Phone: 0417-712-000</p>
                <p>Email: info@redcrossug.org</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  };
  
  if (healthLoading || alertsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home-page">
      {usingMockData && (
        <Alert variant="info" className="m-0 text-center py-2">
          <small><i className="fas fa-info-circle"></i> Displaying sample data for demonstration purposes</small>
        </Alert>
      )}
      {renderHeroSection()}
      <div className="content-section">
        {renderFeaturedSection()}
        {renderUpdatesSection()}
        {renderPreventionSection()}
        {renderResourcesSection()}
        {renderSupportSection()}
      </div>
    </div>
  );
};

export default HomePage;
