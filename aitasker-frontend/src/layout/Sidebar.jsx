import {
  PlusCircle, Search, Inbox, Calendar, CalendarClock, Tag, CheckCircle,
  ChevronDown, Users, HelpCircle, Sun, Moon, ListTodo, BarChart2, Bot,
  LayoutGrid, Bell
} from 'lucide-react';

const Sidebar = ({ collapsed }) => {
  const menuItems = [
    { name: 'Add task', icon: <PlusCircle className="text-red-500" /> },
    { name: 'Search', icon: <Search /> },
    { name: 'Inbox', icon: <Inbox />, count: 3, highlight: true },
    { name: 'Today', icon: <Calendar />, count: 3 },
    { name: 'Upcoming', icon: <CalendarClock /> },
    { name: 'Filters & Labels', icon: <Tag /> },
    { name: 'Completed', icon: <CheckCircle /> },
    { name: 'Tasks', icon: <ListTodo /> },
    { name: 'Calendar', icon: <Calendar /> },
    { name: 'Planner', icon: <LayoutGrid /> },
    { name: 'Stats', icon: <BarChart2 /> },
    { name: 'Assistant', icon: <Bot /> },
  ];

  const projectItems = [{ name: 'Mis Cosas 🧠', count: 5 }];

  return (
    <aside
      className={`${collapsed ? 'w-16' : 'w-72'} transition-all duration-300 h-screen flex flex-col justify-between px-4 py-4 bg-[#fefcfb] text-black font-sans`}
    >
      <div>
        {/* Only show user info when expanded */}
        {!collapsed && (
          <div className="flex items-center justify-between mb-6">
            <div className="w-6 h-6 bg-yellow-400 rounded-full" />
            <span className="font-medium">Pedro</span>
            <Bell className="w-5 h-5" />
          </div>
        )}

        {!collapsed && (
          <>
            <ul className="space-y-1">
              {menuItems.map((item, i) => (
                <li
                  key={i}
                  className={`flex justify-between items-center px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-200 ${
                    item.highlight ? 'bg-red-100 text-red-700' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {item.count !== null && item.count !== undefined && (
                    <span className="text-xs font-semibold text-gray-500">
                      {item.count}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* Projects */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-gray-500 uppercase font-semibold mb-2">
                <span>My Projects</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <ul>
                {projectItems.map((proj, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">#</span>
                      <span>{proj.name}</span>
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
          <button className="flex items-center gap-2 text-sm hover:text-gray-700">
            <Users className="w-4 h-4" />
            Add a team
          </button>
          <button className="flex items-center gap-2 text-sm hover:text-gray-700">
            <HelpCircle className="w-4 h-4" />
            Help
          </button>
          <button className="self-center mt-2 p-2 rounded-full hover:bg-gray-200 transition">
            <Moon className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
