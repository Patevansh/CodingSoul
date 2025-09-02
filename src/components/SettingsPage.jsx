import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import './SettingsPage.css';

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const [showCustomTheme, setShowCustomTheme] = useState(false);
  const [customColors, setCustomColors] = useState({
    primary: '#00ff88',
    background: '#0a0a0a',
    surface: '#1a1a1a',
    text: '#ffffff',
    textSecondary: '#888888',
    border: '#333333'
  });
  
  const [navbarStyle, setNavbarStyle] = useState('horizontal');
  const [navbarTheme, setNavbarTheme] = useState('default');

  const themes = [
    {
      name: 'cyberpunk',
      label: 'Cyberpunk',
      preview: '#00ff88',
      description: 'Neon green futuristic theme'
    },
    {
      name: 'ocean',
      label: 'Ocean',
      preview: '#0ea5e9',
      description: 'Cool blue ocean theme'
    },
    {
      name: 'sunset',
      label: 'Sunset',
      preview: '#f97316',
      description: 'Warm orange sunset theme'
    },
    {
      name: 'purple',
      label: 'Purple',
      preview: '#8b5cf6',
      description: 'Deep purple theme'
    },
    {
      name: 'dark',
      label: 'Dark',
      preview: '#374151',
      description: 'Classic dark theme'
    },
    {
      name: 'light',
      label: 'Light',
      preview: '#f3f4f6',
      description: 'Clean light theme'
    },
    {
      name: 'glass',
      label: 'Glass',
      preview: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      description: 'iOS-inspired glass morphism theme'
    },
    {
      name: 'highContrast',
      label: 'High Contrast',
      preview: '#000000',
      description: 'Maximum contrast for accessibility'
    },
    {
      name: 'blackWhite',
      label: 'Black & White',
      preview: '#ffffff',
      description: 'Pure monochrome theme'
    },
    {
      name: 'forest',
      label: 'Forest',
      preview: '#22c55e',
      description: 'Natural green forest theme'
    },
    {
      name: 'rose',
      label: 'Rose',
      preview: '#f43f5e',
      description: 'Elegant rose theme'
    },
    {
      name: 'amber',
      label: 'Amber',
      preview: '#f59e0b',
      description: 'Warm amber theme'
    },
    {
      name: 'teal',
      label: 'Teal',
      preview: '#14b8a6',
      description: 'Cool teal theme'
    },
    {
      name: 'indigo',
      label: 'Indigo',
      preview: '#6366f1',
      description: 'Deep indigo theme'
    },
    {
      name: 'slate',
      label: 'Slate',
      preview: '#64748b',
      description: 'Modern slate theme'
    },
    {
      name: 'emerald',
      label: 'Emerald',
      preview: '#10b981',
      description: 'Vibrant emerald theme'
    },
    {
      name: 'crimson',
      label: 'Crimson',
      preview: '#dc2626',
      description: 'Bold crimson theme'
    }
  ];

  const navbarStyles = [
    {
      name: 'horizontal',
      label: 'Horizontal',
      preview: '═══',
      description: 'Traditional top navigation bar'
    },
    {
      name: 'vertical',
      label: 'Vertical',
      preview: '║',
      description: 'Side navigation bar'
    }
  ];

  const navbarThemes = [
    {
      name: 'default',
      label: 'Default',
      preview: '#6366f1',
      description: 'Clean and modern design'
    },
    {
      name: 'ios',
      label: 'iOS Style',
      preview: '#007AFF',
      description: 'Apple iOS inspired design'
    },
    {
      name: 'block',
      label: 'Block Style',
      preview: '#374151',
      description: 'Bold block-based design'
    },
    {
      name: 'minimal',
      label: 'Minimal',
      preview: '#f3f4f6',
      description: 'Ultra-clean minimal design'
    },
    {
      name: 'neon',
      label: 'Neon',
      preview: '#00ff88',
      description: 'Cyberpunk neon glow'
    },
    {
      name: 'glass',
      label: 'Glass',
      preview: 'rgba(255,255,255,0.1)',
      description: 'Frosted glass effect'
    },
    {
      name: 'rounded',
      label: 'Rounded',
      preview: '#f59e0b',
      description: 'Fully rounded pill design'
    },
    {
      name: 'shadow',
      label: 'Shadow',
      preview: '#1f2937',
      description: 'Deep shadow effects'
    },
    {
      name: 'rekorder',
      label: 'Rekorder',
      preview: '#2d2d2d',
      description: 'Dark with rounded white sections'
    },
    {
      name: 'redpill',
      label: 'Red Pill',
      preview: '#dc2626',
      description: 'Bold red pill design'
    },
    {
      name: 'outlined',
      label: 'Outlined',
      preview: '#6366f1',
      description: 'Clean outlined buttons'
    },
    {
      name: 'colorful',
      label: 'Colorful',
      preview: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
      description: 'Multi-colored pill buttons'
    },
    {
      name: 'professional',
      label: 'Professional',
      preview: '#111827',
      description: 'Clean dark professional'
    },
    {
      name: 'gradient',
      label: 'Gradient',
      preview: 'linear-gradient(135deg, #667eea, #764ba2)',
      description: 'Smooth gradient effects'
    },
    {
      name: 'neumorphism',
      label: 'Neumorphism',
      preview: '#e0e5ec',
      description: 'Soft 3D neumorphic design'
    },
    {
      name: 'retro',
      label: 'Retro',
      preview: '#ff6b35',
      description: 'Vintage 80s style'
    }
  ];

  // Load settings from localStorage
  useEffect(() => {
    const savedCustomColors = localStorage.getItem('customThemeColors');
    if (savedCustomColors) {
      try {
        const colors = JSON.parse(savedCustomColors);
        setCustomColors(colors);
      } catch (error) {
        console.error('Error loading custom colors:', error);
      }
    }
    
    // Load navbar style
    const savedNavbarStyle = localStorage.getItem('navbarStyle');
    if (savedNavbarStyle && ['horizontal', 'vertical'].includes(savedNavbarStyle)) {
      setNavbarStyle(savedNavbarStyle);
      applyNavbarStyle(savedNavbarStyle);
    } else {
      // Set default horizontal style
      applyNavbarStyle('horizontal');
    }
    
    // Load navbar theme
    const savedNavbarTheme = localStorage.getItem('navbarTheme');
    const validThemes = navbarThemes.map(t => t.name);
    if (savedNavbarTheme && validThemes.includes(savedNavbarTheme)) {
      setNavbarTheme(savedNavbarTheme);
      applyNavbarTheme(savedNavbarTheme);
    } else {
      // Set default theme
      applyNavbarTheme('default');
    }
    
    // Clean up any old transparency/water effects settings
    localStorage.removeItem('transparencyLevel');
    localStorage.removeItem('waterEffects');
    
    // Remove any water effects classes from body
    document.body.classList.remove('water-effects');
    
    // Clean up CSS custom properties
    const root = document.documentElement;
    root.style.removeProperty('--transparency-level');
    root.style.removeProperty('--surface-opacity');
  }, []);

  // Helper functions for color conversion
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r, g, b) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  // HSB color conversion utilities for multicolor slider
  const hexToHsb = (hex) => {
    const rgb = hexToRgb(hex);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    if (diff !== 0) {
      if (max === r) h = ((g - b) / diff) % 6;
      else if (max === g) h = (b - r) / diff + 2;
      else h = (r - g) / diff + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;

    const s = max === 0 ? 0 : Math.round((diff / max) * 100);
    const brightness = Math.round(max * 100);

    return { h, s, b: brightness };
  };

  const hsbToHex = (h, s, b) => {
    h = h / 360;
    s = s / 100;
    b = b / 100;

    const c = b * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = b - c;

    let r = 0, g = 0, blue = 0;
    if (h < 1/6) { r = c; g = x; blue = 0; }
    else if (h < 2/6) { r = x; g = c; blue = 0; }
    else if (h < 3/6) { r = 0; g = c; blue = x; }
    else if (h < 4/6) { r = 0; g = x; blue = c; }
    else if (h < 5/6) { r = x; g = 0; blue = c; }
    else { r = c; g = 0; blue = x; }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    blue = Math.round((blue + m) * 255);

    return rgbToHex(r, g, blue);
  };

  const getHueFromColor = (hex) => {
    return hexToHsb(hex).h;
  };

  const getSaturationFromColor = (hex) => {
    return hexToHsb(hex).s;
  };

  const getBrightnessFromColor = (hex) => {
    return hexToHsb(hex).b;
  };

  const handleHueChange = (colorKey, hue) => {
    const currentHsb = hexToHsb(customColors[colorKey] || '#000000');
    const newHex = hsbToHex(parseInt(hue), currentHsb.s, currentHsb.b);
    handleCustomColorChange(colorKey, newHex);
  };

  const handleSaturationChange = (colorKey, saturation) => {
    const currentHsb = hexToHsb(customColors[colorKey] || '#000000');
    const newHex = hsbToHex(currentHsb.h, parseInt(saturation), currentHsb.b);
    handleCustomColorChange(colorKey, newHex);
  };

  const handleBrightnessChange = (colorKey, brightness) => {
    const currentHsb = hexToHsb(customColors[colorKey] || '#000000');
    const newHex = hsbToHex(currentHsb.h, currentHsb.s, parseInt(brightness));
    handleCustomColorChange(colorKey, newHex);
  };

  const resetSingleColor = (colorKey) => {
    const defaultColors = {
      primary: '#0066cc',
      background: '#1a1a1a',
      surface: '#2a2a2a',
      text: '#ffffff',
      textSecondary: '#cccccc',
      border: '#333333'
    };
    
    const newColors = { ...customColors, [colorKey]: defaultColors[colorKey] };
    setCustomColors(newColors);
    localStorage.setItem('customThemeColors', JSON.stringify(newColors));
  };

  const resetAllColors = () => {
    const defaultColors = {
      primary: '#0066cc',
      background: '#1a1a1a',
      surface: '#2a2a2a',
      text: '#ffffff',
      textSecondary: '#cccccc',
      border: '#333333'
    };
    
    setCustomColors(defaultColors);
    localStorage.setItem('customThemeColors', JSON.stringify(defaultColors));
  };

  // Save settings function (simplified)

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    setShowCustomTheme(false);
  };

  const handleCustomColorChange = (colorKey, value) => {
    // Allow partial hex values during typing
    const newColors = { ...customColors, [colorKey]: value };
    setCustomColors(newColors);
    
    // Only update if it's a valid hex color
    if (/^#[0-9A-Fa-f]{6}$/i.test(value)) {
      localStorage.setItem('customThemeColors', JSON.stringify(newColors));
    }
  };

  const applyCustomTheme = () => {
    // Apply custom colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', customColors.primary);
    root.style.setProperty('--color-background', customColors.background);
    root.style.setProperty('--color-surface', customColors.surface);
    root.style.setProperty('--color-text', customColors.text);
    root.style.setProperty('--color-text-secondary', customColors.textSecondary);
    root.style.setProperty('--color-textSecondary', customColors.textSecondary);
    root.style.setProperty('--color-border', customColors.border);
    root.style.setProperty('--color-accent', customColors.primary);
    root.style.setProperty('--color-hover', customColors.surface);
    
    // Convert hex to RGB for alpha values
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        '0, 0, 0';
    };
    
    root.style.setProperty('--color-primary-rgb', hexToRgb(customColors.primary));
    root.style.setProperty('--color-background-rgb', hexToRgb(customColors.background));
    root.style.setProperty('--color-surface-rgb', hexToRgb(customColors.surface));
    root.style.setProperty('--color-text-rgb', hexToRgb(customColors.text));
    root.style.setProperty('--color-border-rgb', hexToRgb(customColors.border));
    root.style.setProperty('--color-shadow-rgb', hexToRgb(customColors.text));
    
    // Save the custom theme to localStorage
    localStorage.setItem('currentTheme', 'custom');
    
    setTheme('custom');
    setShowCustomTheme(false);
  };

  // Navbar style change handler
  const applyNavbarStyle = (styleName) => {
    // Apply navbar style to body
    const body = document.body;
    body.classList.remove('navbar-horizontal', 'navbar-vertical');
    body.classList.add(`navbar-${styleName}`);
    
    // Update CSS custom property for navbar style
    const root = document.documentElement;
    root.style.setProperty('--navbar-style', styleName);
  };

  const handleNavbarStyleChange = (styleName) => {
    setNavbarStyle(styleName);
    localStorage.setItem('navbarStyle', styleName);
    applyNavbarStyle(styleName);
  };

  // Navbar theme change handler
  const applyNavbarTheme = (themeName) => {
    // Apply navbar theme to body
    const body = document.body;
    
    // Remove all existing navbar theme classes
    const navbarThemeClasses = navbarThemes.map(theme => `navbar-theme-${theme.name}`);
    body.classList.remove(...navbarThemeClasses);
    
    // Add new theme class
    body.classList.add(`navbar-theme-${themeName}`);
    
    // Update CSS custom property for navbar theme
    const root = document.documentElement;
    root.style.setProperty('--navbar-theme', themeName);
  };

  const handleNavbarThemeChange = (themeName) => {
    setNavbarTheme(themeName);
    localStorage.setItem('navbarTheme', themeName);
    applyNavbarTheme(themeName);
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Customize your learning experience</p>
        </div>

        <div className="settings-content">
          <div className="settings-grid">
            {/* Theme Settings */}
            <div className="settings-section theme-section">
              <h3>🎨 Appearance & Themes</h3>
              <div className="setting-item">
                <label>Choose Theme</label>
                <div className="theme-options">
                  {themes.map((themeOption) => (
                    <button
                      key={themeOption.name}
                      onClick={() => handleThemeChange(themeOption.name)}
                      className={`theme-option ${theme === themeOption.name ? 'active' : ''}`}
                    >
                      <div 
                        className="theme-preview" 
                        style={{ 
                          background: themeOption.preview,
                          ...(themeOption.name === 'glass' && {
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                          })
                        }}
                      ></div>
                      <span className="theme-label">{themeOption.label}</span>
                      <span className="theme-description">{themeOption.description}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setShowCustomTheme(!showCustomTheme)}
                    className={`theme-option custom-theme-btn ${theme === 'custom' ? 'active' : ''}`}
                  >
                    <div className="theme-preview custom-preview">
                      <div className="custom-preview-colors">
                        <div style={{ backgroundColor: customColors.primary }}></div>
                        <div style={{ backgroundColor: customColors.background }}></div>
                        <div style={{ backgroundColor: customColors.surface }}></div>
                      </div>
                    </div>
                    <span className="theme-label">Custom</span>
                    <span className="theme-description">Create your own theme</span>
                  </button>
                </div>
                
                {showCustomTheme && (
                  <>
                    {/* Inline actions that are always below the custom theme button */}
                    <div className="theme-actions-inline">
                      <div className="actions-container">
                        <div className="theme-title">
                          <h4>🎨 Custom Theme Editor</h4>
                          <p>Create your perfect color scheme</p>
                        </div>
                        <div className="action-buttons">
                          <button onClick={resetAllColors} className="reset-all-btn">
                            ↻ Reset All
                          </button>
                          <button onClick={applyCustomTheme} className="apply-theme-btn">
                            ✓ Apply Theme
                          </button>
                          <button 
                            onClick={() => setShowCustomTheme(false)} 
                            className="cancel-theme-btn"
                          >
                            ✕ Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="custom-theme-editor">
                      <div className="theme-editor-layout">
                      <div className="color-controls-grid">
                        {Object.entries(customColors).map(([key, value]) => (
                          <div key={key} className="color-control-card">
                            <div className="color-card-header">
                              <div className="color-card-info">
                                <h5 className="color-name">
                                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                </h5>
                                <div className="color-preview-large"
                                  style={{ backgroundColor: value || '#000000' }}
                                ></div>
                              </div>
                              <button 
                                className="reset-color-btn"
                                onClick={() => resetSingleColor(key)}
                                title="Reset this color"
                              >
                                ↻
                              </button>
                            </div>
                            
                            <div className="color-controls-compact">
                              <div className="hue-control">
                                <label className="control-label">Hue</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="360"
                                  value={getHueFromColor(value || '#000000')}
                                  onChange={(e) => handleHueChange(key, e.target.value)}
                                  className="hue-slider"
                                  style={{
                                    background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
                                  }}
                                />
                                <span className="control-value">{getHueFromColor(value || '#000000')}°</span>
                              </div>
                              
                              <div className="saturation-control">
                                <label className="control-label">Saturation</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={getSaturationFromColor(value || '#000000')}
                                  onChange={(e) => handleSaturationChange(key, e.target.value)}
                                  className="saturation-slider"
                                  style={{
                                    background: `linear-gradient(to right, #808080, ${hsbToHex(getHueFromColor(value || '#000000'), 100, getBrightnessFromColor(value || '#000000'))})`
                                  }}
                                />
                                <span className="control-value">{getSaturationFromColor(value || '#000000')}%</span>
                              </div>
                              
                              <div className="brightness-control">
                                <label className="control-label">Brightness</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={getBrightnessFromColor(value || '#000000')}
                                  onChange={(e) => handleBrightnessChange(key, e.target.value)}
                                  className="brightness-slider"
                                  style={{
                                    background: `linear-gradient(to right, #000000, ${hsbToHex(getHueFromColor(value || '#000000'), getSaturationFromColor(value || '#000000'), 100)})`
                                  }}
                                />
                                <span className="control-value">{getBrightnessFromColor(value || '#000000')}%</span>
                              </div>
                            </div>
                            
                            <div className="color-input-row">
                              <input
                                type="text"
                                value={value || '#000000'}
                                onChange={(e) => handleCustomColorChange(key, e.target.value)}
                                className="hex-input-compact"
                                placeholder="#000000"
                              />
                              <input
                                type="color"
                                value={value || '#000000'}
                                onChange={(e) => handleCustomColorChange(key, e.target.value)}
                                className="color-picker-compact"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="theme-preview-sidebar">
                        <h5>🖼️ Live Preview</h5>
                        <div className="preview-card-compact" style={{
                          backgroundColor: customColors.background || '#1a1a1a',
                          border: `2px solid ${customColors.border || '#333333'}`,
                          color: customColors.text || '#ffffff'
                        }}>
                          <div className="preview-header-compact" style={{
                            backgroundColor: customColors.surface || '#2a2a2a',
                            borderBottom: `1px solid ${customColors.border || '#333333'}`,
                            color: customColors.text || '#ffffff'
                          }}>
                            <span>Sample UI</span>
                            <button style={{
                              backgroundColor: customColors.primary || '#0066cc',
                              color: customColors.background || '#1a1a1a'
                            }}>
                              Button
                            </button>
                          </div>
                          <div className="preview-content-compact">
                            <p style={{ color: customColors.text || '#ffffff' }}>
                              Primary text appears like this.
                            </p>
                            <p style={{ color: customColors.textSecondary || '#cccccc' }}>
                              Secondary text is more subtle.
                            </p>
                            <div className="preview-colors">
                              <div className="color-sample" style={{ backgroundColor: customColors.primary || '#0066cc' }}>Primary</div>
                              <div className="color-sample" style={{ backgroundColor: customColors.surface || '#2a2a2a' }}>Surface</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Navbar Style Section */}
            <div className="settings-section">
              <h3>🧭 Navigation Style</h3>
              <div className="navbar-style-section">
                <p className="section-description">Choose your preferred navigation layout</p>
                <div className="navbar-style-grid">
                  {navbarStyles.map((styleOption) => (
                    <button
                      key={styleOption.name}
                      onClick={() => handleNavbarStyleChange(styleOption.name)}
                      className={`navbar-style-option ${navbarStyle === styleOption.name ? 'active' : ''}`}
                    >
                      <div 
                        className="navbar-style-preview"
                        data-style={styleOption.name}
                      >
                        <span className="preview-symbol">{styleOption.preview}</span>
                      </div>
                      <span className="navbar-style-label">{styleOption.label}</span>
                      <span className="navbar-style-description">{styleOption.description}</span>
                    </button>
                  ))}
                </div>
                
                <div className="navbar-style-info">
                  <div className="info-card">
                    <h4>📍 Current Style: {navbarStyles.find(s => s.name === navbarStyle)?.label}</h4>
                    <p>{navbarStyles.find(s => s.name === navbarStyle)?.description}</p>
                    <div className="style-features">
                      {navbarStyle === 'horizontal' ? (
                        <ul>
                          <li>✓ Traditional top navigation</li>
                          <li>✓ More screen real estate</li>
                          <li>✓ Familiar layout</li>
                          <li>✓ Mobile-friendly</li>
                        </ul>
                      ) : (
                        <ul>
                          <li>✓ Side navigation panel</li>
                          <li>✓ Always accessible</li>
                          <li>✓ More navigation items</li>
                          <li>✓ Desktop optimized</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navbar Theme Section */}
            <div className="settings-section">
              <h3>🎨 Navigation Theme</h3>
              <div className="navbar-theme-section">
                <p className="section-description">Choose your preferred navigation theme and style</p>
                <div className="navbar-theme-grid">
                  {navbarThemes.map((themeOption) => (
                    <button
                      key={themeOption.name}
                      onClick={() => handleNavbarThemeChange(themeOption.name)}
                      className={`navbar-theme-option ${navbarTheme === themeOption.name ? 'active' : ''}`}
                    >
                      <div 
                        className="navbar-theme-preview"
                        style={{
                          background: themeOption.preview.startsWith('linear-gradient') ? 
                            themeOption.preview :
                            (themeOption.preview.startsWith('rgba') || themeOption.preview.startsWith('#f') ? 
                              themeOption.preview : themeOption.preview),
                          border: themeOption.preview.startsWith('rgba') ? '1px solid rgba(255,255,255,0.2)' : 'none'
                        }}
                      >
                        <div className="theme-preview-nav">
                          <div className="theme-preview-item"></div>
                          <div className="theme-preview-item active"></div>
                          <div className="theme-preview-item"></div>
                        </div>
                      </div>
                      <span className="navbar-theme-label">{themeOption.label}</span>
                      <span className="navbar-theme-description">{themeOption.description}</span>
                    </button>
                  ))}
                </div>
                
                <div className="navbar-theme-info">
                  <div className="info-card">
                    <h4>🎯 Current Theme: {navbarThemes.find(t => t.name === navbarTheme)?.label}</h4>
                    <p>{navbarThemes.find(t => t.name === navbarTheme)?.description}</p>
                    <div className="theme-features">
                      <div className="feature-grid">
                        <div className="feature-item">
                          <span className="feature-icon">🎨</span>
                          <span>Custom Styling</span>
                        </div>
                        <div className="feature-item">
                          <span className="feature-icon">📱</span>
                          <span>Responsive Design</span>
                        </div>
                        <div className="feature-item">
                          <span className="feature-icon">✨</span>
                          <span>Smooth Animations</span>
                        </div>
                        <div className="feature-item">
                          <span className="feature-icon">🔧</span>
                          <span>Customizable</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="settings-section">
              <h3>ℹ️ About</h3>
              <div className="about-content">
                <div className="app-info">
                  <h4>DSA Visualizer</h4>
                  <p>Version 1.0.0</p>
                  <p>Interactive learning platform for algorithms, data structures, and programming concepts.</p>
                  <p className="developer-info">
                    <strong>Developed by:</strong> Vansh Patel<br/>
                    <strong>Contact:</strong> Vanshp9824@gmail.com
                  </p>
                </div>
                <div className="links">
                  <button 
                    className="link-button primary"
                    onClick={() => window.open('https://github.com/Patevansh/CodingSoul', '_blank')}
                  >
                    ⭐ Star on GitHub
                  </button>
                  <button 
                    className="link-button"
                    onClick={() => window.open('https://github.com/Patevansh/CodingSoul/fork', '_blank')}
                  >
                    🤝 Fork & Contribute
                  </button>
                  <button 
                    className="link-button"
                    onClick={() => window.open('https://github.com/Patevansh/CodingSoul/issues', '_blank')}
                  >
                    🐛 Report Bug
                  </button>
                  <button 
                    className="link-button"
                    onClick={() => window.open('https://github.com/Patevansh/CodingSoul/issues/new', '_blank')}
                  >
                    💡 Feature Request
                  </button>
                  <button 
                    className="link-button"
                    onClick={() => window.open('https://github.com/Patevansh/CodingSoul/blob/main/README.md', '_blank')}
                  >
                  📚 Documentation
                  </button>
                  <button 
                    className="link-button warning"
                    onClick={() => {
                      if (confirm('This will reset all your settings to default. Are you sure?')) {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }}
                  >
                    🔄 Reset All Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
