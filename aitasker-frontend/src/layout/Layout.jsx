import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar';
import { UserProvider } from '../context/UserContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function LayoutContent() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isLanding = location.pathname === '/';
  const { theme } = useTheme();

  return (
    <div className={`${theme} flex h-screen overflow-hidden`}>
      {!isLanding && <Sidebar collapsed={collapsed} onToggleSidebar={() => setCollapsed(prev => !prev)} />}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        {!isLanding && <Navbar />}
          
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function Layout() {
  return (
    <UserProvider>
      <ThemeProvider>
        <LayoutContent />
      </ThemeProvider>
    </UserProvider>
  );
}
