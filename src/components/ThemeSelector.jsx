import React from 'react';
import { useTheme } from './ThemeProvider';
import './ThemeSelector.css';

const ThemeSelector = () => {
  const { currentTheme, changeTheme, availableThemes, theme } = useTheme();

  return (
    <div className="theme-selector">
      <div className="theme-selector-button">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      </div>
      <div className="theme-selector-dropdown">
        {availableThemes.map(themeName => (
          <button
            key={themeName}
            className={`theme-option ${currentTheme === themeName ? 'active' : ''}`}
            onClick={() => changeTheme(themeName)}
          >
            <div className="theme-preview" style={{
              background: `linear-gradient(45deg, ${
                themeName === 'light' ? '#6366f1' : 
                themeName === 'dark' ? '#6366f1' :
                themeName === 'midnight' ? '#4f46e5' :
                themeName === 'cyberpunk' ? '#00d4aa' :
                themeName === 'ocean' ? '#0ea5e9' : '#f59e0b'}, ${
                themeName === 'light' ? '#8b5cf6' : 
                themeName === 'dark' ? '#8b5cf6' :
                themeName === 'midnight' ? '#6366f1' :
                themeName === 'cyberpunk' ? '#ff006e' :
                themeName === 'ocean' ? '#14b8a6' : '#ec4899'})`
            }}></div>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
