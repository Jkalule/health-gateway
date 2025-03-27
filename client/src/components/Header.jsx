import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [startY, setStartY] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef(null);
  const searchInputRef = useRef(null);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Handle scroll effect and header visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);

      if (scrollTop > lastScrollTop && scrollTop > 80) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle touch gestures
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isMenuOpen) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (diff > 50) {
      setIsMenuOpen(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission
    setIsSearchOpen(false);
  };

  const navLinks = [
    { 
      path: '/', 
      label: 'Home'
    },
    { 
      path: '/health-topics', 
      label: 'Health Topics',
      dropdown: [
        { path: '/health-topics/diseases', label: 'Diseases' },
        { path: '/health-topics/prevention', label: 'Prevention' },
        { path: '/health-topics/treatments', label: 'Treatments' },
        { path: '/health-topics/nutrition', label: 'Nutrition' }
      ]
    },
    { 
      path: '/resources', 
      label: 'Resources',
      dropdown: [
        { path: '/resources/guidelines', label: 'Guidelines' },
        { path: '/resources/research', label: 'Research' },
        { path: '/resources/tools', label: 'Tools' }
      ]
    },
    { 
      path: '/facilities', 
      label: 'Facilities',
      dropdown: [
        { path: '/facilities/hospitals', label: 'Hospitals' },
        { path: '/facilities/clinics', label: 'Clinics' },
        { path: '/facilities/pharmacies', label: 'Pharmacies' }
      ]
    },
    { 
      path: '/contact', 
      label: 'Contact'
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/healthgateway', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com/healthgateway', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com/healthgateway', label: 'Instagram' }
  ];

  return (
    <header 
      ref={headerRef}
      className={`header ${isScrolled ? 'scrolled' : ''} ${!isHeaderVisible ? 'hidden' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="top-bar">
        <div className="container">
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-container">
          <div className="header-left">
            <Link to="/" className="logo">
              <img src="/images/logo.png" alt="Health Gateway" />
            </Link>
          </div>

          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.path} className={link.dropdown ? 'has-dropdown' : ''}>
                  <Link
                    to={link.path}
                    className={location.pathname === link.path ? 'active' : ''}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <ul className="dropdown-menu">
                      {link.dropdown.map((item) => (
                        <li key={item.path}>
                          <Link 
                            to={item.path}
                            className={location.pathname === item.path ? 'active' : ''}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-right">
            <button 
              className={`search-toggle ${isSearchOpen ? 'active' : ''}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        <div className={`search-overlay ${isSearchOpen ? 'active' : ''}`}>
          <div className="container">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search health topics..."
                aria-label="Search"
              />
              <button type="submit" aria-label="Submit search">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="bottom-nav">
        {navLinks.slice(0, 5).map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`bottom-nav-item ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
