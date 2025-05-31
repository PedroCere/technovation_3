import React, { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarProjects from './SidebarProjects';
import SettingsModal from './SettingsModal';
import SearchModal from './SearchModal';
import HelpModal from './HelpModal';
import TaskForm from './TaskForm';
import { createTask } from '../../services/taskService';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
  const [hovered, setHovered] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { theme } = useTheme();

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
      {/* Hover Arrow Toggle */}
      <div
        className="fixed top-1/2 left-0 z-50 w-5 h-10 flex items-center justify-center bg-[var(--bg-color)] border-r border-[var(--border-color)] rounded-r-md transition-all duration-300 hover:w-6 group"
        style={{ transform: 'translateY(-50%)' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ChevronRight
          size={16}
          className="text-[var(--primary-color)] transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 bg-[var(--bg-color)] text-[var(--text-color)] shadow-lg transform transition-all duration-300 ease-in-out ${
          hovered ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="h-full flex flex-col">
          <SidebarHeader
            collapsed={false}
            onToggleSidebar={() => setHovered(false)}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
            showSettings={() => setShowSettingsModal(true)}
          />
          <SidebarMenu
            setShowAddTaskModal={setShowAddTaskModal}
            setShowSearchMenu={setShowSearchMenu}
            primaryColor="var(--primary-color)"
          />
          <SidebarProjects primaryColor="var(--primary-color)" />
        </div>
      </aside>

      {/* Modales */}
      {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} />}
      {showSearchMenu && <SearchModal onClose={() => setShowSearchMenu(false)} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {showAddTaskModal && (
        <TaskForm onClose={() => setShowAddTaskModal(false)} onSubmit={handleAddTaskSubmit} />
      )}
    </>
  );
};

export default Sidebar;
