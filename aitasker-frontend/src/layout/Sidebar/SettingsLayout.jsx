import React, { useState } from 'react';
import AccountPanel from './panels/AccountPanel';


const sections = [
  { key: 'account', label: 'Account' },
  { key: 'general', label: 'General' },
  { key: 'advanced', label: 'Advanced' },
  { key: 'subscription', label: 'Subscription' },
  { key: 'theme', label: 'Theme' },
  { key: 'sidebar', label: 'Sidebar' },
  { key: 'quick-add', label: 'Quick Add' },
  { key: 'productivity', label: 'Productivity' },
  { key: 'reminders', label: 'Reminders' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'backups', label: 'Backups' },
  { key: 'integrations', label: 'Integrations' },
  { key: 'calendars', label: 'Calendars' },
];

const SettingsLayout = () => {
  const [activeSection, setActiveSection] = useState('account');

  const renderPanel = () => {
    switch (activeSection) {
      case 'account':
        return <AccountPanel />;
      
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 mb-4 text-sm border rounded bg-gray-100"
        />
        <ul className="space-y-1">
          {sections.map((s) => (
            <li
              key={s.key}
              className={`p-2 cursor-pointer rounded ${
                activeSection === s.key ? 'bg-red-100 text-red-600 font-medium' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection(s.key)}
            >
              {s.label}
            </li>
          ))}
        </ul>
        <button className="mt-4 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          <span>＋</span> Add team
        </button>
      </div>

      {/* Panel de contenido */}
      <div className="flex-1 bg-gray-50 p-8 overflow-auto">{renderPanel()}</div>
    </div>
  );
};

export default SettingsLayout;
