import React, { useState, useEffect, useRef } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarProjects from './SidebarProjects';
import SidebarUserMenu from './SidebarUserMenu';
import SettingsModal from './SettingsModal';
import SearchModal from './SearchModal';
import HelpModal from './HelpModal';
import TaskForm from './TaskForm';
import { createTask } from '../../services/taskService';
import { motion, AnimatePresence } from 'framer-motion';

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

  const handleAddTaskSubmit = async (taskData) => {
    try {
      await createTask(taskData);
      setShowAddTaskModal(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <>
      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`${collapsed ? 'w-16 opacity-70 scale-95' : 'w-72 opacity-100 scale-100'} transition-[width,opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-color)] font-sans text-sm`}
      >
        <SidebarHeader
          collapsed={collapsed}
          onToggleSidebar={onToggleSidebar}
          isUserMenuOpen={isUserMenuOpen}
          setIsUserMenuOpen={setIsUserMenuOpen}
          showSettings={() => setShowSettingsModal(true)}
          userMenuRef={userMenuRef}
        />

        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SidebarMenu
              setShowAddTaskModal={setShowAddTaskModal}
              setShowSearchMenu={setShowSearchMenu}
              primaryColor="var(--primary-color)"
            />
            <SidebarProjects primaryColor="var(--primary-color)" />
          </motion.div>
        )}
      </motion.aside>

      <AnimatePresence>
        {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} />}
        {showSearchMenu && <SearchModal onClose={() => setShowSearchMenu(false)} />}
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        {showAddTaskModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TaskForm onClose={() => setShowAddTaskModal(false)} onSubmit={handleAddTaskSubmit} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
