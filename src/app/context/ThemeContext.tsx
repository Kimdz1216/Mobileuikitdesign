import React, { createContext, useContext, useState } from 'react';

export const themeColors = {
  purple: '#7C3AED',
  blue: '#2563EB',
  green: '#059669',
  orange: '#EA580C',
  pink: '#DB2777',
  teal: '#0891B2',
};

type ThemeColor = keyof typeof themeColors;

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  color: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>('purple');
  const color = themeColors[themeColor];

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, color }}>
      <div
        style={
          {
            '--theme-color': color,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
