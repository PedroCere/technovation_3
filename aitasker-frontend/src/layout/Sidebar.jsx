import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PlusCircle, Search, Inbox, Calendar, CalendarClock, Tag, CheckCircle,
  ChevronDown, Users, HelpCircle, ListTodo, BarChart2, Bot,
  LayoutGrid, Bell, Layout, X, Command,
  Settings, Activity, Printer, Megaphone,
  ArrowUpCircle, RefreshCw, LogOut, BookOpenText, User
} from 'lucide-react';
import TaskForm from '../features/tasks/TaskForm';

const Sidebar = ({ collapsed, onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchMenuRef = useRef(null);
  const modalRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSearchMenu(false);
        setShowAddTaskModal(false);
        setShowHelp(false);
        setIsUserMenuOpen(false);
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
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
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
    { name: 'Add task', icon: PlusCircle, path: '/tasks', action: handleAddTaskClick },
    { name: 'Search', icon: Search, action: () => setShowSearchMenu(true) },
    { name: 'Inbox', icon: Inbox, path: '/inbox' },
    { name: 'Today', icon: Calendar, path: '/today' },
    { name: 'Upcoming', icon: CalendarClock, path: '/upcoming' },
    { name: 'Filters & Labels', icon: Tag, path: '/filters' },
    { name: 'Completed', icon: CheckCircle, path: '/completed' },
    { name: 'Tasks', icon: ListTodo, path: '/tasks' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Planner', icon: LayoutGrid, path: '/planner' },
    { name: 'Stats', icon: BarChart2, path: '/stats' },
    { name: 'Assistant', icon: Bot, path: '/assistant' },
  ];

  const projectItems = [{ name: 'Mis Cosas 🧠', count: 5 }];

  const userMenuItems = [
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Add a team', icon: Users, path: '/team' },
    { name: 'Activity log', icon: Activity, path: '/activity' },
    { name: 'Print', icon: Printer, path: '/print' },
    { name: "What's new", icon: Megaphone, path: '/news' },
    { name: 'Upgrade to Pro', icon: ArrowUpCircle, path: '/pro', color: 'text-red-600' },
    { name: 'Sync', icon: RefreshCw, path: '/sync' },
    { name: 'Log out', icon: LogOut, path: '/logout' },
    { name: 'Help', icon: HelpCircle, action: () => setShowHelp(true) },
  ];

  const handleMenuItemClick = (item) => {
    if (item.action) item.action();
    if (item.path) navigate(item.path);
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <aside className={`${collapsed ? 'w-16 px-0' : 'w-72 px-4'} relative transition-all duration-300 h-screen flex flex-col justify-between py-4 bg-[#fefcfb] text-black font-sans text-sm`}>
        <div>
          <div className={`flex items-center justify-between ${collapsed ? 'px-2' : 'mb-6'}`}>
            {!collapsed ? (
              <>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 group relative"
                  ref={userMenuRef}
                >
                  <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-sm">Pedro Cereghetti</span>
                    <span className="text-xs text-gray-500">0/5 tasks</span>
                  </div>
                  {isUserMenuOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl mt-2 py-2 z-50 border border-gray-100">
                      {userMenuItems.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleMenuItemClick(item)}
                          className={`flex items-center gap-3 w-full px-4 py-2 text-sm ${
                            item.color ? item.color : 'text-gray-700'
                          } hover:bg-red-50 transition-colors`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </button>
                      ))}
                      <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <span>v8127</span>
                          <span className="text-gray-300">•</span>
                          <button className="hover:text-gray-800 flex items-center gap-1">
                            <BookOpenText className="w-3 h-3" />
                            Changelog
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-500 cursor-pointer" />
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
                  const isAddTask = item.name === 'Add task';
                  return (
                    <li
                      key={i}
                      onClick={() => handleMenuItemClick(item)}
                      className={`flex justify-between items-center px-2 py-1.5 rounded-md cursor-pointer hover:bg-red-100 ${
                        isActive ? 'bg-red-100 text-red-700' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <Icon className={`${isAddTask ? 'text-red-600' : isActive ? 'text-red-500' : 'text-gray-500'} w-4 h-4`} />
                        <span className={`${isAddTask ? 'text-red-600 font-semibold' : ''} text-sm`}>{item.name}</span>
                      </div>
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
                      <span className="text-xs font-semibold text-gray-500">{proj.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {!collapsed && (
          <div className="flex flex-col gap-4 mt-6 border-t border-gray-200 pt-4">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                <LogOut className="w-4 h-4"  />
                Log Out  
              </button>
            </div>
        )}
      </aside>

      {/* Search Modal */}
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
              <div className="p-4">
                <h4 className="text-xs text-gray-500 uppercase mb-3 font-medium">Recently viewed</h4>
                <div className="space-y-2">
                  {['Inbox', 'Today', 'Upcoming'].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
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
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-6 relative">
            <button onClick={() => setShowHelp(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Centro de Ayuda</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold">❓ Preguntas Frecuentes</h3>
                <ul className="list-disc ml-5">
                  <li>¿Cómo agrego una tarea?</li>
                  <li>¿Cómo activo el modo oscuro?</li>
                  <li>¿Cómo funciona la IA asistente?</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">📘 Guía Rápida</h3>
                <p>Usá la barra lateral para navegar entre secciones. Podés priorizar tareas, moverlas entre columnas o usar IA para sugerencias.</p>
              </div>
              <div>
                <h3 className="font-semibold">📞 Contacto de Soporte</h3>
                <p>¿Tenés algún problema? Escribinos a <code>soporte@aitasker.com</code></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
