import React from 'react';
import './Logo.css';

const Logo = ({ variant = 'default', size = 'medium', showText = true }) => {
  return (
    <div className={`logo-container ${variant} ${size}`}>
      <div className="logo-icon">
        {/* Modern DSA visualization icon */}
        <div className="logo-design">
          {/* Algorithmic flow representation */}
          <div className="algo-flow">
            <div className="flow-node node-start"></div>
            <div className="flow-connection"></div>
            <div className="flow-node node-process"></div>
            <div className="flow-connection"></div>
            <div className="flow-node node-end"></div>
          </div>
          
          {/* Data structure representation */}
          <div className="data-structure">
            <div className="ds-node ds-1"></div>
            <div className="ds-node ds-2"></div>
            <div className="ds-node ds-3"></div>
            <div className="ds-connection ds-conn-1"></div>
            <div className="ds-connection ds-conn-2"></div>
          </div>
          
          {/* Accent elements */}
          <div className="logo-accent accent-1"></div>
          <div className="logo-accent accent-2"></div>
        </div>
      </div>
      
      {showText && (
        <div className="logo-text">
          <span className="logo-primary">DSA</span>
          <span className="logo-secondary">Visualizer</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
