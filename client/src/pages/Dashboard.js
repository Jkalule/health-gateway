import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import Charts from '../components/Charts';
import Map from '../components/Map';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateSampleData, generateRegionalData } from '../utils/sampleData';
import { diseases } from '../data/diseaseData';
import { useAlerts } from '../context/AlertContext';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { alerts, loading: alertsLoading } = useAlerts() || { alerts: [], loading: false };
  
  const queryParams = new URLSearchParams(location.search);
  const diseaseParam = queryParams.get('disease');
  
  const [loading, setLoading] = useState(true);
  const [selectedDisease, setSelectedDisease] = useState(diseaseParam || 'covid19');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [dashboardData, setDashboardData] = useState(null);
  const [mapData, setMapData] = useState(null);

  const diseaseList = Object.keys(diseases);
  const timeRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  useEffect(() => {
    if (selectedDisease) {
      navigate(`/dashboard?disease=${selectedDisease}`, { replace: true });
    }
  }, [selectedDisease, navigate]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = generateSampleData(selectedDisease, selectedTimeRange);
      const regionData = generateRegionalData(selectedDisease);
      setDashboardData(data);
      setMapData(regionData);
      setLoading(false);
    };
    loadData();
  }, [selectedDisease, selectedTimeRange]);

  if (loading || alertsLoading) return <LoadingSpinner />;

  return (
    <Container fluid className="dashboard-container">
      {/* Health Alerts Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h4>Health Alerts</h4>
            </Card.Header>
            <Card.Body>
              {alerts && alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <Alert 
                    key={index} 
                    variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'info'}
                    className="mb-3"
                  >
                    <Alert.Heading>{alert.title}</Alert.Heading>
                    <p>{alert.description}</p>
                    <div className="d-flex justify-content-between">
                      <small>Region: {alert.region}</small>
                      <small>Date: {new Date(alert.date).toLocaleDateString()}</small>
                    </div>
                  </Alert>
                ))
              ) : (
                <p>No active health alerts at this time.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Disease Statistics Controls */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Select Disease</Form.Label>
            <Form.Select
              value={selectedDisease}
              onChange={(e) => setSelectedDisease(e.target.value)}
            >
              {diseaseList.map(disease => (
                <option key={disease} value={disease}>
                  {diseases[disease].name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Time Range</Form.Label>
            <Form.Select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Statistics Charts */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h4>Disease Statistics</h4>
            </Card.Header>
            <Card.Body>
              <Charts data={dashboardData} disease={selectedDisease} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Regional Map */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Regional Distribution</h4>
            </Card.Header>
            <Card.Body>
              <Map data={mapData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;