import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PlusCircle, Search, Inbox, Calendar, CalendarClock, Tag, CheckCircle,
  ChevronDown, Users, HelpCircle, ListTodo, BarChart2, Bot,
  LayoutGrid, Bell, Layout
} from 'lucide-react';

const Sidebar = ({ collapsed, onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Add task', icon: PlusCircle, count: 0, path: '/tasks' },
    { name: 'Search', icon: Search, count: 0, path: '/search' },
    { name: 'Inbox', icon: Inbox, count: 3, path: '/' },
    { name: 'Today', icon: Calendar, count: 3, path: '/today' },
    { name: 'Upcoming', icon: CalendarClock, count: 0, path: '/upcoming' },
    { name: 'Filters & Labels', icon: Tag, count: 0, path: '/filters' },
    { name: 'Completed', icon: CheckCircle, count: 0, path: '/completed' },
    { name: 'Tasks', icon: ListTodo, count: 0, path: '/tasks' },
    { name: 'Calendar', icon: Calendar, count: 0, path: '/calendar' },
    { name: 'Planner', icon: LayoutGrid, count: 0, path: '/planner' },
    { name: 'Stats', icon: BarChart2, count: 0, path: '/stats' },
    { name: 'Assistant', icon: Bot, count: 0, path: '/assistant' },
  ];

  const projectItems = [{ name: 'Mis Cosas 🧠', count: 5 }];

  const handleMenuItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className={`${collapsed ? 'w-16 px-0' : 'w-72 px-4'} transition-all duration-300 h-screen flex flex-col justify-between py-4 bg-[#fefcfb] text-black font-sans text-sm`}>
      <div>
        <div className={`flex items-center justify-between ${collapsed ? 'px-2' : 'mb-6'}`}>
          {!collapsed ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full" />
                <span className="font-medium text-sm">Pedro</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-500" />
                <button
                  onClick={onToggleSidebar}
                  className="p-1 rounded hover:bg-red-200 transition"
                  title="Collapse Sidebar"
                >
                  <Layout className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={onToggleSidebar}
              className="p-1 rounded hover:bg-red-200 transition ml-2"
              title="Expand Sidebar"
            >
              <Layout className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {!collapsed && (
          <>
            <ul className="space-y-1">
              {menuItems.map((item, i) => {
                const Icon = item.icon;
                const isActive = item.path === location.pathname;
                return (
                  <li
                    key={i}
                    onClick={() => handleMenuItemClick(item)}
                    className={`flex justify-between items-center px-2 py-1.5 rounded-md cursor-pointer hover:bg-red-100 ${
                      isActive ? 'bg-red-100 text-red-700' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <Icon className={isActive ? 'text-red-500 w-4 h-4' : 'text-gray-500 w-4 h-4'} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    {item.count !== null && item.count !== undefined && item.count > 0 && (
                      <span className="text-xs font-semibold text-gray-500">
                        {item.count}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Projects */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-gray-500 uppercase font-semibold mb-2">
                <span>My Projects</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
              <ul>
                {projectItems.map((proj, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center px-2 py-1.5 rounded-md hover:bg-red-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">#</span>
                      <span className="text-sm">{proj.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                      {proj.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {!collapsed && (
        <div className="flex flex-col gap-4 mt-6">
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
            <Users className="w-4 h-4" />
            Add a team
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
            <HelpCircle className="w-4 h-4" />
            Help
          </button>
        </div>
      )}
    </aside>
  );
};
 export default Sidebar;


