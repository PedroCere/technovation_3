import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  light: 'light',
  dark: 'dark',
  cyan: 'cyan',
  purple: 'purple',
  notion: 'notion',
  github: 'github',
  midnight: 'midnight',
};

const themeColors = {
  light: {
    // Base colors
    '--bg-color': '#ffffff',
    '--text-color': '#1f2937',
    '--primary-color': '#3b82f6',
    '--primary-color-hover': '#2563eb',
    '--border-color': '#e5e7eb',
    '--footer-bg': '#1f2937',

    // Buttons & inputs
    '--button-bg': '#f3f4f6',
    '--button-bg-hover': '#e5e7eb',
    '--button-text': '#1f2937',
    '--button-border': '#d1d5db',
    '--input-bg': '#ffffff',
    '--input-border': '#d1d5db',

    // Labels
    '--label-bg-blue': '#bfdbfe',
    '--label-text-blue': '#1e40af',
    '--label-bg-purple': '#ddd6fe',
    '--label-text-purple': '#5b21b6',
    '--label-bg-yellow': '#fde68a',
    '--label-text-yellow': '#92400e',

    // Calendar specific
    '--event-day-bg': '#b3d4fc',
    '--calendar-header-bg': '#f3f4f6',
    '--calendar-border': '#e5e7eb',
    '--calendar-time-gutter-bg': '#f9fafb',
    '--calendar-today-bg': '#eff6ff',
    '--calendar-selected-bg': '#dbeafe',
    '--calendar-event-bg': '#3b82f6',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#e5e7eb',

    // Scrollbar colors
    '--scroll-thumb': '#888',
    '--scroll-track': '#f1f1f1'
  },
  dark: {
    // Base colors
    '--bg-color': '#0F172A',
    '--text-color': '#f9fafb',
    '--primary-color': '#3b82f6',
    '--primary-color-hover': '#2563eb',
    '--border-color': '#334155',
    '--footer-bg': '#1f2937',

    // Buttons & inputs
    '--button-bg': '#1e293b',
    '--button-bg-hover': '#334155',
    '--button-text': '#f1f5f9',
    '--button-border': '#475569',
    '--input-bg': '#1e293b',
    '--input-border': '#475569',

    // Labels
    '--label-bg-blue': '#1e40af',
    '--label-text-blue': '#bfdbfe',
    '--label-bg-purple': '#5b21b6',
    '--label-text-purple': '#ddd6fe',
    '--label-bg-yellow': '#92400e',
    '--label-text-yellow': '#fde68a',

    // Calendar specific
    '--event-day-bg': '#1e3a8a',
    '--calendar-header-bg': '#1e293b',
    '--calendar-border': '#334155',
    '--calendar-time-gutter-bg': '#0F172A',
    '--calendar-today-bg': '#1e3a8a',
    '--calendar-selected-bg': '#1e40af',
    '--calendar-event-bg': '#2563eb',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#334155',

    // Scrollbar colors
    '--scroll-thumb': '#555',
    '--scroll-track': '#1e1e1e'
  },
  notion: {
    '--bg-color': '#1D1D1D',
    '--text-color': '#EBEBEB',
    '--primary-color': '#2F80ED',
    '--primary-color-hover': '#1C6DD0',
    '--border-color': '#3A3A3A',
    '--footer-bg': '#2A2A2A',

    '--button-bg': '#2C2C2C',
    '--button-bg-hover': '#3A3A3A',
    '--button-text': '#FFFFFF',
    '--button-border': '#4B4B4B',
    '--input-bg': '#1F1F1F',
    '--input-border': '#3D3D3D',

    '--label-bg-blue': '#2F80ED',
    '--label-text-blue': '#D0E2FF',
    '--label-bg-purple': '#9B51E0',
    '--label-text-purple': '#EEDCFF',
    '--label-bg-yellow': '#F2C94C',
    '--label-text-yellow': '#FFF8DC',

    '--event-day-bg': '#1F1F1F',
    '--calendar-header-bg': '#2C2C2C',
    '--calendar-border': '#3A3A3A',
    '--calendar-time-gutter-bg': '#1D1D1D',
    '--calendar-today-bg': '#2F80ED',
    '--calendar-selected-bg': '#1C6DD0',
    '--calendar-event-bg': '#2F80ED',
    '--calendar-event-text': '#FFFFFF',
    '--calendar-agenda-line': '#3D3D3D',

    '--scroll-thumb': '#4B4B4B',
    '--scroll-track': '#1A1A1A'
  },

  github: {
    '--bg-color': '#0d1117',
    '--text-color': '#c9d1d9',
    '--primary-color': '#58a6ff',
    '--primary-color-hover': '#1f6feb',
    '--border-color': '#30363d',
    '--footer-bg': '#161b22',

    '--button-bg': '#21262d',
    '--button-bg-hover': '#30363d',
    '--button-text': '#f0f6fc',
    '--button-border': '#30363d',
    '--input-bg': '#0d1117',
    '--input-border': '#30363d',

    '--label-bg-blue': '#0a3069',
    '--label-text-blue': '#58a6ff',
    '--label-bg-purple': '#8250df',
    '--label-text-purple': '#d2a8ff',
    '--label-bg-yellow': '#9e6a03',
    '--label-text-yellow': '#f2cc60',

    '--event-day-bg': '#161b22',
    '--calendar-header-bg': '#161b22',
    '--calendar-border': '#30363d',
    '--calendar-time-gutter-bg': '#0d1117',
    '--calendar-today-bg': '#1f6feb',
    '--calendar-selected-bg': '#58a6ff',
    '--calendar-event-bg': '#238636',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#30363d',

    '--scroll-thumb': '#484f58',
    '--scroll-track': '#161b22'
  },

  midnight: {
    '--bg-color': '#13111c',
    '--text-color': '#f0eff4',
    '--primary-color': '#7f5af0',
    '--primary-color-hover': '#6246ea',
    '--border-color': '#2e2a3f',
    '--footer-bg': '#1b1926',

    '--button-bg': '#201d2f',
    '--button-bg-hover': '#2c2940',
    '--button-text': '#e0def4',
    '--button-border': '#3c3759',
    '--input-bg': '#1a1828',
    '--input-border': '#3c3759',

    '--label-bg-blue': '#3b82f6',
    '--label-text-blue': '#dbeafe',
    '--label-bg-purple': '#a78bfa',
    '--label-text-purple': '#f3e8ff',
    '--label-bg-yellow': '#facc15',
    '--label-text-yellow': '#fef3c7',

    '--event-day-bg': '#1f1b2e',
    '--calendar-header-bg': '#2a273f',
    '--calendar-border': '#3c3759',
    '--calendar-time-gutter-bg': '#13111c',
    '--calendar-today-bg': '#6246ea',
    '--calendar-selected-bg': '#7f5af0',
    '--calendar-event-bg': '#2cb67d',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#3c3759',

    '--scroll-thumb': '#55516b',
    '--scroll-track': '#1a1828'
  },
  cyan: {
    // Base colors
    '--bg-color': '#ffffff',
    '--text-color': '#1f2937',
    '--primary-color': '#06b6d4',
    '--primary-color-hover': '#0e7490',
    '--border-color': '#0c4a6e',

    // Buttons & inputs
    '--button-bg': '#164e63',
    '--button-bg-hover': '#155e75',
    '--button-text': '#f0fdfa',
    '--button-border': '#0e7490',
    '--input-bg': '#0f172a',
    '--input-border': '#155e75',

    // Labels
    '--label-bg-blue': '#bae6fd',
    '--label-text-blue': '#0369a1',
    '--label-bg-purple': '#ddd6fe',
    '--label-text-purple': '#5b21b6',
    '--label-bg-yellow': '#facc15',
    '--label-text-yellow': '#92400e',

    // Calendar specific
    '--event-day-bg': '#bae6fd',
    '--calendar-header-bg': '#164e63',
    '--calendar-border': '#0e7490',
    '--calendar-time-gutter-bg': '#f0fdfa',
    '--calendar-today-bg': '#ecfeff',
    '--calendar-selected-bg': '#a5f3fc',
    '--calendar-event-bg': '#06b6d4',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#cffafe',

    
    // Scrollbar colors
    '--scroll-thumb': '#888',
    '--scroll-track': '#f1f1f1'
  },
  purple: {
    // Base colors
    '--bg-color': '#ffffff',
    '--text-color': '#1f2937',
    '--primary-color': '#8b5cf6',
    '--primary-color-hover': '#7c3aed',
    '--border-color': '#5b21b6',

    // Buttons & inputs
    '--button-bg': '#6d28d9',
    '--button-bg-hover': '#5b21b6',
    '--button-text': '#f9fafb',
    '--button-border': '#7e22ce',
    '--input-bg': '#4c1d95',
    '--input-border': '#7e22ce',

    // Labels
    '--label-bg-blue': '#c4b5fd',
    '--label-text-blue': '#312e81',
    '--label-bg-purple': '#5b21b6',
    '--label-text-purple': '#ddd6fe',
    '--label-bg-yellow': '#fde68a',
    '--label-text-yellow': '#92400e',

    // Calendar specific
    '--event-day-bg': '#ddd6fe',
    '--calendar-header-bg': '#6d28d9',
    '--calendar-border': '#7e22ce',
    '--calendar-time-gutter-bg': '#f5f3ff',
    '--calendar-today-bg': '#ede9fe',
    '--calendar-selected-bg': '#c4b5fd',
    '--calendar-event-bg': '#8b5cf6',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#ddd6fe',
    
    // Scrollbar colors
    '--scroll-thumb': '#888',
    '--scroll-track': '#f1f1f1'
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