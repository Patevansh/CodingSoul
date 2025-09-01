import React from 'react';
import './TestContent.css';

const TestContent = () => {
  return (
    <section className="test-content">
      <div className="content-container">
        <h2>About Our Services</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Fast Performance</h3>
            <p>Lightning fast load times and smooth interactions.</p>
          </div>
          <div className="feature-card">
            <h3>Modern Design</h3>
            <p>Clean, contemporary aesthetics that look great everywhere.</p>
          </div>
          <div className="feature-card">
            <h3>Responsive</h3>
            <p>Works perfectly on all devices and screen sizes.</p>
          </div>
        </div>
        
        <h2>Why Choose Us</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        
        <div className="cta-section">
          <h3>Ready to Get Started?</h3>
          <p>Join thousands of satisfied customers today.</p>
          <button className="cta-button">Get Started Now</button>
        </div>
      </div>
    </section>
  );
};

export default TestContent;
