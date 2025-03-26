import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Accordion, Form, Button } from 'react-bootstrap';
import { FaSearch, FaVirus, FaBiohazard, FaSyringe, FaExclamationTriangle } from 'react-icons/fa';
import './HealthGuidelines.css';

const HealthGuidelines = () => {
  const [activeTab, setActiveTab] = useState('covid19');
  const [searchTerm, setSearchTerm] = useState('');

  const guidelines = {
    covid19: {
      title: 'COVID-19 Guidelines',
      icon: <FaVirus />,
      severity: 'High',
      urgency: 'Immediate medical attention if severe symptoms',
      items: [
        {
          title: 'Signs & Symptoms',
          content: [
            '• Fever or chills',
            '• Cough and shortness of breath',
            '• Fatigue and body aches',
            '• Loss of taste or smell',
            '• Headache and sore throat',
            '• Congestion or runny nose',
            '• Nausea, vomiting, or diarrhea'
          ].join('\n'),
          icon: '🤒'
        },
        {
          title: 'Prevention Measures',
          content: [
            '• Get vaccinated and stay up to date with boosters',
            '• Wear well-fitting masks in public spaces',
            '• Maintain physical distance (2 meters)',
            '• Practice good hand hygiene',
            '• Ensure good ventilation',
            '• Avoid crowded indoor spaces'
          ].join('\n'),
          icon: '🛡️'
        },
        {
          title: 'When to Seek Help',
          content: [
            '• Difficulty breathing',
            '• Persistent chest pain',
            '• Confusion or inability to wake',
            '• Bluish lips or face',
            '• Severe fatigue or weakness'
          ].join('\n'),
          icon: '🏥'
        },
        {
          title: 'Treatment Options',
          content: [
            '• Rest and hydration',
            '• Over-the-counter fever reducers',
            '• Antiviral medications (if prescribed)',
            '• Monoclonal antibody treatment',
            '• Supportive care for symptoms'
          ].join('\n'),
          icon: '💊'
        }
      ]
    },
    h1n1: {
      title: 'H1N1 (Swine Flu) Guidelines',
      icon: <FaVirus />,
      severity: 'Moderate to High',
      urgency: 'Seek care if high-risk or severe symptoms',
      items: [
        {
          title: 'Signs & Symptoms',
          content: [
            '• High fever (above 38°C)',
            '• Severe body aches',
            '• Persistent cough',
            '• Extreme fatigue',
            '• Headache and sore throat',
            '• Runny or stuffy nose',
            '• Possible diarrhea and vomiting'
          ].join('\n'),
          icon: '🤒'
        },
        {
          title: 'Prevention Measures',
          content: [
            '• Get annual flu vaccination',
            '• Practice respiratory hygiene',
            '• Frequent hand washing',
            '• Avoid close contact with sick people',
            '• Stay home when sick',
            '• Clean frequently touched surfaces'
          ].join('\n'),
          icon: '🛡️'
        },
        {
          title: 'Risk Factors',
          content: [
            '• Young children and elderly',
            '• Pregnant women',
            '• Chronic medical conditions',
            '• Weakened immune system',
            '• Healthcare workers'
          ].join('\n'),
          icon: '⚠️'
        },
        {
          title: 'Treatment Approach',
          content: [
            '• Antiviral medications',
            '• Rest and hydration',
            '• Over-the-counter pain relievers',
            '• Fever reduction methods',
            '• Isolation to prevent spread'
          ].join('\n'),
          icon: '💊'
        }
      ]
    },
    mpox: {
      title: 'Mpox Guidelines',
      icon: <FaBiohazard />,
      severity: 'Moderate',
      urgency: 'Seek care upon rash appearance',
      items: [
        {
          title: 'Signs & Symptoms',
          content: [
            '• Rash that progresses in stages',
            '• Fever and chills',
            '• Swollen lymph nodes',
            '• Muscle aches and backache',
            '• Headache and exhaustion',
            '• Respiratory symptoms'
          ].join('\n'),
          icon: '🤒'
        },
        {
          title: 'Prevention Measures',
          content: [
            '• Avoid skin-to-skin contact with infected persons',
            '• Do not share personal items',
            '• Practice good hand hygiene',
            '• Get vaccinated if eligible',
            '• Use PPE when caring for infected persons',
            '• Avoid contact with contaminated materials'
          ].join('\n'),
          icon: '🛡️'
        },
        {
          title: 'Transmission Risk',
          content: [
            '• Direct contact with rash or scabs',
            '• Intimate physical contact',
            '• Respiratory secretions during prolonged contact',
            '• Touching contaminated objects',
            '• Contact with infected animals'
          ].join('\n'),
          icon: '⚠️'
        },
        {
          title: 'Care Guidelines',
          content: [
            '• Isolate until rash has fully healed',
            '• Keep rash areas clean and dry',
            '• Use protective coverings',
            '• Monitor symptoms closely',
            '• Follow healthcare provider instructions'
          ].join('\n'),
          icon: '🏥'
        }
      ]
    },
    malaria: {
      title: 'Malaria Guidelines',
      icon: <FaExclamationTriangle />,
      severity: 'High',
      urgency: 'Immediate treatment required',
      items: [
        {
          title: 'Signs & Symptoms',
          content: [
            '• Fever and chills',
            '• Sweating and headaches',
            '• Muscle pain and fatigue',
            '• Nausea and vomiting',
            '• Chest and abdominal pain',
            '• Cough and diarrhea'
          ].join('\n'),
          icon: '🤒'
        },
        {
          title: 'Prevention Measures',
          content: [
            '• Use insecticide-treated bed nets',
            '• Apply mosquito repellent',
            '• Wear protective clothing',
            '• Take preventive medications',
            '• Eliminate standing water',
            '• Install or repair screens'
          ].join('\n'),
          icon: '🛡️'
        },
        {
          title: 'Risk Areas',
          content: [
            '• Tropical and subtropical regions',
            '• Areas with standing water',
            '• Rural and forested areas',
            '• Regions with poor sanitation',
            '• Endemic countries'
          ].join('\n'),
          icon: '🗺️'
        },
        {
          title: 'Treatment Protocol',
          content: [
            '• Early diagnosis crucial',
            '• Antimalarial medications',
            '• Supportive care',
            '• Hydration therapy',
            '• Monitor for complications'
          ].join('\n'),
          icon: '💊'
        }
      ]
    },
    tuberculosis: {
      title: 'Tuberculosis Guidelines',
      icon: <FaBiohazard />,
      severity: 'High',
      urgency: 'Early detection crucial',
      items: [
        {
          title: 'Signs & Symptoms',
          content: [
            '• Persistent cough (3+ weeks)',
            '• Chest pain when breathing',
            '• Coughing up blood',
            '• Weight loss and fatigue',
            '• Night sweats and fever',
            '• Loss of appetite'
          ].join('\n'),
          icon: '🤒'
        },
        {
          title: 'Prevention Measures',
          content: [
            '• BCG vaccination',
            '• Regular screening',
            '• Good ventilation',
            '• Respiratory hygiene',
            '• Contact tracing',
            '• Complete prescribed treatment'
          ].join('\n'),
          icon: '🛡️'
        },
        {
          title: 'Risk Factors',
          content: [
            '• Close contact with TB patients',
            '• HIV infection',
            '• Malnutrition',
            '• Diabetes',
            '• Smoking',
            '• Living in crowded conditions'
          ].join('\n'),
          icon: '⚠️'
        },
        {
          title: 'Treatment Approach',
          content: [
            '• Multi-drug therapy',
            '• Regular monitoring',
            '• Complete full course (6-9 months)',
            '• Directly observed therapy',
            '• Support for adherence',
            '• Follow-up testing'
          ].join('\n'),
          icon: '💊'
        }
      ]
    },
    ebola: {
      title: 'Ebola Guidelines',
      icon: <FaBiohazard />,
      severity: 'Very High',
      urgency: 'Immediate isolation and treatment',
      items: [
        {
          title: 'Signs & Symptoms',
          content: [
            '• Sudden fever and fatigue',
            '• Severe headache',
            '• Muscle pain',
            '• Vomiting and diarrhea',
            '• Internal/external bleeding',
            '• Organ dysfunction'
          ].join('\n'),
          icon: '🤒'
        },
        {
          title: 'Prevention Measures',
          content: [
            '• Avoid contact with infected people',
            '• Practice proper hand hygiene',
            '• Use protective equipment',
            '• Safe burial practices',
            '• Avoid contact with bush meat',
            '• Follow infection control protocols'
          ].join('\n'),
          icon: '🛡️'
        },
        {
          title: 'Emergency Signs',
          content: [
            '• Bleeding or bruising',
            '• Severe abdominal pain',
            '• Difficulty breathing',
            '• Confusion or seizures',
            '• Shock symptoms',
            '• Multiple organ failure'
          ].join('\n'),
          icon: '🚨'
        },
        {
          title: 'Response Protocol',
          content: [
            '• Immediate isolation',
            '• Contact tracing',
            '• Supportive care',
            '• Fluid and electrolyte management',
            '• Treatment of complications',
            '• Psychological support'
          ].join('\n'),
          icon: '🏥'
        }
      ]
    }
  };

  const filteredGuidelines = Object.entries(guidelines).filter(([key, value]) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      value.title.toLowerCase().includes(searchLower) ||
      value.items.some(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.content.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <Container className="guidelines-container mt-4">
      <h1 className="text-center mb-4">Health Guidelines & Disease Information</h1>
      
      {/* Search Bar */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <Form.Control
              type="text"
              placeholder="Search guidelines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </Col>
      </Row>

      <Tab.Container id="disease-tabs" defaultActiveKey="covid19">
        <Row>
          <Col lg={3}>
            <div className="guidelines-nav">
              <h5 className="mb-3">Diseases & Conditions</h5>
              <Nav variant="pills" className="flex-column sticky-top">
                {filteredGuidelines.map(([key, value]) => (
                  <Nav.Item key={key}>
                    <Nav.Link 
                      eventKey={key}
                      className="d-flex align-items-center"
                    >
                      <span className="me-2">{value.icon}</span>
                      {value.title.replace(' Guidelines', '')}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
          </Col>
          
          <Col lg={9}>
            <Tab.Content>
              {filteredGuidelines.map(([key, value]) => (
                <Tab.Pane key={key} eventKey={key}>
                  <div className="disease-header mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <span className="disease-icon me-3">{value.icon}</span>
                      <h2 className="mb-0">{value.title}</h2>
                    </div>
                    <div className="disease-meta">
                      <span className="severity-badge me-3">
                        Severity: {value.severity}
                      </span>
                      <span className="urgency-badge">
                        {value.urgency}
                      </span>
                    </div>
                  </div>

                  <Accordion defaultActiveKey="0" className="guidelines-accordion">
                    {value.items.map((item, index) => (
                      <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>
                          <span className="me-2">{item.icon}</span>
                          {item.title}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="guidelines-content">
                            {item.content.split('\n').map((line, i) => (
                              <p key={i} className="mb-2">{line}</p>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>

                  <div className="mt-4 p-3 info-box">
                    <h5>Need Immediate Help?</h5>
                    <p>If you're experiencing severe symptoms, contact emergency services or visit the nearest healthcare facility.</p>
                    <Button variant="danger" className="mt-2">
                      Find Nearest Healthcare Center
                    </Button>
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default HealthGuidelines;
