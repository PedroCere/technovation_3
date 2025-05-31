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
        return <div className="text-[var(--text-color)]">Select a section</div>;
    }
  };

  return (
    <div className="flex flex-1 min-h-0 text-[var(--text-color)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[var(--bg-color)] border-r border-[var(--border-color)] p-4 overflow-y-auto flex-shrink-0">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 mb-4 text-sm rounded bg-[var(--input-bg)] text-[var(--text-color)] border border-[var(--input-border)] placeholder-opacity-70"
        />
        <ul className="space-y-1">
          {sections.map((s) => (
            <li
              key={s.key}
              className={`p-2 cursor-pointer rounded transition-colors ${
                activeSection === s.key
                  ? 'bg-[var(--primary-color)] text-white font-medium'
                  : 'hover:bg-[var(--button-bg-hover)]'
              }`}
              onClick={() => setActiveSection(s.key)}
            >
              {s.label}
            </li>
          ))}
        </ul>
        <button className="mt-4 text-sm text-[var(--text-color)]/70 hover:text-[var(--primary-color)] flex items-center gap-1 transition-colors">
          <span>＋</span> Add team
        </button>
      </div>

      {/* Panel de contenido */}
      <div className="flex-1 overflow-y-auto bg-[var(--bg-color)] p-6 border-l border-[var(--border-color)] min-h-0">
        {renderPanel()}
      </div>
    </div>
  );
};

export default SettingsLayout;
