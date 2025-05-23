import React, { useState } from 'react';
import AccountPanel from './panels/AccountPanel';
import QuickAddPanel from './panels/QuickAddPanel';
import NotificationsPanel from './panels/NotificationsPanel';
import RemindersPanel from './panels/RemindersPanel';
import ProductivityPanel from './panels/ProductivityPanel';
import SubscriptionPanel from './panels/SubscriptionPanel';
import CalendarsPanel from './panels/CalendarsPanel';
import GeneralPanel from './panels/GeneralPanel';
import AdvancedPanel from './panels/AdvancedPanel';
import ThemePanel from './panels/ThemePanel';
import FavouritesPanel from './panels/FavouritesPanel';
import SidebarPanel from './panels/SidebarPanel';

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
  { key: 'favourites', label: 'Favourites' },
  { key: 'integrations', label: 'Integrations' },
  { key: 'calendars', label: 'Calendars' },
];

const SettingsLayout = () => {
  const [activeSection, setActiveSection] = useState('account');

  const renderPanel = () => {
    switch (activeSection) {
      case 'account':
        return <AccountPanel />;
      case 'quick-add':
        return <QuickAddPanel />;
      case 'notifications':
        return <NotificationsPanel />;
      case 'reminders':
        return <RemindersPanel />;
      case 'productivity':
        return <ProductivityPanel />;
      case 'subscription':
        return <SubscriptionPanel />;
      case 'calendars':
        return <CalendarsPanel />;
      case 'general':
        return <GeneralPanel />;
      case 'advanced':
        return <AdvancedPanel />;
      case 'theme':
        return <ThemePanel />;
      case 'favourites':
        return <FavouritesPanel />;
      case 'sidebar':
        return <SidebarPanel />;
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
