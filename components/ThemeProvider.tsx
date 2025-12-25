
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Environment } from '../types';
import { ENVIRONMENTS } from '../constants';

interface ThemeContextType {
  env: Environment;
  setEnv: (env: Environment) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [env, setEnv] = useState<Environment>(Environment.CALM);

  useEffect(() => {
    const tokens = ENVIRONMENTS[env];
    const root = document.documentElement;
    
    root.style.setProperty('--ethos-bg', tokens.bg);
    root.style.setProperty('--ethos-text', tokens.text);
    root.style.setProperty('--ethos-primary', tokens.primary);
    root.style.setProperty('--ethos-muted', tokens.muted);
    root.style.setProperty('--ethos-warning', tokens.warning);
    root.style.setProperty('--ethos-success', tokens.success);
    root.style.setProperty('--ethos-danger', tokens.danger);
    root.style.setProperty('--ethos-focus', tokens.focus);
    root.style.setProperty('--ethos-border-width', tokens.borderWidth);
    root.style.setProperty('--ethos-border-radius', tokens.borderRadius);
    root.style.setProperty('--ethos-shadow', tokens.shadow);
    root.style.setProperty('--ethos-motion-duration', tokens.motionDuration);
    root.style.setProperty('--ethos-motion-easing', tokens.motionEasing);
    root.style.setProperty('--ethos-glass-blur', tokens.glassBlur || '0px');
    root.style.setProperty('--ethos-glass-bg', tokens.glassBg || 'transparent');
    root.style.setProperty('--ethos-letter-spacing', tokens.letterSpacing || 'normal');
  }, [env]);

  return (
    <ThemeContext.Provider value={{ env, setEnv }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
