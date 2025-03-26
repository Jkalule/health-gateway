import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="top-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="header-logo">
              <h1>Health Gateway</h1>
            </Link>
            <div className="search-box">
              <div className="input-group">
                <input 
                  type="search" 
                  className="form-control" 
                  placeholder="Search Health Gateway..."
                  aria-label="Search Health Gateway"
                />
                <div className="input-group-append">
                  <button className="btn btn-search" type="button">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="main-nav">
        <div className="container">
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              Dashboard
            </Link>
            <Link to="/health-guidelines" className={location.pathname === '/health-guidelines' ? 'active' : ''}>
              Health Guidelines
            </Link>
            <div className="nav-dropdown">
              <Link 
                to="/resources"
                className={location.pathname.startsWith('/resources') ? 'active' : ''}
              >
                Resources
              </Link>
              <div className="dropdown-content">
                <Link to="/resources/regional-data">Regional Data</Link>
                <Link to="/resources/vaccination">Vaccination Sites</Link>
                <Link to="/resources/testing">Testing Centers</Link>
              </div>
            </div>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
