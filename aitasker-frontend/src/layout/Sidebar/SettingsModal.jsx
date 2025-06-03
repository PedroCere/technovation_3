import React from 'react';
import SettingsLayout from './SettingsLayout';

const SettingsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-[800px] max-w-[90%] bg-[var(--bg-color)] rounded-xl shadow-2xl relative h-[90vh] flex flex-col text-[var(--text-color)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-color)]/70 hover:text-[var(--primary-color)] text-2xl font-bold"
          aria-label="Close settings"
        >
          &times;
        </button>

        <div className="flex-1 min-h-0 flex">
          <SettingsLayout />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
