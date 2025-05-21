import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PlusCircle, Search, Inbox, Calendar, CalendarClock, Tag, CheckCircle,
  ChevronDown, Users, HelpCircle, ListTodo, BarChart2, Bot,
  LayoutGrid, Bell, Layout, X, Command, Clock, Flag, Bookmark
} from 'lucide-react';
import TaskForm from '../features/tasks/taskForm';

const Sidebar = ({ collapsed, onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const searchMenuRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSearchMenu(false);
        setShowAddTaskModal(false);
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
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddTaskClick = () => {
    setShowAddTaskModal(true);
    setShowSearchMenu(false);
  };

  const menuItems = [
    { 
      name: 'Add task', 
      icon: PlusCircle, 
      count: 0, 
      path: '/tasks',
      action: handleAddTaskClick
    },
    { 
      name: 'Search', 
      icon: Search, 
      count: 0,
      action: () => setShowSearchMenu(true)
    },
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
    if (item.action) item.action();
    if (item.path) navigate(item.path);
  };

  return (
    <>
      <aside className={`${collapsed ? 'w-16 px-0' : 'w-72 px-4'} relative transition-all duration-300 h-screen flex flex-col justify-between py-4 bg-[#fefcfb] text-black font-sans text-sm`}>
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
                      {item.count > 0 && (
                        <span className="text-xs font-semibold text-gray-500">
                          {item.count}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

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

      {/* Modal Add Task */}
      {showAddTaskModal && (
        <TaskForm
          onClose={() => setShowAddTaskModal(false)}
          onSubmit={(newTask) => {
            // Here you can handle the new task submission, e.g., update global state or context
            setShowAddTaskModal(false);
          }}
        />
      )}

      {/* Modal de búsqueda */}
      {showSearchMenu && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div ref={searchMenuRef} className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <Command className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">Search or type a command...</span>
              </div>
              <button 
                onClick={() => setShowSearchMenu(false)}
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Recently Viewed */}
              <div className="p-4">
                <h4 className="text-xs text-gray-500 uppercase mb-3 font-medium">Recently viewed</h4>
                <div className="space-y-2">
                  {['Inbox', 'Today', 'Upcoming'].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="p-4">
                <h4 className="text-xs text-gray-500 uppercase mb-3 font-medium">Navigation</h4>
                <div className="space-y-2">
                  {[ 
                    'Go to home',
                    'Go to inbox',
                    'Go to Today',
                    'Go to Upcoming',
                    'Go to Films & Labels'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-sm" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700">Add a team</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <HelpCircle className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700">Help</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Sidebar;
