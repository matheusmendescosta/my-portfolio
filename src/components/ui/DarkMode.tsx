'use client';

import { ThemeContext } from '@/contexts/ThemeProvider';
import { MoonIcon, SunMedium } from 'lucide-react';
import { useContext } from 'react';

const DarkMode = () => {
  const themeContext = useContext(ThemeContext);

  return <button onClick={themeContext.toggleMode}>{themeContext.mode === 'dark' ? <SunMedium /> : <MoonIcon />}</button>;
};

export default DarkMode;
