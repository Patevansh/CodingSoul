import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    name: 'Light',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      shadow: 'rgba(0, 0, 0, 0.1)',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }
  },
  glass: {
    name: 'Glass',
    colors: {
      primary: '#007AFF',
      secondary: '#5856D6',
      accent: '#FF3B30',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      surface: 'rgba(255, 255, 255, 0.15)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.85)',
      border: 'rgba(255, 255, 255, 0.25)',
      shadow: 'rgba(0, 0, 0, 0.5)',
      gradient: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      glassMorphism: true,
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#0a0a0a',
      surface: '#171717',
      text: '#fafafa',
      textSecondary: '#a1a1aa',
      border: '#262626',
      shadow: 'rgba(0, 0, 0, 0.5)',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    }
  },
  midnight: {
    name: 'Midnight',
    colors: {
      primary: '#4f46e5',
      secondary: '#6366f1',
      accent: '#06b6d4',
      background: '#0f0f23',
      surface: '#1a1a2e',
      text: '#e2e8f0',
      textSecondary: '#94a3b8',
      border: '#334155',
      shadow: 'rgba(79, 70, 229, 0.25)',
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    colors: {
      primary: '#00d4aa',
      secondary: '#ff006e',
      accent: '#8338ec',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#f0f0f0',
      textSecondary: '#b0b0b0',
      border: '#2a2a2a',
      shadow: 'rgba(0, 212, 170, 0.2)',
      gradient: 'linear-gradient(135deg, #00d4aa 0%, #ff006e 100%)',
    }
  },
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#14b8a6',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: '#0c4a6e',
      textSecondary: '#0369a1',
      border: '#bae6fd',
      shadow: 'rgba(6, 182, 212, 0.2)',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)',
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#f59e0b',
      secondary: '#ef4444',
      accent: '#ec4899',
      background: '#fffbeb',
      surface: '#fef3c7',
      text: '#92400e',
      textSecondary: '#d97706',
      border: '#fde68a',
      shadow: 'rgba(245, 158, 11, 0.2)',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
    }
  },
  purple: {
    name: 'Purple',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a855f7',
      accent: '#c084fc',
      background: '#0f0a19',
      surface: '#1a1625',
      text: '#f3f4f6',
      textSecondary: '#a1a1aa',
      border: '#374151',
      shadow: 'rgba(139, 92, 246, 0.3)',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
    }
  },
  slate: {
    name: 'Slate',
    colors: {
      primary: '#374151',
      secondary: '#4b5563',
      accent: '#6b7280',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      border: '#374151',
      shadow: 'rgba(0, 0, 0, 0.5)',
      gradient: 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
    }
  },
  custom: {
    name: 'Custom',
    colors: {
      primary: '#00ff88',
      secondary: '#00cc6a',
      accent: '#00aa4f',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#888888',
      border: '#333333',
      shadow: 'rgba(0, 255, 136, 0.3)',
      gradient: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
    }
  },
  highContrast: {
    name: 'High Contrast',
    colors: {
      primary: '#ffffff',
      secondary: '#ffffff',
      accent: '#ffffff',
      background: '#000000',
      surface: '#000000',
      text: '#ffffff',
      textSecondary: '#ffffff',
      border: '#ffffff',
      shadow: 'rgba(255, 255, 255, 0.5)',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
    }
  },
  blackWhite: {
    name: 'Black & White',
    colors: {
      primary: '#000000',
      secondary: '#333333',
      accent: '#666666',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#000000',
      textSecondary: '#666666',
      border: '#cccccc',
      shadow: 'rgba(0, 0, 0, 0.2)',
      gradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
    }
  },
  forest: {
    name: 'Forest',
    colors: {
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#15803d',
      background: '#0a1f0f',
      surface: '#1a2f1f',
      text: '#f0fdf4',
      textSecondary: '#bbf7d0',
      border: '#166534',
      shadow: 'rgba(34, 197, 94, 0.3)',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    }
  },
  rose: {
    name: 'Rose',
    colors: {
      primary: '#f43f5e',
      secondary: '#e11d48',
      accent: '#be185d',
      background: '#1f0a1a',
      surface: '#2f1a2a',
      text: '#fdf2f8',
      textSecondary: '#fbbf24',
      border: '#9f1239',
      shadow: 'rgba(244, 63, 94, 0.3)',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    }
  },
  amber: {
    name: 'Amber',
    colors: {
      primary: '#f59e0b',
      secondary: '#d97706',
      accent: '#b45309',
      background: '#1f1a0a',
      surface: '#2f2a1a',
      text: '#fffbeb',
      textSecondary: '#fde68a',
      border: '#92400e',
      shadow: 'rgba(245, 158, 11, 0.3)',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    }
  },
  teal: {
    name: 'Teal',
    colors: {
      primary: '#14b8a6',
      secondary: '#0d9488',
      accent: '#0f766e',
      background: '#0a1f1c',
      surface: '#1a2f2c',
      text: '#f0fdfa',
      textSecondary: '#99f6e4',
      border: '#134e4a',
      shadow: 'rgba(20, 184, 166, 0.3)',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    }
  },
  indigo: {
    name: 'Indigo',
    colors: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      accent: '#4338ca',
      background: '#0f0f1a',
      surface: '#1f1f2a',
      text: '#f8fafc',
      textSecondary: '#c7d2fe',
      border: '#312e81',
      shadow: 'rgba(99, 102, 241, 0.3)',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    }
  },
  blueSlate: {
    name: 'Blue Slate',
    colors: {
      primary: '#64748b',
      secondary: '#475569',
      accent: '#334155',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      border: '#334155',
      shadow: 'rgba(100, 116, 139, 0.3)',
      gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    }
  },
  emerald: {
    name: 'Emerald',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#047857',
      background: '#064e3b',
      surface: '#065f46',
      text: '#ecfdf5',
      textSecondary: '#a7f3d0',
      border: '#047857',
      shadow: 'rgba(16, 185, 129, 0.3)',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    }
  },
  crimson: {
    name: 'Crimson',
    colors: {
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#991b1b',
      background: '#1f0a0a',
      surface: '#2f1a1a',
      text: '#fef2f2',
      textSecondary: '#fecaca',
      border: '#7f1d1d',
      shadow: 'rgba(220, 38, 38, 0.3)',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved && themes[saved] ? saved : 'light';
  });

  // Apply theme immediately on mount
  useEffect(() => {
    const applyTheme = (themeName) => {
      const root = document.documentElement;
      const body = document.body;
      const theme = themes[themeName];
      
      // Remove existing theme classes
      body.className = body.className.replace(/data-theme-\w+/g, '');
      body.setAttribute('data-theme', themeName);
      
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
      
      // Helper function to convert hex to RGB
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
          `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
          '0, 0, 0';
      };
      
      // Set RGB values for transparency effects
      root.style.setProperty('--color-background-rgb', hexToRgb(theme.colors.background));
      root.style.setProperty('--color-surface-rgb', hexToRgb(theme.colors.surface));
      root.style.setProperty('--color-primary-rgb', hexToRgb(theme.colors.primary));
      root.style.setProperty('--color-border-rgb', hexToRgb(theme.colors.border));
      root.style.setProperty('--color-shadow-rgb', '0, 0, 0'); // Keep shadow as black for better depth
    };

    // Apply theme immediately
    applyTheme(currentTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    
    // Apply CSS custom properties for the current theme
    const root = document.documentElement;
    const body = document.body;
    const theme = themes[currentTheme];
    
    // Remove existing theme classes
    body.className = body.className.replace(/data-theme-\w+/g, '');
    body.setAttribute('data-theme', currentTheme);
    
    // Add glass morphism class if theme supports it
    if (theme.colors.glassMorphism) {
      body.classList.add('glass-morphism');
    } else {
      body.classList.remove('glass-morphism');
    }
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Helper function to convert hex to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        '0, 0, 0';
    };
    
    // Set RGB values for transparency effects
    if (theme.colors.glassMorphism) {
      // For glass theme, set special background handling
      root.style.setProperty('--color-background-rgb', '102, 126, 234'); // Base gradient color
      root.style.setProperty('--color-surface-rgb', '255, 255, 255'); // White for glass surfaces
    } else {
      root.style.setProperty('--color-background-rgb', hexToRgb(theme.colors.background));
      root.style.setProperty('--color-surface-rgb', hexToRgb(theme.colors.surface));
    }
    
    root.style.setProperty('--color-primary-rgb', hexToRgb(theme.colors.primary));
    root.style.setProperty('--color-border-rgb', hexToRgb(theme.colors.border));
    root.style.setProperty('--color-shadow-rgb', '0, 0, 0'); // Keep shadow as black for better depth
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    theme: currentTheme,
    setTheme: changeTheme,
    currentTheme,
    themeObject: themes[currentTheme],
    changeTheme,
    availableThemes: Object.keys(themes)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
