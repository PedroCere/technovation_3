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
  focus: 'focus',
  sunset: 'sunset',
  neon: 'neon',
  volcano: 'volcano',
  forest: 'forest',
  monochrome: 'monochrome',
  grape: 'grape',
  coffee: 'coffee',
};

const themeColors = {
  light: {
    // -- base UI
    '--bg-color': '#ffffff',
    '--text-color': '#1f2937',
    '--input-text': '#1f2937',
    '--primary-color': '#3b82f6',
    '--primary-color-hover': '#2563eb',
    '--border-color': '#e5e7eb',
    '--footer-bg': '#1f2937',

    // -- interactive elements
    '--button-bg': '#f3f4f6',
    '--button-bg-hover': '#e5e7eb',
    '--button-text': '#1f2937',
    '--button-border': '#d1d5db',
    '--input-bg': '#ffffff',
    '--input-border': '#d1d5db',

    // -- labels
    '--label-bg-blue': '#bfdbfe',
    '--label-text-blue': '#1e40af',
    '--label-bg-purple': '#ddd6fe',
    '--label-text-purple': '#5b21b6',
    '--label-bg-yellow': '#fde68a',
    '--label-text-yellow': '#92400e',

    // -- calendar
    '--event-day-bg': '#b3d4fc',
    '--calendar-header-bg': '#f3f4f6',
    '--calendar-border': '#e5e7eb',
    '--calendar-time-gutter-bg': '#f9fafb',
    '--calendar-today-bg': '#eff6ff',
    '--calendar-selected-bg': '#dbeafe',
    '--calendar-event-bg': '#3b82f6',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#e5e7eb',

    // -- scrollbar colors
    '--scroll-thumb': '#888',
    '--scroll-track': '#f1f1f1'
  },
  dark: {
    // -- base UI
    '--bg-color': '#0F172A',
    '--text-color': '#f9fafb',
    '--input-text': '#f9fafb',
    '--primary-color': '#3b82f6',
    '--primary-color-hover': '#2563eb',
    '--border-color': '#334155',
    '--footer-bg': '#1f2937',

    // -- interactive elements
    '--button-bg': '#1e293b',
    '--button-bg-hover': '#334155',
    '--button-text': '#f1f5f9',
    '--button-border': '#475569',
    '--input-bg': '#1e293b',
    '--input-border': '#475569',

    // -- labels
    '--label-bg-blue': '#1e40af',
    '--label-text-blue': '#bfdbfe',
    '--label-bg-purple': '#5b21b6',
    '--label-text-purple': '#ddd6fe',
    '--label-bg-yellow': '#92400e',
    '--label-text-yellow': '#fde68a',

    // -- calendar
    '--event-day-bg': '#1e3a8a',
    '--calendar-header-bg': '#1e293b',
    '--calendar-border': '#334155',
    '--calendar-time-gutter-bg': '#0F172A',
    '--calendar-today-bg': '#1e3a8a',
    '--calendar-selected-bg': '#1e40af',
    '--calendar-event-bg': '#2563eb',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#334155',

    // -- scrollbar colors
    '--scroll-thumb': '#555',
    '--scroll-track': '#1e1e1e'
  },
  notion: {
    '--bg-color': '#1D1D1D',
    '--text-color': '#EBEBEB',
    '--input-text': '#EBEBEB',
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
    '--input-text': '#c9d1d9',
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
    '--input-text': '#f0eff4',
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
    // -- base UI
    '--bg-color': '#ffffff',
    '--text-color': '#1f2937',
    '--input-text': '#1f2937',
    '--primary-color': '#06b6d4',
    '--primary-color-hover': '#0e7490',
    '--border-color': '#0c4a6e',

    // -- interactive elements
    '--button-bg': '#164e63',
    '--button-bg-hover': '#155e75',
    '--button-text': '#f0fdfa',
    '--button-border': '#0e7490',
    '--input-bg': '#0f172a',
    '--input-border': '#155e75',

    // -- labels
    '--label-bg-blue': '#bae6fd',
    '--label-text-blue': '#0369a1',
    '--label-bg-purple': '#ddd6fe',
    '--label-text-purple': '#5b21b6',
    '--label-bg-yellow': '#facc15',
    '--label-text-yellow': '#92400e',

    // -- calendar
    '--event-day-bg': '#bae6fd',
    '--calendar-header-bg': '#164e63',
    '--calendar-border': '#0e7490',
    '--calendar-time-gutter-bg': '#f0fdfa',
    '--calendar-today-bg': '#ecfeff',
    '--calendar-selected-bg': '#a5f3fc',
    '--calendar-event-bg': '#06b6d4',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#cffafe',

    // -- scrollbar colors
    '--scroll-thumb': '#888',
    '--scroll-track': '#f1f1f1'
  },
  purple: {
    // -- base UI
    '--bg-color': '#ffffff',
    '--text-color': '#1f2937',
    '--input-text': '#1f2937',
    '--primary-color': '#8b5cf6',
    '--primary-color-hover': '#7c3aed',
    '--border-color': '#5b21b6',

    // -- interactive elements
    '--button-bg': '#6d28d9',
    '--button-bg-hover': '#5b21b6',
    '--button-text': '#f9fafb',
    '--button-border': '#7e22ce',
    '--input-bg': '#4c1d95',
    '--input-border': '#7e22ce',

    // -- labels
    '--label-bg-blue': '#c4b5fd',
    '--label-text-blue': '#312e81',
    '--label-bg-purple': '#5b21b6',
    '--label-text-purple': '#ddd6fe',
    '--label-bg-yellow': '#fde68a',
    '--label-text-yellow': '#92400e',

    // -- calendar
    '--event-day-bg': '#ddd6fe',
    '--calendar-header-bg': '#6d28d9',
    '--calendar-border': '#7e22ce',
    '--calendar-time-gutter-bg': '#f5f3ff',
    '--calendar-today-bg': '#ede9fe',
    '--calendar-selected-bg': '#c4b5fd',
    '--calendar-event-bg': '#8b5cf6',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#ddd6fe',

    // -- scrollbar colors
    '--scroll-thumb': '#888',
    '--scroll-track': '#f1f1f1'
  },
  focus: {
    // -- base UI
    '--bg-color': '#fdfdfd',
    '--text-color': '#111827',
    '--input-text': '#111827',
    '--primary-color': '#6366f1',
    '--primary-color-hover': '#4f46e5',
    '--border-color': '#d1d5db',
    '--footer-bg': '#f9fafb',

    // -- interactive elements
    '--button-bg': '#f3f4f6',
    '--button-bg-hover': '#e5e7eb',
    '--button-text': '#111827',
    '--button-border': '#d1d5db',
    '--input-bg': '#ffffff',
    '--input-border': '#d1d5db',

    // -- labels
    '--label-bg-blue': '#e0e7ff',
    '--label-text-blue': '#3730a3',
    '--label-bg-purple': '#ede9fe',
    '--label-text-purple': '#6b21a8',
    '--label-bg-yellow': '#fef3c7',
    '--label-text-yellow': '#92400e',

    // -- calendar
    '--event-day-bg': '#e0f2fe',
    '--calendar-header-bg': '#f3f4f6',
    '--calendar-border': '#e5e7eb',
    '--calendar-time-gutter-bg': '#f9fafb',
    '--calendar-today-bg': '#eef2ff',
    '--calendar-selected-bg': '#c7d2fe',
    '--calendar-event-bg': '#6366f1',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#e5e7eb',

    // -- scrollbar colors
    '--scroll-thumb': '#d1d5db',
    '--scroll-track': '#f3f4f6'
  },
  sunset: {
    // -- base UI
    '--bg-color': '#fff7ed',
    '--text-color': '#1f2937',
    '--input-text': '#1f2937',
    '--primary-color': '#f97316',
    '--primary-color-hover': '#ea580c',
    '--border-color': '#fed7aa',
    '--footer-bg': '#ffedd5',

    // -- interactive elements
    '--button-bg': '#fdba74',
    '--button-bg-hover': '#fb923c',
    '--button-text': '#1f2937',
    '--button-border': '#f97316',
    '--input-bg': '#fff7ed',
    '--input-border': '#fb923c',

    // -- labels
    '--label-bg-blue': '#bfdbfe',
    '--label-text-blue': '#1e3a8a',
    '--label-bg-purple': '#f5d0fe',
    '--label-text-purple': '#7e22ce',
    '--label-bg-yellow': '#fef08a',
    '--label-text-yellow': '#92400e',

    // -- calendar
    '--event-day-bg': '#fff0e6',
    '--calendar-header-bg': '#ffeedd',
    '--calendar-border': '#fb923c',
    '--calendar-time-gutter-bg': '#fff7ed',
    '--calendar-today-bg': '#fed7aa',
    '--calendar-selected-bg': '#fdba74',
    '--calendar-event-bg': '#f97316',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#fed7aa',

    // -- scrollbar colors
    '--scroll-thumb': '#fb923c',
    '--scroll-track': '#fff0e6'
  },
  neon: {
    // -- base UI
    '--bg-color': '#0a0a23',
    '--text-color': '#d1d5db',
    '--input-text': '#d1d5db',
    '--primary-color': '#0ff0fc',
    '--primary-color-hover': '#00c3cb',
    '--border-color': '#334155',
    '--footer-bg': '#1e1b3a',

    // -- interactive elements
    '--button-bg': '#1e1b3a',
    '--button-bg-hover': '#273049',
    '--button-text': '#d1d5db',
    '--button-border': '#00c3cb',
    '--input-bg': '#1e1b3a',
    '--input-border': '#334155',

    // -- labels
    '--label-bg-blue': '#3b82f6',
    '--label-text-blue': '#dbeafe',
    '--label-bg-purple': '#a78bfa',
    '--label-text-purple': '#f3e8ff',
    '--label-bg-yellow': '#facc15',
    '--label-text-yellow': '#fef3c7',

    // -- calendar
    '--event-day-bg': '#1e1b3a',
    '--calendar-header-bg': '#1e293b',
    '--calendar-border': '#334155',
    '--calendar-time-gutter-bg': '#0a0a23',
    '--calendar-today-bg': '#0ff0fc33',
    '--calendar-selected-bg': '#00c3cb',
    '--calendar-event-bg': '#0ff0fc',
    '--calendar-event-text': '#000000',
    '--calendar-agenda-line': '#334155',

    // -- scrollbar colors
    '--scroll-thumb': '#00c3cb',
    '--scroll-track': '#1e1b3a'
  },
  volcano: {
    // -- base UI
    '--bg-color': '#1b1a1f',
    '--text-color': '#fce8e8',
    '--input-text': '#fce8e8',
    '--primary-color': '#ff5f5f',
    '--primary-color-hover': '#e23e3e',
    '--border-color': '#3a3a3a',
    '--footer-bg': '#2b2a2f',

    // -- interactive elements
    '--button-bg': '#2a1e1e',
    '--button-bg-hover': '#3d2a2a',
    '--button-text': '#fce8e8',
    '--button-border': '#ff5f5f',
    '--input-bg': '#231b1b',
    '--input-border': '#e23e3e',

    // -- labels
    '--label-bg-blue': '#fda4af',
    '--label-text-blue': '#7f1d1d',
    '--label-bg-purple': '#f0abfc',
    '--label-text-purple': '#831843',
    '--label-bg-yellow': '#facc15',
    '--label-text-yellow': '#78350f',

    // -- calendar
    '--event-day-bg': '#2e1c1c',
    '--calendar-header-bg': '#3a2b2b',
    '--calendar-border': '#4b3a3a',
    '--calendar-time-gutter-bg': '#1b1a1f',
    '--calendar-today-bg': '#451717',
    '--calendar-selected-bg': '#ff5f5f',
    '--calendar-event-bg': '#e23e3e',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#3a3a3a',

    // -- scrollbar colors
    '--scroll-thumb': '#a85555',
    '--scroll-track': '#2a1e1e'
  },
  forest: {
    // -- base UI
    '--bg-color': '#0f1f1a',
    '--text-color': '#e4f5ec',
    '--input-text': '#e4f5ec',
    '--primary-color': '#22c55e',
    '--primary-color-hover': '#16a34a',
    '--border-color': '#2d3f38',
    '--footer-bg': '#122c24',

    // -- interactive elements
    '--button-bg': '#1e3028',
    '--button-bg-hover': '#2e443a',
    '--button-text': '#e4f5ec',
    '--button-border': '#16a34a',
    '--input-bg': '#1a2e26',
    '--input-border': '#166534',

    // -- labels
    '--label-bg-blue': '#bbf7d0',
    '--label-text-blue': '#14532d',
    '--label-bg-purple': '#d9f99d',
    '--label-text-purple': '#365314',
    '--label-bg-yellow': '#fde68a',
    '--label-text-yellow': '#78350f',

    // -- calendar
    '--event-day-bg': '#193924',
    '--calendar-header-bg': '#1e3028',
    '--calendar-border': '#2d3f38',
    '--calendar-time-gutter-bg': '#0f1f1a',
    '--calendar-today-bg': '#14532d',
    '--calendar-selected-bg': '#22c55e',
    '--calendar-event-bg': '#16a34a',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#2d3f38',

    // -- scrollbar colors
    '--scroll-thumb': '#15803d',
    '--scroll-track': '#122c24'
  },
  monochrome: {
    // -- base UI
    '--bg-color': '#121212',
    '--text-color': '#e5e5e5',
    '--input-text': '#e5e5e5',
    '--primary-color': '#a1a1aa',
    '--primary-color-hover': '#d4d4d8',
    '--border-color': '#3f3f46',
    '--footer-bg': '#18181b',

    // -- interactive elements
    '--button-bg': '#1f1f23',
    '--button-bg-hover': '#2e2e33',
    '--button-text': '#f4f4f5',
    '--button-border': '#3f3f46',
    '--input-bg': '#1e1e22',
    '--input-border': '#3f3f46',

    // -- labels
    '--label-bg-blue': '#e4e4e7',
    '--label-text-blue': '#18181b',
    '--label-bg-purple': '#d4d4d8',
    '--label-text-purple': '#27272a',
    '--label-bg-yellow': '#e7e5e4',
    '--label-text-yellow': '#292524',

    // -- calendar
    '--event-day-bg': '#1f1f23',
    '--calendar-header-bg': '#1e1e22',
    '--calendar-border': '#3f3f46',
    '--calendar-time-gutter-bg': '#121212',
    '--calendar-today-bg': '#3f3f46',
    '--calendar-selected-bg': '#a1a1aa',
    '--calendar-event-bg': '#52525b',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#3f3f46',

    // -- scrollbar colors
    '--scroll-thumb': '#4b5563',
    '--scroll-track': '#18181b'
  },
  grape: {
    // -- base UI
    '--bg-color': '#1c1624',
    '--text-color': '#f3e8ff',
    '--input-text': '#f3e8ff',
    '--primary-color': '#a855f7',
    '--primary-color-hover': '#9333ea',
    '--border-color': '#4c1d95',
    '--footer-bg': '#2a1e3c',

    // -- interactive elements
    '--button-bg': '#2e1a47',
    '--button-bg-hover': '#4c1d95',
    '--button-text': '#f3e8ff',
    '--button-border': '#9333ea',
    '--input-bg': '#1f1b2e',
    '--input-border': '#4c1d95',

    // -- labels
    '--label-bg-blue': '#c084fc',
    '--label-text-blue': '#3b0764',
    '--label-bg-purple': '#f5d0fe',
    '--label-text-purple': '#6b21a8',
    '--label-bg-yellow': '#fef08a',
    '--label-text-yellow': '#92400e',

    // -- calendar
    '--event-day-bg': '#2a1e3c',
    '--calendar-header-bg': '#3b0764',
    '--calendar-border': '#6b21a8',
    '--calendar-time-gutter-bg': '#1c1624',
    '--calendar-today-bg': '#a855f7',
    '--calendar-selected-bg': '#d8b4fe',
    '--calendar-event-bg': '#9333ea',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#4c1d95',

    // -- scrollbar colors
    '--scroll-thumb': '#6b21a8',
    '--scroll-track': '#2e1a47'
  },
  coffee: {
    // -- base UI
    '--bg-color': '#1c1b18',
    '--text-color': '#f5f5dc',
    '--input-text': '#f5f5dc',
    '--primary-color': '#b08968',
    '--primary-color-hover': '#a27551',
    '--border-color': '#5c5044',
    '--footer-bg': '#2e2c28',

    // -- interactive elements
    '--button-bg': '#3e352c',
    '--button-bg-hover': '#52473b',
    '--button-text': '#f5f5dc',
    '--button-border': '#a27551',
    '--input-bg': '#2c2a25',
    '--input-border': '#5c5044',

    // -- labels
    '--label-bg-blue': '#d6ccc2',
    '--label-text-blue': '#3e352c',
    '--label-bg-purple': '#dec8b2',
    '--label-text-purple': '#4b3e2f',
    '--label-bg-yellow': '#f1dca7',
    '--label-text-yellow': '#5c3d1c',

    // -- calendar
    '--event-day-bg': '#3e352c',
    '--calendar-header-bg': '#52473b',
    '--calendar-border': '#5c5044',
    '--calendar-time-gutter-bg': '#1c1b18',
    '--calendar-today-bg': '#a27551',
    '--calendar-selected-bg': '#d6ccc2',
    '--calendar-event-bg': '#b08968',
    '--calendar-event-text': '#ffffff',
    '--calendar-agenda-line': '#5c5044',

    // -- scrollbar colors
    '--scroll-thumb': '#7b6c5f',
    '--scroll-track': '#2e2c28'
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
