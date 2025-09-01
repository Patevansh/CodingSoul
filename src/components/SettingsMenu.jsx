import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import './SettingsMenu.css';

const SettingsMenu = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { currentTheme, changeTheme, availableThemes } = useTheme();

  const closeMenu = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className="settings-menu">
      {isOpen && (
        <div className="settings-overlay" onClick={closeMenu}>
          <div className="settings-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="settings-header">
              <h3>Settings</h3>
              <button className="close-button" onClick={closeMenu}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="settings-content">
              {/* Theme Section */}
              <div className="settings-section">
                <h4>Theme</h4>
                <div className="theme-options">
                  {availableThemes.map(themeName => (
                    <button
                      key={themeName}
                      className={`theme-option ${currentTheme === themeName ? 'active' : ''}`}
                      onClick={() => changeTheme(themeName)}
                    >
                      <div className="theme-preview" style={{
                        background: themeName === 'dark' ? '#1a1a2e' : 
                                  themeName === 'light' ? '#ffffff' :
                                  themeName === 'ocean' ? '#0f3460' :
                                  themeName === 'forest' ? '#2d5016' :
                                  themeName === 'sunset' ? '#8b4513' : '#667eea'
                      }}></div>
                      <span>{themeName.charAt(0).toUpperCase() + themeName.slice(1)}</span>
                      {currentTheme === themeName && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Section */}
              <div className="settings-section">
                <h4>Display</h4>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>Show animations</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>Reduced motion</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" />
                    <span>High contrast</span>
                  </label>
                </div>
              </div>

              {/* Algorithm Settings */}
              <div className="settings-section">
                <h4>Algorithm Visualization</h4>
                <div className="setting-item">
                  <label>
                    Default Speed
                    <select defaultValue="1">
                      <option value="0.25">0.25x</option>
                      <option value="0.5">0.5x</option>
                      <option value="1">1x</option>
                      <option value="2">2x</option>
                      <option value="4">4x</option>
                    </select>
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>Show code during visualization</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>Play sound effects</span>
                  </label>
                </div>
              </div>

              {/* About Section */}
              <div className="settings-section">
                <h4>About</h4>
                <div className="about-info">
                  <p>AlgoViz - Algorithm Visualizer</p>
                  <p>Version 1.0.0</p>
                  <p>Interactive learning for algorithms and data structures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
