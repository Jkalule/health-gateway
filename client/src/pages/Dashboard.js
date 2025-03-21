import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useHealthData } from '../context/HealthDataContext';
import Charts from '../components/Charts';
import Map from '../components/Map';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract disease param from URL query
  const queryParams = new URLSearchParams(location.search);
  const diseaseParam = queryParams.get('disease');
  
  const { 
    loading, 
    error, 
    healthData,
    lastUpdated,
    selectedDisease,
    setSelectedDisease,
    selectedRegion,
    setSelectedRegion,
    selectedTimeRange,
    setSelectedTimeRange,
    loadDiseaseData,
    loadRegionalStats,
    loadComparativeData
  } = useHealthData();

  const [dashboardData, setDashboardData] = useState(null);
  const [comparativeData, setComparativeData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Set selected disease from URL parameter if it exists
  useEffect(() => {
    if (diseaseParam && ['covid19', 'malaria', 'tuberculosis', 'ebola', 'all'].includes(diseaseParam)) {
      setSelectedDisease(diseaseParam);
    }
  }, [diseaseParam, setSelectedDisease]);

  // Update URL when selected disease changes
  useEffect(() => {
    if (selectedDisease && selectedDisease !== 'all') {
      navigate(`/dashboard?disease=${selectedDisease}`, { replace: true });
    } else if (selectedDisease === 'all' && location.search) {
      navigate('/dashboard', { replace: true });
    }
  }, [selectedDisease, navigate, location.search]);

  // Available diseases for selection
  const diseases = [
    { value: 'all', label: 'All Diseases' },
    { value: 'covid19', label: 'COVID-19' },
    { value: 'malaria', label: 'Malaria' },
    { value: 'tuberculosis', label: 'Tuberculosis' },
    { value: 'ebola', label: 'Ebola' }
  ];

  // Available regions for selection
  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'central', label: 'Central Region' },
    { value: 'eastern', label: 'Eastern Region' },
    { value: 'northern', label: 'Northern Region' },
    { value: 'western', label: 'Western Region' }
  ];

  // Time range options
  const timeRanges = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '1year', label: 'Last Year' }
  ];
  
  // Helper function to create mock comparative data
  const createMockComparativeData = useCallback(() => {
    const diseases = ['covid19', 'malaria', 'tuberculosis', 'ebola'];
    const mockData = {
      diseases: {}
    };
    
    diseases.forEach(disease => {
      const relevantData = healthData.filter(item => item.disease === disease);
      
      if (relevantData.length > 0) {
        mockData.diseases[disease] = {
          cases: relevantData.reduce((sum, item) => sum + (item.cases || 0), 0),
          activeCases: relevantData.reduce((sum, item) => sum + (item.activeCases || 0), 0),
          recoveries: relevantData.reduce((sum, item) => sum + (item.recovered || 0), 0),
          deaths: relevantData.reduce((sum, item) => sum + (item.deaths || 0), 0)
        };
      }
    });
    
    return mockData;
  }, [healthData]);
  
  // Helper function to create mock disease data
  const createMockDiseaseData = useCallback((disease, region) => {
    // Filter health data for the selected disease and region
    const filteredData = healthData.filter(item => {
      if (disease !== 'all' && item.disease !== disease) return false;
      if (region !== 'all' && item.region !== region) return false;
      return true;
    });
    
    if (filteredData.length === 0) return null;
    
    // Calculate totals
    const summary = {
      totalCases: filteredData.reduce((sum, item) => sum + (item.cases || 0), 0),
      activeCases: filteredData.reduce((sum, item) => sum + (item.activeCases || 0), 0),
      recovered: filteredData.reduce((sum, item) => sum + (item.recovered || 0), 0),
      deaths: filteredData.reduce((sum, item) => sum + (item.deaths || 0), 0)
    };
    
    // Create timeline from the first item's timeline (if available)
    let timeline = null;
    if (filteredData[0]?.timeline) {
      // Format timeline data for the Charts component
      const dates = filteredData[0].timeline.map(point => point.date);
      timeline = {
        dates,
        datasets: [
          {
            label: 'New Cases',
            data: filteredData[0].timeline.map(point => point.newCases),
            color: '#0066cc'
          },
          {
            label: 'Recoveries',
            data: filteredData[0].timeline.map(point => point.recovered),
            color: '#28a745'
          },
          {
            label: 'Deaths',
            data: filteredData[0].timeline.map(point => point.deaths),
            color: '#dc3545'
          }
        ]
      };
    }
    
    // Add random trend data
    const trends = {
      totalCases: Math.floor(Math.random() * 30) - 10, // Random trend between -10 and +20
      activeCases: Math.floor(Math.random() * 30) - 15,
      recovered: Math.floor(Math.random() * 25),
      deaths: Math.floor(Math.random() * 20) - 10
    };
    
    // Add vaccination data if applicable
    let vaccination = null;
    if (['covid19', 'tuberculosis', 'ebola'].includes(disease)) {
      const vaccRate = filteredData.reduce((sum, item) => sum + (item.vaccinationRate || 0), 0) / filteredData.length;
      
      vaccination = {
        rate: Math.round(vaccRate * 10) / 10, // Round to 1 decimal place
        total: Math.floor(summary.totalCases * (vaccRate / 100) * 3), // Estimate total vaccinated
        dailyAverage: Math.floor((summary.totalCases * (vaccRate / 100) * 3) / 90) // Rough estimate
      };
    }
    
    return {
      summary,
      timeline,
      trends,
      vaccination
    };
  }, [healthData]);
  
  // Helper function to create mock regional data
  const createMockRegionalData = useCallback((disease) => {
    // Filter health data for the selected disease
    const filteredData = disease === 'all' 
      ? healthData 
      : healthData.filter(item => item.disease === disease);
    
    if (filteredData.length === 0) return null;
    
    // Group data by region
    const regions = {};
    const regionNames = ['central', 'eastern', 'northern', 'western'];
    
    regionNames.forEach(region => {
      const regionData = filteredData.filter(item => item.region === region);
      
      regions[region] = {
        cases: regionData.reduce((sum, item) => sum + (item.cases || 0), 0),
        recoveries: regionData.reduce((sum, item) => sum + (item.recovered || 0), 0),
        deaths: regionData.reduce((sum, item) => sum + (item.deaths || 0), 0)
      };
    });
    
    return { regions };
  }, [healthData]);

  // Load disease data when selection changes
  useEffect(() => {
    const fetchData = async () => {
      if (selectedDisease === 'all') {
        try {
          // Load comparative data for multiple diseases
          const data = await loadComparativeData(
            ['covid19', 'malaria', 'tuberculosis', 'ebola'], 
            selectedTimeRange
          );
          
          // If no data is returned (likely due to API errors), create mock comparative data
          if (!data || !data.diseases) {
            setComparativeData(createMockComparativeData());
          } else {
            setComparativeData(data);
          }
        } catch (error) {
          console.error('Error loading comparative data:', error);
          // Create mock comparative data on error
          setComparativeData(createMockComparativeData());
        }
      } else {
        try {
          // Load specific disease data
          const data = await loadDiseaseData(
            selectedDisease, 
            selectedRegion, 
            selectedTimeRange
          );
          
          // If no data is returned, create mock disease data
          if (!data) {
            setDashboardData(createMockDiseaseData(selectedDisease, selectedRegion));
          } else {
            setDashboardData(data);
          }
        } catch (error) {
          console.error('Error loading disease data:', error);
          // Create mock disease data on error
          setDashboardData(createMockDiseaseData(selectedDisease, selectedRegion));
        }
      }
      
      try {
        // Always load regional statistics for map visualization
        const regionData = await loadRegionalStats(
          selectedDisease, 
          selectedTimeRange
        );
        
        // If no data is returned, create mock regional data
        if (!regionData) {
          setMapData(createMockRegionalData(selectedDisease));
        } else {
          setMapData(regionData);
        }
      } catch (error) {
        console.error('Error loading regional data:', error);
        // Create mock regional data on error
        setMapData(createMockRegionalData(selectedDisease));
      }
    };
    
    fetchData();
  }, [
    selectedDisease, 
    selectedRegion, 
    selectedTimeRange, 
    loadDiseaseData, 
    loadRegionalStats, 
    loadComparativeData,
    healthData,
    createMockComparativeData,
    createMockDiseaseData,
    createMockRegionalData
  ]);

  // Set mock data indicator if we're in development or have an error
  useEffect(() => {
    setUsingMockData(process.env.NODE_ENV === 'development' || error !== null);
  }, [error]);

  // Format the last updated date
  const formattedDate = lastUpdated 
    ? new Date(lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Unknown';

  // If there's an error loading the health data, display an error message
  if (error) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <h2 className="text-danger mb-3">Error Loading Dashboard Data</h2>
            <p className="lead mb-4">{error || "There was a problem loading the health data. The application will continue with mock data."}</p>
            <Button 
              variant="primary" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // If the data is still loading, show a spinner
  if (loading && !dashboardData) {
    return <LoadingSpinner />;
  }

  // Calculate summary metrics
  let summaryMetrics = {
    totalCases: 0,
    activeCases: 0,
    recovered: 0,
    deaths: 0
  };

  // Process health data to calculate summary
  if (healthData && healthData.length > 0) {
    healthData.forEach(item => {
      if (
        (selectedRegion === 'all' || item.region === selectedRegion) && 
        (selectedDisease === 'all' || item.disease === selectedDisease)
      ) {
        summaryMetrics.totalCases += item.cases || 0;
        summaryMetrics.activeCases += item.activeCases || 0;
        summaryMetrics.recovered += item.recovered || 0;
        summaryMetrics.deaths += item.deaths || 0;
      }
    });
  }

  // Use dashboard data if available (more accurate)
  if (dashboardData && dashboardData.summary) {
    summaryMetrics = dashboardData.summary;
  }

  return (
    <Container fluid className="dashboard-container py-4">
      {error && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>Data Loading Notice</Alert.Heading>
          <p>
            There was an issue connecting to the health data server. The application will continue with mock data.
          </p>
        </Alert>
      )}
      
      {usingMockData && !error && (
        <Alert variant="info" className="mb-4">
          <p className="mb-0">
            <small><i className="fas fa-info-circle"></i> Currently displaying mock data for demonstration purposes.</small>
          </p>
        </Alert>
      )}
      
      <div className="dashboard-header mb-4">
        <h1>Health Data Dashboard</h1>
        <p className="text-muted">
          Last updated: {formattedDate}
        </p>
      </div>
      
      <Row className="filter-controls mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Disease</Form.Label>
            <Form.Control 
              as="select" 
              value={selectedDisease} 
              onChange={(e) => setSelectedDisease(e.target.value)}
            >
              {diseases.map(disease => (
                <option key={disease.value} value={disease.value}>
                  {disease.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Region</Form.Label>
            <Form.Control 
              as="select" 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Time Range</Form.Label>
            <Form.Control 
              as="select" 
              value={selectedTimeRange} 
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      
      <Row className="summary-cards mb-4">
        <Col md={3}>
          <Card className="summary-card">
            <Card.Body>
              <Card.Title>Total Cases</Card.Title>
              <h3 className="metric-value">{summaryMetrics.totalCases.toLocaleString()}</h3>
              {dashboardData?.trends?.totalCases && (
                <p className={`trend-indicator ${dashboardData.trends.totalCases > 0 ? 'trend-up' : 'trend-down'}`}>
                  {dashboardData.trends.totalCases > 0 ? '↑' : '↓'} 
                  {Math.abs(dashboardData.trends.totalCases)}%
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="summary-card active-card">
            <Card.Body>
              <Card.Title>Active Cases</Card.Title>
              <h3 className="metric-value">{summaryMetrics.activeCases.toLocaleString()}</h3>
              {dashboardData?.trends?.activeCases && (
                <p className={`trend-indicator ${dashboardData.trends.activeCases > 0 ? 'trend-up' : 'trend-down'}`}>
                  {dashboardData.trends.activeCases > 0 ? '↑' : '↓'} 
                  {Math.abs(dashboardData.trends.activeCases)}%
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="summary-card recovered-card">
            <Card.Body>
              <Card.Title>Recovered</Card.Title>
              <h3 className="metric-value">{summaryMetrics.recovered.toLocaleString()}</h3>
              {dashboardData?.trends?.recovered && (
                <p className={`trend-indicator ${dashboardData.trends.recovered > 0 ? 'trend-up' : 'trend-down'}`}>
                  {dashboardData.trends.recovered > 0 ? '↑' : '↓'} 
                  {Math.abs(dashboardData.trends.recovered)}%
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="summary-card deaths-card">
            <Card.Body>
              <Card.Title>Deaths</Card.Title>
              <h3 className="metric-value">{summaryMetrics.deaths.toLocaleString()}</h3>
              {dashboardData?.trends?.deaths && (
                <p className={`trend-indicator ${dashboardData.trends.deaths > 0 ? 'trend-up' : 'trend-down'}`}>
                  {dashboardData.trends.deaths > 0 ? '↑' : '↓'} 
                  {Math.abs(dashboardData.trends.deaths)}%
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={8}>
          <Card className="chart-card">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                {selectedDisease === 'all' ? (
                  <>
                    <span>Comparative Disease Data</span>
                    <span className="badge bg-primary">Multiple Diseases</span>
                  </>
                ) : (
                  <>
                    <span>
                      <i className="fas fa-chart-line me-2"></i>
                      {selectedDisease.toUpperCase()} Timeline
                    </span>
                    <span className="badge bg-info">
                      {timeRanges.find(range => range.value === selectedTimeRange)?.label || 'Timeline Data'}
                    </span>
                  </>
                )}
              </Card.Title>
              
              {selectedDisease !== 'all' && (
                <p className="text-muted mb-3">
                  This timeline shows the trend of cases, recoveries, and deaths for {selectedDisease.toUpperCase()} 
                  over the {timeRanges.find(range => range.value === selectedTimeRange)?.label.toLowerCase() || 'selected period'}.
                </p>
              )}
              
              <div className={selectedDisease === 'all' ? '' : 'timeline-container'}>
                <Charts 
                  data={selectedDisease === 'all' ? comparativeData : dashboardData?.timeline}
                  type={selectedDisease === 'all' ? 'comparative' : 'timeline'}
                  timeRange={selectedTimeRange}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="map-card h-100">
            <Card.Body>
              <Card.Title>Regional Distribution</Card.Title>
              <Map data={mapData} selectedDisease={selectedDisease} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {selectedDisease !== 'all' && dashboardData?.vaccination && (
        <Row className="mb-4">
          <Col md={12}>
            <Card className="vaccination-card">
              <Card.Body>
                <Card.Title>Vaccination Information</Card.Title>
                <Row>
                  <Col md={4}>
                    <div className="vaccination-stat">
                      <h5>Vaccination Rate</h5>
                      <h3>{dashboardData.vaccination.rate}%</h3>
                      <p>of eligible population</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="vaccination-stat">
                      <h5>Total Vaccinated</h5>
                      <h3>{dashboardData.vaccination.total.toLocaleString()}</h3>
                      <p>people</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="vaccination-stat">
                      <h5>Daily Average</h5>
                      <h3>{dashboardData.vaccination.dailyAverage.toLocaleString()}</h3>
                      <p>vaccinations per day</p>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-3">
                  <Button variant="primary">Find Vaccination Sites</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      
      {selectedDisease !== 'all' && (
        <Row>
          <Col md={6}>
            <Card className="resource-card">
              <Card.Body>
                <Card.Title>Testing Centers</Card.Title>
                <p>Find the nearest testing centers for {selectedDisease.toUpperCase()}.</p>
                <Button variant="outline-primary">View Testing Centers</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="resource-card">
              <Card.Body>
                <Card.Title>Health Recommendations</Card.Title>
                <p>Get the latest health recommendations and guidelines for {selectedDisease.toUpperCase()}.</p>
                <Button variant="outline-primary">View Guidelines</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard; 