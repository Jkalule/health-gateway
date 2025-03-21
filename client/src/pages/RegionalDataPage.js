import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Table, Button } from 'react-bootstrap';
import './RegionalDataPage.css';

const RegionalDataPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('cases');
  
  // Mock data for demonstration
  const regions = [
    { id: 'central', name: 'Central Region' },
    { id: 'eastern', name: 'Eastern Region' },
    { id: 'northern', name: 'Northern Region' },
    { id: 'western', name: 'Western Region' }
  ];
  
  const metrics = [
    { id: 'cases', name: 'Disease Cases' },
    { id: 'vaccination', name: 'Vaccination Rates' },
    { id: 'facilities', name: 'Healthcare Facilities' },
    { id: 'mortality', name: 'Mortality Rates' }
  ];
  
  const regionalData = {
    central: {
      cases: [
        { disease: 'Malaria', count: 4280, trend: 'decreasing' },
        { disease: 'Tuberculosis', count: 1230, trend: 'stable' },
        { disease: 'HIV/AIDS', count: 2150, trend: 'decreasing' },
        { disease: 'Pneumonia', count: 1850, trend: 'increasing' },
        { disease: 'Typhoid', count: 760, trend: 'decreasing' }
      ],
      vaccination: [
        { type: 'BCG', percentage: 92, target: 95 },
        { type: 'DPT3', percentage: 89, target: 90 },
        { type: 'Polio', percentage: 87, target: 90 },
        { type: 'Measles', percentage: 84, target: 95 },
        { type: 'COVID-19', percentage: 56, target: 70 }
      ],
      facilities: [
        { type: 'Hospitals', count: 24, status: 'adequate' },
        { type: 'Health Centers IV', count: 42, status: 'adequate' },
        { type: 'Health Centers III', count: 98, status: 'inadequate' },
        { type: 'Health Centers II', count: 215, status: 'inadequate' },
        { type: 'Private Clinics', count: 345, status: 'adequate' }
      ],
      mortality: [
        { cause: 'Malaria', rate: 5.2, trend: 'decreasing' },
        { cause: 'HIV/AIDS', rate: 4.8, trend: 'decreasing' },
        { cause: 'Road Accidents', rate: 6.7, trend: 'increasing' },
        { cause: 'Respiratory Diseases', rate: 7.3, trend: 'stable' },
        { cause: 'Maternal', rate: 3.6, trend: 'decreasing' }
      ]
    },
    eastern: {
      cases: [
        { disease: 'Malaria', count: 5630, trend: 'increasing' },
        { disease: 'Tuberculosis', count: 980, trend: 'stable' },
        { disease: 'HIV/AIDS', count: 1850, trend: 'decreasing' },
        { disease: 'Pneumonia', count: 2240, trend: 'increasing' },
        { disease: 'Typhoid', count: 1120, trend: 'increasing' }
      ],
      vaccination: [
        { type: 'BCG', percentage: 88, target: 95 },
        { type: 'DPT3', percentage: 82, target: 90 },
        { type: 'Polio', percentage: 81, target: 90 },
        { type: 'Measles', percentage: 79, target: 95 },
        { type: 'COVID-19', percentage: 48, target: 70 }
      ],
      facilities: [
        { type: 'Hospitals', count: 18, status: 'inadequate' },
        { type: 'Health Centers IV', count: 37, status: 'inadequate' },
        { type: 'Health Centers III', count: 112, status: 'inadequate' },
        { type: 'Health Centers II', count: 243, status: 'inadequate' },
        { type: 'Private Clinics', count: 267, status: 'adequate' }
      ],
      mortality: [
        { cause: 'Malaria', rate: 7.8, trend: 'stable' },
        { cause: 'HIV/AIDS', rate: 5.3, trend: 'decreasing' },
        { cause: 'Road Accidents', rate: 5.9, trend: 'increasing' },
        { cause: 'Respiratory Diseases', rate: 8.1, trend: 'increasing' },
        { cause: 'Maternal', rate: 4.7, trend: 'stable' }
      ]
    },
    northern: {
      cases: [
        { disease: 'Malaria', count: 6840, trend: 'increasing' },
        { disease: 'Tuberculosis', count: 1560, trend: 'increasing' },
        { disease: 'HIV/AIDS', count: 1970, trend: 'stable' },
        { disease: 'Pneumonia', count: 2560, trend: 'increasing' },
        { disease: 'Typhoid', count: 980, trend: 'stable' }
      ],
      vaccination: [
        { type: 'BCG', percentage: 85, target: 95 },
        { type: 'DPT3', percentage: 78, target: 90 },
        { type: 'Polio', percentage: 79, target: 90 },
        { type: 'Measles', percentage: 76, target: 95 },
        { type: 'COVID-19', percentage: 42, target: 70 }
      ],
      facilities: [
        { type: 'Hospitals', count: 15, status: 'inadequate' },
        { type: 'Health Centers IV', count: 32, status: 'inadequate' },
        { type: 'Health Centers III', count: 87, status: 'inadequate' },
        { type: 'Health Centers II', count: 196, status: 'inadequate' },
        { type: 'Private Clinics', count: 189, status: 'inadequate' }
      ],
      mortality: [
        { cause: 'Malaria', rate: 9.1, trend: 'increasing' },
        { cause: 'HIV/AIDS', rate: 6.2, trend: 'stable' },
        { cause: 'Road Accidents', rate: 5.3, trend: 'increasing' },
        { cause: 'Respiratory Diseases', rate: 8.6, trend: 'increasing' },
        { cause: 'Maternal', rate: 5.8, trend: 'stable' }
      ]
    },
    western: {
      cases: [
        { disease: 'Malaria', count: 5120, trend: 'stable' },
        { disease: 'Tuberculosis', count: 1080, trend: 'decreasing' },
        { disease: 'HIV/AIDS', count: 1560, trend: 'decreasing' },
        { disease: 'Pneumonia', count: 1970, trend: 'stable' },
        { disease: 'Typhoid', count: 640, trend: 'decreasing' }
      ],
      vaccination: [
        { type: 'BCG', percentage: 90, target: 95 },
        { type: 'DPT3', percentage: 86, target: 90 },
        { type: 'Polio', percentage: 85, target: 90 },
        { type: 'Measles', percentage: 82, target: 95 },
        { type: 'COVID-19', percentage: 52, target: 70 }
      ],
      facilities: [
        { type: 'Hospitals', count: 21, status: 'adequate' },
        { type: 'Health Centers IV', count: 39, status: 'adequate' },
        { type: 'Health Centers III', count: 95, status: 'inadequate' },
        { type: 'Health Centers II', count: 210, status: 'inadequate' },
        { type: 'Private Clinics', count: 298, status: 'adequate' }
      ],
      mortality: [
        { cause: 'Malaria', rate: 6.3, trend: 'decreasing' },
        { cause: 'HIV/AIDS', rate: 5.1, trend: 'decreasing' },
        { cause: 'Road Accidents', rate: 5.8, trend: 'stable' },
        { cause: 'Respiratory Diseases', rate: 7.4, trend: 'stable' },
        { cause: 'Maternal', rate: 3.9, trend: 'decreasing' }
      ]
    }
  };
  
  // Function to get combined data for "all regions" option
  const getAllRegionsData = (metricType) => {
    let combinedData = [];
    let processedItems = new Set();
    
    Object.values(regionalData).forEach(region => {
      region[metricType].forEach(item => {
        let key;
        switch(metricType) {
          case 'cases':
            key = item.disease;
            break;
          case 'vaccination':
            key = item.type;
            break;
          case 'facilities':
            key = item.type;
            break;
          case 'mortality':
            key = item.cause;
            break;
          default:
            key = '';
        }
        
        if (!processedItems.has(key)) {
          processedItems.add(key);
          combinedData.push({ ...item });
        }
      });
    });
    
    return combinedData;
  };
  
  // Get data to display based on selections
  const getDisplayData = () => {
    if (selectedRegion === 'all') {
      return getAllRegionsData(selectedMetric);
    } else {
      return regionalData[selectedRegion][selectedMetric];
    }
  };
  
  // Function to render table based on selected metric
  const renderTable = () => {
    const data = getDisplayData();
    
    switch(selectedMetric) {
      case 'cases':
        return (
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th>Disease</th>
                <th>Number of Cases</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.disease}</td>
                  <td>{item.count.toLocaleString()}</td>
                  <td>
                    <span className={`trend-${item.trend}`}>
                      {item.trend === 'increasing' && '↑'}
                      {item.trend === 'decreasing' && '↓'}
                      {item.trend === 'stable' && '→'}
                      {' '}{item.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
        
      case 'vaccination':
        return (
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th>Vaccine Type</th>
                <th>Coverage Rate (%)</th>
                <th>Target (%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.percentage}%</td>
                  <td>{item.target}%</td>
                  <td>
                    <div className="progress">
                      <div 
                        className={`progress-bar ${item.percentage >= item.target ? 'bg-success' : 'bg-warning'}`}
                        role="progressbar" 
                        style={{width: `${(item.percentage / item.target) * 100}%`}}
                        aria-valuenow={item.percentage} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
        
      case 'facilities':
        return (
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th>Facility Type</th>
                <th>Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.count}</td>
                  <td>
                    <span className={`status-${item.status}`}>
                      {item.status === 'adequate' ? '✓' : '✗'} {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
        
      case 'mortality':
        return (
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th>Cause</th>
                <th>Rate (per 1,000)</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.cause}</td>
                  <td>{item.rate.toFixed(1)}</td>
                  <td>
                    <span className={`trend-${item.trend}`}>
                      {item.trend === 'increasing' && '↑'}
                      {item.trend === 'decreasing' && '↓'}
                      {item.trend === 'stable' && '→'}
                      {' '}{item.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
        
      default:
        return <div>No data available</div>;
    }
  };
  
  return (
    <div className="regional-data-page">
      <div className="page-header">
        <Container>
          <h1>Uganda Regional Health Data</h1>
          <p className="lead">
            Explore health statistics and metrics across different regions of Uganda
          </p>
        </Container>
      </div>
      
      <Container className="py-5">
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="filter-card">
              <Card.Body>
                <h2>Data Explorer</h2>
                <Row>
                  <Col md={5}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Region</Form.Label>
                      <Form.Select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      >
                        <option value="all">All Regions</option>
                        {regions.map(region => (
                          <option key={region.id} value={region.id}>
                            {region.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Health Metric</Form.Label>
                      <Form.Select
                        value={selectedMetric}
                        onChange={(e) => setSelectedMetric(e.target.value)}
                      >
                        {metrics.map(metric => (
                          <option key={metric.id} value={metric.id}>
                            {metric.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex align-items-end">
                    <Button variant="primary" className="mb-3 w-100">
                      <i className="bi bi-download me-2"></i> Download Data
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col lg={12}>
            <Card className="data-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="mb-0">
                    {selectedRegion === 'all' ? 'All Regions' : 
                      regions.find(r => r.id === selectedRegion)?.name} - 
                    {' '}{metrics.find(m => m.id === selectedMetric)?.name}
                  </h2>
                  <div className="legend">
                    {selectedMetric === 'cases' || selectedMetric === 'mortality' ? (
                      <>
                        <span className="legend-item trend-increasing">
                          <i className="bi bi-arrow-up"></i> Increasing
                        </span>
                        <span className="legend-item trend-stable">
                          <i className="bi bi-arrow-right"></i> Stable
                        </span>
                        <span className="legend-item trend-decreasing">
                          <i className="bi bi-arrow-down"></i> Decreasing
                        </span>
                      </>
                    ) : selectedMetric === 'facilities' ? (
                      <>
                        <span className="legend-item status-adequate">
                          <i className="bi bi-check-circle"></i> Adequate
                        </span>
                        <span className="legend-item status-inadequate">
                          <i className="bi bi-exclamation-circle"></i> Inadequate
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
                {renderTable()}
                <p className="text-muted mt-3">
                  <small>
                    <i className="bi bi-info-circle me-1"></i>
                    Data updated as of {new Date().toLocaleDateString()}. Source: Uganda Ministry of Health.
                  </small>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegionalDataPage; 