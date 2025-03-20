import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Uganda Health Gateway</Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/alerts" className={location.pathname === '/alerts' ? 'active' : ''}>
            Alerts
          </Link>
          <Link to="/regional-data" className={location.pathname === '/regional-data' ? 'active' : ''}>
            Regional Data
          </Link>
          <Link to="/vaccination-sites" className={location.pathname === '/vaccination-sites' ? 'active' : ''}>
            Vaccination Sites
          </Link>
          <Link to="/testing-centers" className={location.pathname === '/testing-centers' ? 'active' : ''}>
            Testing Centers
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
