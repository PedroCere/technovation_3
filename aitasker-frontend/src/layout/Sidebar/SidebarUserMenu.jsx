import React, { useState, useRef, useEffect } from 'react';
import {
  Settings, Users, Activity, Printer, Megaphone,
  ArrowUpCircle, RefreshCw, LogOut, BookOpenText, User
} from 'lucide-react';
import SettingsLayout from './SettingsLayout';
import { useUser } from '../../context/UserContext';

const SidebarUserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const menuRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openSettings = () => {
    setIsOpen(false);
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón de usuario */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full p-2 hover:bg-[var(--primary-color-hover)] rounded-lg transition-colors"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-yellow-400 flex items-center justify-center">
          {user?.photoUrl ? (
            <img src={user.photoUrl} alt="User" className="w-full h-full object-cover" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="text-left text-[var(--text-color)]">
          <p className="text-sm font-medium">{user?.username || 'Usuario'}</p>
          <p className="text-xs opacity-70">1/5 tasks</p>
        </div>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--bg-color)] rounded-lg shadow-xl border border-[var(--border-color)] text-[var(--text-color)] transition-all z-50">
          <div className="p-2 space-y-1">
            <MenuButton icon={<Settings />} label="Settings" onClick={openSettings} />
            <MenuButton icon={<Users />} label="Add a team" />

            <div className="space-y-1 pt-1">
              <MenuButton icon={<Activity />} label="Activity log" />
              <MenuButton icon={<Printer />} label="Print" />
              <MenuButton icon={<Megaphone />} label="What's new" />
            </div>

            {/* Upgrade */}
            <button className="flex items-center gap-2 w-full p-2 bg-[var(--button-bg)] text-[var(--primary-color)] hover:bg-[var(--button-bg-hover)] rounded transition-colors">
              <ArrowUpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Upgrade to Pro</span>
            </button>

            {/* Inferior */}
            <div className="border-t pt-2 border-[var(--border-color)]">
              <MenuButton icon={<RefreshCw />} label="Sync" />
              <MenuButton icon={<LogOut />} label="Log out" />
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-[var(--border-color)] text-xs px-2 flex items-center justify-between opacity-70">
              <span>v8127</span>
              <button className="flex items-center gap-1 hover:text-[var(--primary-color)] transition-colors">
                <BookOpenText className="w-3 h-3" />
                <span>Changelog</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Settings */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-[800px] max-w-[90%] bg-[var(--bg-color)] rounded-xl shadow-2xl p-6 relative h-[90vh] flex flex-col text-[var(--text-color)]">
            <button
              onClick={closeSettings}
              className="absolute top-4 right-4 text-[var(--text-color)]/70 hover:text-[var(--primary-color)] text-2xl font-bold"
              aria-label="Close settings"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-6">Settings</h2>
            <div className="flex-1 overflow-auto">
              <SettingsLayout />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Botón reutilizable para el menú
const MenuButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 w-full p-2 hover:bg-[var(--primary-color-hover)] rounded transition-colors"
  >
    {React.cloneElement(icon, { className: "w-4 h-4 text-[var(--text-color)]" })}
    <span className="text-sm">{label}</span>
  </button>
);

export default SidebarUserMenu;
