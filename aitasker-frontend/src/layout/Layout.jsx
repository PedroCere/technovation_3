import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar';
import { UserProvider } from '../context/UserContext';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isLanding = location.pathname === '/';

  return (
    <UserProvider>
      <div className="flex h-screen overflow-hidden">
        {!isLanding && <Sidebar collapsed={collapsed} onToggleSidebar={() => setCollapsed(prev => !prev)} />}
        <div className="flex-1 flex flex-col bg-white">
          {!isLanding && <Navbar />}
            
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
