import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logo from './Logo';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navbarStyle, setNavbarStyle] = useState('horizontal');
  const navigate = useNavigate();
  const location = useLocation();
  

  const navigationItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/algorithms', label: 'Algorithms', icon: '🧠' },
    { path: '/data-structures', label: 'Data Structures', icon: '🏗️' },
    { path: '/complexity', label: 'Complexity', icon: '⏱️' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const isActivePage = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleKeyPress = (event, path) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigation(path);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for navbar style changes
  useEffect(() => {
    const checkNavbarStyle = () => {
      const savedStyle = localStorage.getItem('navbarStyle') || 'horizontal';
      if (savedStyle !== navbarStyle) {
        // Instant transition - no animations
        document.body.className = document.body.className.replace(/navbar-\w+/g, '');
        document.body.classList.add(`navbar-${savedStyle}`);
        setNavbarStyle(savedStyle);
      }
    };

    const checkNavbarTheme = () => {
      const savedTheme = localStorage.getItem('navbarTheme') || 'default';
      // Remove all existing navbar theme classes
      const existingThemeClasses = Array.from(document.body.classList).filter(cls => cls.startsWith('navbar-theme-'));
      existingThemeClasses.forEach(cls => document.body.classList.remove(cls));
      // Add current theme class
      document.body.classList.add(`navbar-theme-${savedTheme}`);
    };

    // Check initially and set body classes
    checkNavbarStyle();
    checkNavbarTheme();
    
    // Also ensure body classes are set on mount
    const currentStyle = localStorage.getItem('navbarStyle') || 'horizontal';
    const currentTheme = localStorage.getItem('navbarTheme') || 'default';
    
    document.body.className = document.body.className.replace(/navbar-\w+/g, '');
    document.body.classList.add(`navbar-${currentStyle}`);
    
    const existingThemeClasses = Array.from(document.body.classList).filter(cls => cls.startsWith('navbar-theme-'));
    existingThemeClasses.forEach(cls => document.body.classList.remove(cls));
    document.body.classList.add(`navbar-theme-${currentTheme}`);

    // Listen for storage changes (when changed from settings)
    const handleStorageChange = () => {
      checkNavbarStyle();
      checkNavbarTheme();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case localStorage was changed in same tab
    const interval = setInterval(() => {
      checkNavbarStyle();
      checkNavbarTheme();
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [navbarStyle]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`header navbar ${navbarStyle === 'vertical' ? 'navbar-vertical' : 'navbar-horizontal'} ${isScrolled ? 'scrolled' : ''}`}
    >
      {navbarStyle === 'vertical' ? (
        <>
          {/* Vertical Navbar Layout */}
          <div className="navbar-brand">
            <Logo variant="minimal" size="medium" />
          </div>
          
          <div className="vertical-search-container">
            <SearchBar />
          </div>
          
          <nav className="navbar-nav" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <div key={item.path} className="nav-item">
                <button
                  onClick={() => handleNavigation(item.path)}
                  onKeyDown={(e) => handleKeyPress(e, item.path)}
                  className={`nav-link ${isActivePage(item.path) ? 'active' : ''}`}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActivePage(item.path) ? 'page' : undefined}
                >
                  <span className="nav-link-icon">{item.icon}</span>
                  <span className="nav-link-text">{item.label}</span>
                </button>
              </div>
            ))}
          </nav>
        </>
      ) : (
        <>
          {/* Horizontal Navbar Layout */}
          <div className="header-content">
            {/* Brand Section - Left */}
            <div className="header-left">
              <div className="navbar-brand">
                <Logo variant="default" size="medium" />
              </div>
            </div>

            {/* Navigation Section - Center */}
            <div className="header-center">
              <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    onKeyDown={(e) => handleKeyPress(e, item.path)}
                    className={`nav-link ${isActivePage(item.path) ? 'active' : ''}`}
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={isActivePage(item.path) ? 'page' : undefined}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text">{item.label}</span>
                    <div className="nav-indicator"></div>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Search Section - Right */}
            <div className="header-right">
              <SearchBar />

              <button 
                className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Overlay */}
          <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
            <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  onKeyDown={(e) => handleKeyPress(e, item.path)}
                  className={`mobile-nav-link ${isActivePage(item.path) ? 'active' : ''}`}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActivePage(item.path) ? 'page' : undefined}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span className="mobile-nav-text">{item.label}</span>
                  {isActivePage(item.path) && (
                    <span className="mobile-nav-active-indicator">•</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
