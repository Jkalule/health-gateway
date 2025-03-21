import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import './ResourcePages.css';

const TestingCentersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterTestType, setFilterTestType] = useState('all');
  
  // Mock data for demonstration
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'central', name: 'Central Region' },
    { id: 'eastern', name: 'Eastern Region' },
    { id: 'northern', name: 'Northern Region' },
    { id: 'western', name: 'Western Region' }
  ];
  
  const testTypes = [
    { id: 'all', name: 'All Tests' },
    { id: 'covid19', name: 'COVID-19' },
    { id: 'tb', name: 'Tuberculosis' },
    { id: 'malaria', name: 'Malaria' },
    { id: 'hiv', name: 'HIV' },
    { id: 'hep', name: 'Hepatitis' }
  ];
  
  const testingCenters = [
    {
      id: 1,
      name: 'Uganda Virus Research Institute',
      region: 'central',
      district: 'Wakiso',
      address: 'Plot 51-57, Nakiwogo Road, Entebbe',
      phone: '+256-414-320-662',
      email: 'info@uvri.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      tests: ['covid19', 'hiv', 'hep'],
      costRange: 'UGX 18,000-108,000',
      turnaround: '24-48 hours',
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 2,
      name: 'Mulago National Referral Hospital Laboratory',
      region: 'central',
      district: 'Kampala',
      address: 'Upper Mulago Hill Road, Kampala',
      phone: '+256-414-554-001',
      email: 'lab@mulago.or.ug',
      hours: 'Mon-Sun: 24 hours',
      tests: ['covid19', 'tb', 'malaria', 'hiv', 'hep'],
      costRange: 'UGX 7,200-90,000',
      turnaround: '6-72 hours',
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 3,
      name: 'MBN Clinical Laboratories',
      region: 'central',
      district: 'Kampala',
      address: 'Plot 28 Nakasero Road, Kampala',
      phone: '+256-312-265-530',
      email: 'info@mbnlab.com',
      hours: 'Mon-Fri: 7:00 AM - 7:00 PM, Sat: 8:00 AM - 4:00 PM',
      tests: ['covid19', 'tb', 'malaria', 'hiv'],
      costRange: 'UGX 36,000-180,000',
      turnaround: '2-24 hours',
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 4,
      name: 'Test and Fly Medical Centre',
      region: 'central',
      district: 'Kampala',
      address: 'Plot 38 Windsor Loop, Kampala',
      phone: '+256-704-222-777',
      email: 'info@testandfly.ug',
      hours: 'Mon-Sun: 7:00 AM - 8:00 PM',
      tests: ['covid19'],
      costRange: 'UGX 108,000-216,000',
      turnaround: '2-12 hours',
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 5,
      name: 'Jinja Regional Referral Hospital Laboratory',
      region: 'eastern',
      district: 'Jinja',
      address: 'Nalufenya Road, Jinja',
      phone: '+256-434-120-289',
      email: 'jinja.lab@health.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM',
      tests: ['covid19', 'tb', 'malaria', 'hiv'],
      costRange: 'UGX 3,600-54,000',
      turnaround: '24-48 hours',
      walkIn: true,
      appointment: false,
      status: 'active'
    },
    {
      id: 6,
      name: 'Mbale Regional Referral Hospital Laboratory',
      region: 'eastern',
      district: 'Mbale',
      address: 'Pallisa Road, Mbale',
      phone: '+256-454-433-042',
      email: 'mbale.lab@health.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 4:30 PM',
      tests: ['covid19', 'tb', 'malaria', 'hiv', 'hep'],
      costRange: 'UGX 3,600-54,000',
      turnaround: '24-72 hours',
      walkIn: true,
      appointment: false,
      status: 'limited'
    },
    {
      id: 7,
      name: 'Gulu Regional Referral Hospital Laboratory',
      region: 'northern',
      district: 'Gulu',
      address: 'Gulu-Kampala Road, Gulu',
      phone: '+256-471-432-469',
      email: 'gulu.lab@health.go.ug',
      hours: 'Mon-Fri: 8:30 AM - 4:30 PM',
      tests: ['covid19', 'tb', 'malaria', 'hiv'],
      costRange: 'UGX 3,600-54,000',
      turnaround: '24-48 hours',
      walkIn: true,
      appointment: false,
      status: 'active'
    },
    {
      id: 8,
      name: 'Lira Regional Referral Hospital Laboratory',
      region: 'northern',
      district: 'Lira',
      address: 'Soroti Road, Lira',
      phone: '+256-473-420-109',
      email: 'lira.lab@health.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      tests: ['covid19', 'tb', 'malaria', 'hiv'],
      costRange: 'UGX 3,600-54,000',
      turnaround: '24-72 hours',
      walkIn: true,
      appointment: false,
      status: 'limited'
    },
    {
      id: 9,
      name: 'Mbarara Regional Referral Hospital Laboratory',
      region: 'western',
      district: 'Mbarara',
      address: 'Kabale Road, Mbarara',
      phone: '+256-485-421-533',
      email: 'mbarara.lab@health.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM',
      tests: ['covid19', 'tb', 'malaria', 'hiv', 'hep'],
      costRange: 'UGX 3,600-72,000',
      turnaround: '24-48 hours',
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 10,
      name: 'Fort Portal Regional Referral Hospital Laboratory',
      region: 'western',
      district: 'Kabarole',
      address: 'Buhinga Road, Fort Portal',
      phone: '+256-483-422-075',
      email: 'fortportal.lab@health.go.ug',
      hours: 'Mon-Fri: 8:30 AM - 4:30 PM',
      tests: ['covid19', 'tb', 'malaria', 'hiv'],
      costRange: 'UGX 3,600-54,000',
      turnaround: '24-72 hours',
      walkIn: true,
      appointment: false,
      status: 'active'
    }
  ];
  
  // Filter centers based on search query and filters
  const filteredCenters = testingCenters.filter(center => {
    // Filter by region
    if (filterRegion !== 'all' && center.region !== filterRegion) return false;
    
    // Filter by test type
    if (filterTestType !== 'all' && !center.tests.includes(filterTestType)) return false;
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        center.name.toLowerCase().includes(query) ||
        center.district.toLowerCase().includes(query) ||
        center.address.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const getTestBadges = (tests) => {
    return tests.map(testId => {
      const test = testTypes.find(t => t.id === testId);
      if (!test) return null;
      
      let badgeVariant = 'secondary';
      switch(testId) {
        case 'covid19':
          badgeVariant = 'primary';
          break;
        case 'tb':
          badgeVariant = 'warning';
          break;
        case 'malaria':
          badgeVariant = 'success';
          break;
        case 'hiv':
          badgeVariant = 'danger';
          break;
        case 'hep':
          badgeVariant = 'info';
          break;
        default:
          badgeVariant = 'secondary';
      }
      
      return (
        <Badge 
          bg={badgeVariant} 
          className="me-1 mb-1"
          key={testId}
        >
          {test.name}
        </Badge>
      );
    });
  };
  
  const getStatusBadge = (status) => {
    let badgeVariant = 'success';
    let statusText = 'Operational';
    
    switch(status) {
      case 'active':
        badgeVariant = 'success';
        statusText = 'Fully Operational';
        break;
      case 'limited':
        badgeVariant = 'warning';
        statusText = 'Limited Capacity';
        break;
      case 'temporary-closed':
        badgeVariant = 'danger';
        statusText = 'Temporarily Closed';
        break;
      default:
        badgeVariant = 'secondary';
        statusText = 'Unknown';
    }
    
    return <Badge bg={badgeVariant}>{statusText}</Badge>;
  };
  
  return (
    <div className="resource-page">
      <div className="page-header">
        <Container>
          <h1>Testing Centers</h1>
          <p className="lead">Locate testing facilities across Uganda for various health conditions</p>
        </Container>
      </div>
      
      <Container className="py-5">
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="filter-card">
              <Card.Body>
                <h2>Find Testing Centers</h2>
                <Row>
                  <Col md={5} className="mb-3">
                    <InputGroup>
                      <Form.Control
                        placeholder="Search by name, district or address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button variant="outline-secondary">
                        <i className="bi bi-search"></i>
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col md={3} className="mb-3">
                    <Form.Select
                      value={filterRegion}
                      onChange={(e) => setFilterRegion(e.target.value)}
                    >
                      {regions.map(region => (
                        <option key={region.id} value={region.id}>
                          {region.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={3} className="mb-3">
                    <Form.Select
                      value={filterTestType}
                      onChange={(e) => setFilterTestType(e.target.value)}
                    >
                      {testTypes.map(test => (
                        <option key={test.id} value={test.id}>
                          {test.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={1} className="mb-3">
                    <Button 
                      variant="outline-secondary" 
                      className="w-100"
                      onClick={() => {
                        setSearchQuery('');
                        setFilterRegion('all');
                        setFilterTestType('all');
                      }}
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <p className="results-count">
              Found <strong>{filteredCenters.length}</strong> testing centers
              {filterRegion !== 'all' && ` in ${regions.find(r => r.id === filterRegion)?.name}`}
              {filterTestType !== 'all' && ` offering ${testTypes.find(t => t.id === filterTestType)?.name} testing`}
            </p>
          </Col>
        </Row>
        
        <Row>
          {filteredCenters.length === 0 ? (
            <Col>
              <div className="text-center py-5">
                <h3>No testing centers found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            </Col>
          ) : (
            filteredCenters.map(center => (
              <Col lg={6} className="mb-4" key={center.id}>
                <Card className="h-100 site-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h3>{center.name}</h3>
                      {getStatusBadge(center.status)}
                    </div>
                    <p className="mb-2">
                      <i className="bi bi-geo-alt me-2"></i>
                      <strong>{center.district}</strong>: {center.address}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-telephone me-2"></i>
                      <a href={`tel:${center.phone}`}>{center.phone}</a>
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-envelope me-2"></i>
                      <a href={`mailto:${center.email}`}>{center.email}</a>
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-clock me-2"></i>
                      {center.hours}
                    </p>
                    
                    <h5>Available Tests</h5>
                    <div className="mb-3">
                      {getTestBadges(center.tests)}
                    </div>
                    
                    <div className="d-flex mb-2">
                      <div className="me-4">
                        <i className="bi bi-cash me-1"></i>
                        <strong>Cost:</strong> {center.costRange}
                      </div>
                      <div>
                        <i className="bi bi-hourglass-split me-1"></i>
                        <strong>Results:</strong> {center.turnaround}
                      </div>
                    </div>
                    
                    <div className="d-flex site-options">
                      <div className="me-3">
                        <i className={`bi ${center.walkIn ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} me-1`}></i>
                        Walk-in
                      </div>
                      <div>
                        <i className={`bi ${center.appointment ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} me-1`}></i>
                        Appointment
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button variant="outline-primary" className="me-2">
                      <i className="bi bi-map me-1"></i> Get Directions
                    </Button>
                    {center.appointment && (
                      <Button variant="primary">
                        <i className="bi bi-calendar-check me-1"></i> Book Appointment
                      </Button>
                    )}
                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
        
        <Row className="mt-5">
          <Col lg={12}>
            <Card className="info-card">
              <Card.Body>
                <h3>About Health Testing in Uganda</h3>
                <p>
                  The Ministry of Health coordinates testing services across Uganda with various public and private 
                  facilities offering different types of tests. Many government facilities provide free or subsidized 
                  testing for essential health conditions.
                </p>
                <p>
                  For emergencies and critical health conditions, please call the Ministry of Health Emergency 
                  Operations Center on their toll-free line: <strong>0800-100-066</strong>.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TestingCentersPage; 