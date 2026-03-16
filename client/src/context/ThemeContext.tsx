import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './ThemeContextInstance';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// export const ThemeContext = createContext<ThemeContextType>({
//   theme: 'light',
//   toggleTheme: () => {},
// });

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage?.getItem('theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    if (window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
      return 'dark';
    }
    return 'light';
  });

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage?.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = document?.documentElement;
    if (root) {
      root.setAttribute('data-theme', theme);
      root.classList?.remove('light', 'dark');
      root.classList?.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window?.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage?.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery?.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery?.removeEventListener('change', handleSystemThemeChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;