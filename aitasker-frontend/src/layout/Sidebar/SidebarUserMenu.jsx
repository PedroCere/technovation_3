import React, { useState, useRef, useEffect } from 'react';
import {
  Settings, Users, Activity, Printer, Megaphone,
  ArrowUpCircle, RefreshCw, LogOut, BookOpenText, User
} from 'lucide-react';
import SettingsLayout from './SettingsLayout';

const SidebarUserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const menuRef = useRef(null);

  
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
        className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg"
      >
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium">Pedro Cereghetti</p>
          <p className="text-xs text-gray-500">1/5 tasks</p>
        </div>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
       <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200">

          <div className="p-2 space-y-1">
            {/* Grupo superior */}
            <button
              onClick={openSettings}
              className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded"
              id="open-settings-button"
            >
              <Settings className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Settings</span>
            </button>
            <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Add a team</span>
            </button>

            {/* Grupo medio */}
            <div className="space-y-1 pt-1">
              <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
                <Activity className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Activity log</span>
              </button>
              <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
                <Printer className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Print</span>
              </button>
              <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
                <Megaphone className="w-4 h-4 text-gray-600" />
                <span className="text-sm">What's new</span>
              </button>
            </div>

            {/* Upgrade to Pro */}
            <button className="flex items-center gap-2 w-full p-2 hover:bg-red-50 rounded text-red-600">
              <ArrowUpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Upgrade to Pro</span>
            </button>

            {/* Grupo inferior */}
            <div className="border-t pt-2">
              <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
                <RefreshCw className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Sync</span>
              </button>
              <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
                <LogOut className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Log out</span>
              </button>
            </div>

            {/* Versión */}
            <div className="pt-2 border-t">
              <div className="flex items-center gap-1 px-2 text-xs text-gray-500">
                <span>v8127</span>
                <span className="text-gray-300">•</span>
                <button className="flex items-center gap-1 hover:text-gray-700">
                  <BookOpenText className="w-3 h-3" />
                  <span>Changelog</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-[800px] max-w-[90%] bg-white rounded-xl shadow-2xl p-6 relative h-[90vh] flex flex-col">
            <button
              onClick={closeSettings}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
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

export default SidebarUserMenu;
