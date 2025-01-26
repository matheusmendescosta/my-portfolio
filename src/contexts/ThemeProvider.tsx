'use client';

import { createContext, useEffect, useState } from 'react';

export type ThemeContextType = {
  mode: 'light' | 'dark' | (string & {});
  toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark' | (string & {})>('dark');

  const toggleMode = () => {
    const theme = mode === 'light' ? 'dark' : 'light';
    setMode(theme);
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');

    setMode(theme ?? 'light');
  }, [mode]);

  return <ThemeContext.Provider value={{ mode, toggleMode }}>{children}</ThemeContext.Provider>;
}
