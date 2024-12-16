"use client"

import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { LoadingProvider } from './LoadingContext';

// Export all React contexts
export { AuthProvider, useAuth } from './AuthContext';
export { ThemeProvider, useTheme } from './ThemeContext';
export { LoadingProvider, useLoading } from './LoadingContext';

// Combined provider for easier usage
export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
