import { createContext } from 'react';
import type { ThemeContextType } from './ThemeContext';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});