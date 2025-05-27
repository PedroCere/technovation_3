import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  light: 'light',
  dark: 'dark',
  cyan: 'cyan',
  purple: 'purple',
};

const themeColors = {
  light: {
    '--bg-color': '#ffffff',
    '--text-color': '#1f2937',
    '--primary-color': '#3b82f6',
    '--primary-color-hover': '#2563eb',
    '--border-color': '#e5e7eb',

    // Botones e inputs
    '--button-bg': '#f3f4f6',
    '--button-bg-hover': '#e5e7eb',
    '--button-text': '#1f2937',
    '--button-border': '#d1d5db',
    '--input-bg': '#ffffff',
    '--input-border': '#d1d5db',

    // Etiquetas
    '--label-bg-blue': '#bfdbfe',
    '--label-text-blue': '#1e40af',
    '--label-bg-purple': '#ddd6fe',
    '--label-text-purple': '#5b21b6',
    '--label-bg-yellow': '#fde68a',
    '--label-text-yellow': '#92400e',
  },
  dark: {
    '--bg-color': '#0F172A',
    '--text-color': '#f9fafb',
    '--primary-color': '#3b82f6',
    '--primary-color-hover': '#2563eb',
    '--border-color': '#374151',

    '--button-bg': '#374151',
    '--button-bg-hover': '#4b5563',
    '--button-text': '#f9fafb',
    '--button-border': '#4b5563',
    '--input-bg': '#111827',
    '--input-border': '#4b5563',

    '--label-bg-blue': '#1e40af',
    '--label-text-blue': '#bfdbfe',
    '--label-bg-purple': '#5b21b6',
    '--label-text-purple': '#ddd6fe',
    '--label-bg-yellow': '#92400e',
    '--label-text-yellow': '#fde68a',
  },
  cyan: {
    '--bg-color': '#ffffff',
    '--text-color': '#1f2937',
    '--primary-color': '#06b6d4',
    '--primary-color-hover': '#0e7490',
    '--border-color': '#0c4a6e',

    '--button-bg': '#164e63',
    '--button-bg-hover': '#155e75',
    '--button-text': '#f0fdfa',
    '--button-border': '#0e7490',
    '--input-bg': '#0f172a',
    '--input-border': '#155e75',

    '--label-bg-blue': '#bae6fd',
    '--label-text-blue': '#0369a1',
    '--label-bg-purple': '#ddd6fe',
    '--label-text-purple': '#5b21b6',
    '--label-bg-yellow': '#facc15',
    '--label-text-yellow': '#92400e',
  },
  purple: {
    '--bg-color': '#ffffff',
    '--text-color': '#1f2937',
    '--primary-color': '#8b5cf6',
    '--primary-color-hover': '#7c3aed',
    '--border-color': '#5b21b6',

    '--button-bg': '#6d28d9',
    '--button-bg-hover': '#5b21b6',
    '--button-text': '#f9fafb',
    '--button-border': '#7e22ce',
    '--input-bg': '#4c1d95',
    '--input-border': '#7e22ce',

    '--label-bg-blue': '#c4b5fd',
    '--label-text-blue': '#312e81',
    '--label-bg-purple': '#5b21b6',
    '--label-text-purple': '#ddd6fe',
    '--label-bg-yellow': '#fde68a',
    '--label-text-yellow': '#92400e',
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || themes.light;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const html = document.documentElement;

    // Remove old theme classes
    Object.values(themes).forEach((t) => html.classList.remove(t));
    html.classList.add(theme);

    // Toggle dark mode class
    theme === themes.dark
      ? html.classList.add('dark')
      : html.classList.remove('dark');

    // Set CSS variables
    const colors = themeColors[theme];
    if (colors) {
      Object.entries(colors).forEach(([key, value]) => {
        html.style.setProperty(key, value);
      });
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
