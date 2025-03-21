import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import './ResourcePages.css';

const VaccinationSitesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterVaccine, setFilterVaccine] = useState('all');
  
  // Mock data for demonstration
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'central', name: 'Central Region' },
    { id: 'eastern', name: 'Eastern Region' },
    { id: 'northern', name: 'Northern Region' },
    { id: 'western', name: 'Western Region' }
  ];
  
  const vaccineTypes = [
    { id: 'all', name: 'All Vaccines' },
    { id: 'covid19', name: 'COVID-19' },
    { id: 'polio', name: 'Polio' },
    { id: 'measles', name: 'Measles' },
    { id: 'dpt', name: 'DPT' },
    { id: 'hepb', name: 'Hepatitis B' }
  ];
  
  const vaccinationSites = [
    {
      id: 1,
      name: 'Mulago National Referral Hospital',
      region: 'central',
      district: 'Kampala',
      address: 'Upper Mulago Hill Road, Kampala',
      phone: '+256-414-541-188',
      email: 'info@mulago.or.ug',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 2:00 PM',
      vaccines: ['covid19', 'polio', 'measles', 'dpt', 'hepb'],
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 2,
      name: 'Kiruddu General Hospital',
      region: 'central',
      district: 'Kampala',
      address: 'Buziga Hill, Makindye Division, Kampala',
      phone: '+256-414-320-111',
      email: 'kiruddu.hospital@kcca.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 4:00 PM, Sat: 9:00 AM - 1:00 PM',
      vaccines: ['covid19', 'polio', 'measles'],
      walkIn: true,
      appointment: false,
      status: 'active'
    },
    {
      id: 3,
      name: 'Entebbe Regional Referral Hospital',
      region: 'central',
      district: 'Wakiso',
      address: 'Kitooro Road, Entebbe',
      phone: '+256-414-320-626',
      email: 'info@entebbereferral.health.go.ug',
      hours: 'Mon-Fri: 8:30 AM - 5:00 PM',
      vaccines: ['covid19', 'dpt', 'hepb'],
      walkIn: false,
      appointment: true,
      status: 'active'
    },
    {
      id: 4,
      name: 'Jinja Regional Referral Hospital',
      region: 'eastern',
      district: 'Jinja',
      address: 'Nalufenya Road, Jinja',
      phone: '+256-434-121-180',
      email: 'info@jinjahospital.org',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM',
      vaccines: ['covid19', 'polio', 'measles', 'dpt'],
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 5,
      name: 'Mbale Regional Referral Hospital',
      region: 'eastern',
      district: 'Mbale',
      address: 'Pallisa Road, Mbale',
      phone: '+256-454-435-242',
      email: 'mbalehospital@health.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 4:30 PM',
      vaccines: ['covid19', 'polio', 'measles'],
      walkIn: true,
      appointment: false,
      status: 'limited'
    },
    {
      id: 6,
      name: 'Soroti Regional Referral Hospital',
      region: 'eastern',
      district: 'Soroti',
      address: 'Soroti-Moroto Road, Soroti',
      phone: '+256-454-461-518',
      email: 'soroti.hospital@health.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      vaccines: ['covid19', 'measles', 'dpt', 'hepb'],
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 7,
      name: 'Gulu Regional Referral Hospital',
      region: 'northern',
      district: 'Gulu',
      address: 'Gulu-Kampala Road, Gulu',
      phone: '+256-471-432-544',
      email: 'gulu.hospital@health.go.ug',
      hours: 'Mon-Fri: 8:30 AM - 4:30 PM, Sat: 9:00 AM - 1:00 PM',
      vaccines: ['covid19', 'polio', 'measles', 'hepb'],
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 8,
      name: 'Lira Regional Referral Hospital',
      region: 'northern',
      district: 'Lira',
      address: 'Soroti Road, Lira',
      phone: '+256-473-420-022',
      email: 'lirahospital@health.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      vaccines: ['covid19', 'polio', 'dpt'],
      walkIn: true,
      appointment: false,
      status: 'active'
    },
    {
      id: 9,
      name: 'Arua Regional Referral Hospital',
      region: 'northern',
      district: 'Arua',
      address: 'Adumi Road, Arua',
      phone: '+256-476-420-167',
      email: 'arua.referral@health.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
      vaccines: ['covid19', 'measles', 'dpt', 'hepb'],
      walkIn: false,
      appointment: true,
      status: 'limited'
    },
    {
      id: 10,
      name: 'Mbarara Regional Referral Hospital',
      region: 'western',
      district: 'Mbarara',
      address: 'Kabale Road, Mbarara',
      phone: '+256-485-421-522',
      email: 'mbarara.hospital@health.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 2:00 PM',
      vaccines: ['covid19', 'polio', 'measles', 'dpt', 'hepb'],
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 11,
      name: 'Fort Portal Regional Referral Hospital',
      region: 'western',
      district: 'Kabarole',
      address: 'Buhinga Road, Fort Portal',
      phone: '+256-483-422-050',
      email: 'fortportal.hospital@health.go.ug',
      hours: 'Mon-Fri: 8:30 AM - 4:30 PM',
      vaccines: ['covid19', 'polio', 'dpt'],
      walkIn: true,
      appointment: true,
      status: 'active'
    },
    {
      id: 12,
      name: 'Kabale Regional Referral Hospital',
      region: 'western',
      district: 'Kabale',
      address: 'Makanga Hill, Kabale',
      phone: '+256-486-422-150',
      email: 'kabale.hospital@health.go.ug',
      hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
      vaccines: ['covid19', 'measles', 'hepb'],
      walkIn: true,
      appointment: false,
      status: 'temporary-closed'
    }
  ];
  
  // Filter sites based on search query and filters
  const filteredSites = vaccinationSites.filter(site => {
    // Filter by region
    if (filterRegion !== 'all' && site.region !== filterRegion) return false;
    
    // Filter by vaccine type
    if (filterVaccine !== 'all' && !site.vaccines.includes(filterVaccine)) return false;
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        site.name.toLowerCase().includes(query) ||
        site.district.toLowerCase().includes(query) ||
        site.address.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const getVaccineBadges = (vaccines) => {
    return vaccines.map(vaccineId => {
      const vaccine = vaccineTypes.find(v => v.id === vaccineId);
      if (!vaccine) return null;
      
      let badgeVariant = 'secondary';
      switch(vaccineId) {
        case 'covid19':
          badgeVariant = 'primary';
          break;
        case 'polio':
          badgeVariant = 'success';
          break;
        case 'measles':
          badgeVariant = 'danger';
          break;
        case 'dpt':
          badgeVariant = 'warning';
          break;
        case 'hepb':
          badgeVariant = 'info';
          break;
        default:
          badgeVariant = 'secondary';
      }
      
      return (
        <Badge 
          bg={badgeVariant} 
          className="me-1 mb-1"
          key={vaccineId}
        >
          {vaccine.name}
        </Badge>
      );
    });
  };
  
  const getStatusBadge = (status) => {
    let badgeVariant = 'success';
    let statusText = 'Active';
    
    switch(status) {
      case 'active':
        badgeVariant = 'success';
        statusText = 'Active';
        break;
      case 'limited':
        badgeVariant = 'warning';
        statusText = 'Limited Supply';
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
          <h1>Vaccination Sites</h1>
          <p className="lead">Find vaccination centers across Uganda offering various immunization services</p>
        </Container>
      </div>
      
      <Container className="py-5">
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="filter-card">
              <Card.Body>
                <h2>Find Vaccination Sites</h2>
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
                      value={filterVaccine}
                      onChange={(e) => setFilterVaccine(e.target.value)}
                    >
                      {vaccineTypes.map(vaccine => (
                        <option key={vaccine.id} value={vaccine.id}>
                          {vaccine.name}
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
                        setFilterVaccine('all');
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
              Found <strong>{filteredSites.length}</strong> vaccination sites
              {filterRegion !== 'all' && ` in ${regions.find(r => r.id === filterRegion)?.name}`}
              {filterVaccine !== 'all' && ` offering ${vaccineTypes.find(v => v.id === filterVaccine)?.name} vaccines`}
            </p>
          </Col>
        </Row>
        
        <Row>
          {filteredSites.length === 0 ? (
            <Col>
              <div className="text-center py-5">
                <h3>No vaccination sites found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            </Col>
          ) : (
            filteredSites.map(site => (
              <Col lg={6} className="mb-4" key={site.id}>
                <Card className="h-100 site-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h3>{site.name}</h3>
                      {getStatusBadge(site.status)}
                    </div>
                    <p className="mb-2">
                      <i className="bi bi-geo-alt me-2"></i>
                      <strong>{site.district}</strong>: {site.address}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-telephone me-2"></i>
                      <a href={`tel:${site.phone}`}>{site.phone}</a>
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-envelope me-2"></i>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </p>
                    <p className="mb-3">
                      <i className="bi bi-clock me-2"></i>
                      {site.hours}
                    </p>
                    
                    <h5>Available Vaccines</h5>
                    <div className="mb-3">
                      {getVaccineBadges(site.vaccines)}
                    </div>
                    
                    <div className="d-flex site-options">
                      <div className="me-3">
                        <i className={`bi ${site.walkIn ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} me-1`}></i>
                        Walk-in
                      </div>
                      <div>
                        <i className={`bi ${site.appointment ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} me-1`}></i>
                        Appointment
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button variant="outline-primary" className="me-2">
                      <i className="bi bi-map me-1"></i> Get Directions
                    </Button>
                    {site.appointment && (
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
                <h3>About Vaccination in Uganda</h3>
                <p>
                  The Uganda National Expanded Programme on Immunization (UNEPI) coordinates vaccination efforts 
                  to prevent childhood and other infectious diseases. Vaccinations are provided free of charge at 
                  government health facilities across the country.
                </p>
                <p>
                  For more information on vaccination schedules and requirements, please contact the Ministry of Health 
                  on their toll-free line: <strong>0800-100-066</strong>.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VaccinationSitesPage; 