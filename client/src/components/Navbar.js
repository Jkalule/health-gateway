import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNav = () => setExpanded(false);

  return (
    <BootstrapNavbar expand="lg" bg="dark" variant="dark" expanded={expanded} className="navbar-main">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" onClick={closeNav}>
          Uganda Health Gateway
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(expanded ? false : true)} 
        />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" onClick={closeNav} end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard" onClick={closeNav}>
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/alerts" onClick={closeNav}>
              Alerts
            </Nav.Link>
            <NavDropdown title="Resources" id="resources-dropdown">
              <NavDropdown.Item as={NavLink} to="/resources/regional-data" onClick={closeNav}>
                Regional Data
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/resources/vaccination" onClick={closeNav}>
                Vaccination Sites
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/resources/testing" onClick={closeNav}>
                Testing Centers
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/resources/guidelines" onClick={closeNav}>
                Health Guidelines
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/about" onClick={closeNav}>
              About
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
