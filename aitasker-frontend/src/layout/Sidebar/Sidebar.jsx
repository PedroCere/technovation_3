import React, { useState, useEffect, useRef } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarProjects from './SidebarProjects';
import SidebarUserMenu from './SidebarUserMenu';
import SettingsModal from './SettingsModal';
import SearchModal from './SearchModal';
import HelpModal from './HelpModal';
import TaskForm from './TaskForm';

const Sidebar = ({ collapsed, onToggleSidebar }) => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const searchMenuRef = useRef(null);
  const modalRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSearchMenu(false);
        setShowAddTaskModal(false);
        setShowHelp(false);
        setIsUserMenuOpen(false);
        setShowSettingsModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchMenuRef.current && !searchMenuRef.current.contains(e.target)) {
        setShowSearchMenu(false);
      }
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowAddTaskModal(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <aside className={`${collapsed ? 'w-16' : 'w-72'} transition-all h-screen flex flex-col bg-[#fefcfb] text-black font-sans text-sm`}>
        
        <SidebarHeader
          collapsed={collapsed}
          onToggleSidebar={onToggleSidebar}
          isUserMenuOpen={isUserMenuOpen}
          setIsUserMenuOpen={setIsUserMenuOpen}
          showSettings={() => setShowSettingsModal(true)}
          userMenuRef={userMenuRef}
        />
        {!collapsed && (
          <>
            <SidebarMenu
              setShowAddTaskModal={setShowAddTaskModal}
              setShowSearchMenu={setShowSearchMenu}
            />
            <SidebarProjects />
          </>
        )}
      </aside>

      {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} />}
      {showSearchMenu && <SearchModal onClose={() => setShowSearchMenu(false)} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {showAddTaskModal && <TaskForm onClose={() => setShowAddTaskModal(false)} />}
    </>
  );
};

export default Sidebar;
