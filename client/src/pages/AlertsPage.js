import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, Button, Alert } from 'react-bootstrap';
import { useAlerts } from '../context/AlertContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './AlertsPage.css';

const AlertsPage = () => {
  const { alerts, loading, error } = useAlerts();
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [usingMockData, setUsingMockData] = useState(false);
  const [filters, setFilters] = useState({
    severity: 'all',
    disease: 'all',
    region: 'all',
    searchTerm: ''
  });
  
  // Set mock data indicator
  useEffect(() => {
    setUsingMockData(process.env.NODE_ENV === 'development' || error !== null);
  }, [error]);
  
  // Group alerts by date
  const groupAlertsByDate = (alertsList) => {
    const groups = {};
    alertsList.forEach(alert => {
      const date = new Date(alert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(alert);
    });
    return groups;
  };
  
  // Apply filters
  useEffect(() => {
    if (!alerts) return;
    
    let result = [...alerts];
    
    if (filters.severity !== 'all') {
      result = result.filter(alert => alert.severity === filters.severity);
    }
    
    if (filters.disease !== 'all') {
      result = result.filter(alert => alert.disease === filters.disease);
    }
    
    if (filters.region !== 'all') {
      result = result.filter(alert => alert.region === filters.region);
    }
    
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(alert => 
        alert.title.toLowerCase().includes(term) || 
        alert.message.toLowerCase().includes(term)
      );
    }
    
    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setFilteredAlerts(result);
  }, [alerts, filters]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      severity: 'all',
      disease: 'all',
      region: 'all',
      searchTerm: ''
    });
  };
  
  // Get unique values for filter dropdowns
  const getUniqueValues = (field) => {
    if (!alerts) return [];
    const values = [...new Set(alerts.map(alert => alert[field]))];
    return values.filter(Boolean); // Remove undefined/null values
  };
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'secondary';
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  const groupedAlerts = groupAlertsByDate(filteredAlerts);
  const uniqueDiseases = getUniqueValues('disease');
  const uniqueRegions = getUniqueValues('region');
  
  return (
    <div className="alerts-page">
      {usingMockData && (
        <Alert variant="info" className="m-0 text-center py-2">
          <small><i className="fas fa-info-circle"></i> Displaying sample alerts for demonstration purposes</small>
        </Alert>
      )}
      <div className="page-header">
        <Container>
          <h1>Health Alerts</h1>
          <p className="lead">Important health notifications and outbreak alerts across Uganda</p>
        </Container>
      </div>
      
      <Container className="py-4">
        <Row>
          <Col lg={3} md={12} className="mb-4">
            <Card className="filter-card">
              <Card.Header>
                <h3>Filter Alerts</h3>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Search</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Search alerts..." 
                      name="searchTerm"
                      value={filters.searchTerm}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                
                  <Form.Group className="mb-3">
                    <Form.Label>Severity</Form.Label>
                    <Form.Select 
                      name="severity" 
                      value={filters.severity} 
                      onChange={handleFilterChange}
                    >
                      <option value="all">All Severities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Disease</Form.Label>
                    <Form.Select 
                      name="disease" 
                      value={filters.disease} 
                      onChange={handleFilterChange}
                    >
                      <option value="all">All Diseases</option>
                      {uniqueDiseases.map(disease => (
                        <option key={disease} value={disease}>{disease}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Region</Form.Label>
                    <Form.Select 
                      name="region" 
                      value={filters.region} 
                      onChange={handleFilterChange}
                    >
                      <option value="all">All Regions</option>
                      {uniqueRegions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Button 
                    variant="outline-secondary" 
                    className="w-100"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            
            <Card className="mt-4 stats-card">
              <Card.Body>
                <h4>Alert Stats</h4>
                <div className="alert-stat">
                  <span className="stat-label">Total Alerts:</span>
                  <span className="stat-value">{alerts?.length || 0}</span>
                </div>
                <div className="alert-stat">
                  <span className="stat-label">High Severity:</span>
                  <span className="stat-value">{alerts?.filter(a => a.severity === 'high').length || 0}</span>
                </div>
                <div className="alert-stat">
                  <span className="stat-label">Filtered Results:</span>
                  <span className="stat-value">{filteredAlerts.length}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={9} md={12}>
            {Object.keys(groupedAlerts).length > 0 ? (
              Object.entries(groupedAlerts).map(([date, dateAlerts]) => (
                <div key={date} className="date-group">
                  <h3 className="date-header">{date}</h3>
                  {dateAlerts.map(alert => (
                    <Card key={alert.id} className="alert-card mb-3">
                      <Card.Body>
                        <div className="alert-header">
                          <h4 className="alert-title">{alert.title}</h4>
                          <div className="alert-meta">
                            <Badge bg={getSeverityColor(alert.severity)} className="severity-badge">
                              {alert.severity}
                            </Badge>
                            <span className="alert-time">{formatDate(alert.date)}</span>
                          </div>
                        </div>
                        
                        <div className="alert-tags">
                          {alert.disease && (
                            <Badge bg="primary" className="tag">{alert.disease}</Badge>
                          )}
                          {alert.region && (
                            <Badge bg="secondary" className="tag">{alert.region}</Badge>
                          )}
                        </div>
                        
                        <Card.Text className="alert-message">
                          {alert.message}
                        </Card.Text>
                        
                        {alert.source && (
                          <div className="alert-source">
                            Source: <span>{alert.source}</span>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ))
            ) : (
              <Alert variant="info" className="text-center my-5">
                <Alert.Heading>No alerts found</Alert.Heading>
                <p>There are no alerts matching your current filters.</p>
                <Button variant="primary" onClick={resetFilters}>Reset Filters</Button>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AlertsPage; 