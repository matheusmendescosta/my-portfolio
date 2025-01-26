'use client';

import { ThemeContext } from '@/contexts/ThemeProvider';
import React, { useContext } from 'react';
import { twJoin } from 'tailwind-merge';

type CustomDocumentProps = {
  children: React.ReactNode;
  locale: string;
};

const CustomDocument = ({ children, locale }: CustomDocumentProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <html lang={locale} className={twJoin('h-full', themeContext.mode)}>
      {children}
    </html>
  );
};

export default CustomDocument;
