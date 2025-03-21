import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import './HealthGuidelinesPage.css';

const HealthGuidelinesPage = () => {
  return (
    <div className="guidelines-page">
      <div className="page-header">
        <Container>
          <h1>Uganda Health Guidelines</h1>
          <p className="lead">
            Essential health recommendations and protocols from the Uganda Ministry of Health to help keep you and your community safe.
          </p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="mb-4">
          <Col md={12}>
            <h2>General Health Safety</h2>
            <Card className="guidelines-card mb-4">
              <Card.Body>
                <h3>Everyday Health Practices</h3>
                <ul className="guidelines-list">
                  <li>
                    <strong>Hand hygiene:</strong> Wash hands regularly with soap and water for at least 20 seconds, especially after being in public places
                  </li>
                  <li>
                    <strong>Respiratory etiquette:</strong> Cover coughs and sneezes with a tissue or your elbow, not your hands
                  </li>
                  <li>
                    <strong>Stay home when sick:</strong> If you have symptoms of infectious illness, stay home except to get medical care
                  </li>
                  <li>
                    <strong>Keep distance:</strong> Maintain at least 2 meters distance from others in crowded areas
                  </li>
                  <li>
                    <strong>Clean surfaces:</strong> Regularly clean and disinfect frequently touched surfaces
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <h2>Disease-Specific Guidelines</h2>
            <Accordion defaultActiveKey="0" className="mb-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>COVID-19 Guidelines</Accordion.Header>
                <Accordion.Body>
                  <h4>Prevention</h4>
                  <ul>
                    <li>Get vaccinated with approved COVID-19 vaccines</li>
                    <li>Wear masks in public indoor settings with substantial transmission</li>
                    <li>Avoid large gatherings and poorly ventilated spaces</li>
                    <li>Test if you have symptoms or have been exposed</li>
                  </ul>
                  
                  <h4>When to Seek Medical Care</h4>
                  <p>
                    Seek emergency medical attention if you experience: trouble breathing, persistent chest pain, 
                    confusion, inability to stay awake, or bluish lips or face.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Malaria Prevention</Accordion.Header>
                <Accordion.Body>
                  <h4>Key Preventive Measures</h4>
                  <ul>
                    <li>Sleep under insecticide-treated mosquito nets every night</li>
                    <li>Take antimalarial medications as prescribed if in high-risk areas</li>
                    <li>Wear long-sleeved clothing and pants at dawn and dusk</li>
                    <li>Use mosquito repellent on exposed skin</li>
                    <li>Eliminate standing water around your home</li>
                  </ul>
                  
                  <h4>Symptoms and Treatment</h4>
                  <p>
                    Common symptoms include fever, chills, headache, and fatigue. Seek medical attention immediately 
                    if you suspect malaria. Early diagnosis and treatment are essential to prevent severe illness.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>HIV/AIDS Guidelines</Accordion.Header>
                <Accordion.Body>
                  <h4>Prevention Strategies</h4>
                  <ul>
                    <li>Practice safe sex by using condoms correctly and consistently</li>
                    <li>Get tested regularly if you are sexually active</li>
                    <li>Consider pre-exposure prophylaxis (PrEP) if at high risk</li>
                    <li>Avoid sharing needles or other injection equipment</li>
                  </ul>
                  
                  <h4>Living with HIV</h4>
                  <p>
                    If diagnosed with HIV, adhere to antiretroviral therapy (ART) as prescribed. 
                    Regular check-ups with healthcare providers are essential for monitoring health status and 
                    adjusting treatment as needed. With proper treatment, people with HIV can live long, healthy lives.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <h2>Maternal and Child Health</h2>
            <Card className="guidelines-card mb-4">
              <Card.Body>
                <h3>Prenatal Care</h3>
                <ul className="guidelines-list">
                  <li>Attend at least 8 antenatal care visits during pregnancy</li>
                  <li>Take iron and folic acid supplements as prescribed</li>
                  <li>Get tested for HIV, syphilis, and other infections</li>
                  <li>Deliver in a health facility under skilled care</li>
                </ul>

                <h3 className="mt-4">Child Immunization Schedule</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-primary">
                      <tr>
                        <th>Age</th>
                        <th>Vaccines</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Birth</td>
                        <td>BCG, OPV0, Hepatitis B</td>
                      </tr>
                      <tr>
                        <td>6 Weeks</td>
                        <td>DPT1, OPV1, PCV1, Rotavirus 1</td>
                      </tr>
                      <tr>
                        <td>10 Weeks</td>
                        <td>DPT2, OPV2, PCV2, Rotavirus 2</td>
                      </tr>
                      <tr>
                        <td>14 Weeks</td>
                        <td>DPT3, OPV3, PCV3, IPV</td>
                      </tr>
                      <tr>
                        <td>9 Months</td>
                        <td>Measles, Yellow Fever</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h2>Nutrition Guidelines</h2>
            <Card className="guidelines-card">
              <Card.Body>
                <h3>Balanced Diet Recommendations</h3>
                <p>
                  A balanced diet should include a variety of foods from all food groups to ensure adequate intake of essential nutrients:
                </p>
                <ul className="guidelines-list">
                  <li>
                    <strong>Carbohydrates:</strong> Include whole grains like millet, sorghum, brown rice, and whole wheat
                  </li>
                  <li>
                    <strong>Proteins:</strong> Incorporate beans, peas, nuts, fish, eggs, and lean meats
                  </li>
                  <li>
                    <strong>Fruits and vegetables:</strong> Eat a variety of colorful fruits and vegetables daily
                  </li>
                  <li>
                    <strong>Healthy fats:</strong> Use vegetable oils like sunflower or olive oil in moderation
                  </li>
                  <li>
                    <strong>Water:</strong> Drink at least 8 glasses of clean, safe water daily
                  </li>
                </ul>

                <h3 className="mt-4">Special Nutritional Needs</h3>
                <ul className="guidelines-list">
                  <li>
                    <strong>Pregnant women:</strong> Need additional iron, folic acid, and protein
                  </li>
                  <li>
                    <strong>Children under 5:</strong> Require nutrient-dense foods and should be breastfed exclusively for the first 6 months
                  </li>
                  <li>
                    <strong>Adolescents:</strong> Need increased calcium, iron, and protein for growth
                  </li>
                  <li>
                    <strong>Elderly:</strong> May need more calcium and vitamin D for bone health
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HealthGuidelinesPage; 