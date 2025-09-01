import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">DSA Visualizer</h3>
          <p className="footer-description">
            Interactive learning platform for Data Structures and Algorithms
          </p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Learn</h4>
          <ul className="footer-links">
            <li><a href="/algorithms">Algorithms</a></li>
            <li><a href="/data-structures">Data Structures</a></li>
            <li><a href="/complexity">Complexity Analysis</a></li>
            <li><a href="/bubble-sort">Visualizations</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Resources</h4>
          <ul className="footer-links">
            <li><a href="/about">About</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer">Documentation</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer">GitHub Repo</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Community</h4>
          <ul className="footer-links">
            <li><a href="#" target="_blank" rel="noopener noreferrer">Discord</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer">Reddit</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer">Stack Overflow</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer">Contributors</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © {currentYear} DSA Visualizer. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
