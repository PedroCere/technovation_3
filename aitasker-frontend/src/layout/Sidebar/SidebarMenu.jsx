import React from 'react';
import {
  PlusCircle, Search, Inbox, Calendar, CalendarClock, Tag, CheckCircle,
  ListTodo, LayoutGrid, BarChart2, Bot
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Brain } from 'lucide-react';

const menuItems = [
  { name: 'Add task', icon: PlusCircle, path: '/tasks' },
  { name: 'Search', icon: Search },
  { name: 'Inbox', icon: Inbox, path: '/inbox' },
  { name: 'Today', icon: Calendar, path: '/today' },
  { name: 'Upcoming', icon: CalendarClock, path: '/upcoming' },
  { name: 'Filters & Labels', icon: Tag, path: '/filters' },
  { name: 'Completed', icon: CheckCircle, path: '/completed' },
  // Removed 'Mis Cosas' menu item as per user request
  { name: 'Tasks', icon: ListTodo, path: '/tasks' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
  { name: 'Planner', icon: LayoutGrid, path: '/planner' },
  { name: 'Stats', icon: BarChart2, path: '/stats' },
  { name: 'Assistant', icon: Bot, path: '/assistant' },
];

const SidebarMenu = ({ setShowAddTaskModal, setShowSearchMenu, primaryColor = 'var(--primary-color)' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item) => {
    if (item.name === 'Add task') {
      setShowAddTaskModal(true);
      return;
    }
    if (item.name === 'Search') {
      setShowSearchMenu(true);
      return;
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <ul className="space-y-1 px-2 text-[var(--text-color)]">
      {menuItems.map((item, i) => {
        const Icon = item.icon;
        const active = location.pathname === item.path;

        return (
          <li
            key={i}
            onClick={() => handleClick(item)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-[${primaryColor}33] ${
              active ? 'bg-[var(--primary-color)33] text-[var(--primary-color)]' : 'text-[var(--text-color)]'
            }`}
          >
            <Icon
              className="w-4 h-4"
              style={{ color: active || item.name === 'Add task' ? primaryColor : 'var(--text-color)' }}
            />
            <span className="text-sm" style={{ color: active ? primaryColor : 'var(--text-color)' }}>
              {item.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarMenu;
