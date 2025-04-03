import React from 'react';

import { HeaderThemeProvider } from './HeaderTheme';
import { ThemeProvider } from './Theme';
import { VideoProvider } from '../contexts/VideoContext';

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <VideoProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </VideoProvider>
    </ThemeProvider>
  );
};
