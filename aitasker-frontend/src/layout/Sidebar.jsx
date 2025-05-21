import { useState } from "react";
import { PlusCircle, Search, Inbox, Calendar, CalendarClock, Tag, CheckCircle, ChevronDown, Users, HelpCircle, Sun, Moon } from "lucide-react";

const Sidebar = () => {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const menuItems = [
    { name: "Add task", icon: <PlusCircle className="text-red-500" />, count: null },
    { name: "Search", icon: <Search />, count: null },
    { name: "Inbox", icon: <Inbox />, count: 3, highlight: true },
    { name: "Today", icon: <Calendar />, count: 1 },
    { name: "Upcoming", icon: <CalendarClock />, count: null },
    { name: "Filters & Labels", icon: <Tag />, count: null },
    { name: "Completed", icon: <CheckCircle />, count: null },
  ];

  const projectItems = [
    { name: "Mis Cosas 🧠", count: 5 },
  ];

  return (
    <aside className={`w-72 h-screen flex flex-col justify-between px-4 py-4 ${isDark ? "bg-[#1c212c] text-white" : "bg-[#fefcfb] text-black"} font-sans`}>
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full" />
            <span className="font-medium">Pedro</span>
          </div>
          <div className="flex gap-2">
            <button className="hover:opacity-70"><BellIcon /></button>
            <button className="hover:opacity-70"><MenuIcon /></button>
          </div>
        </div>

        {/* Menu Items */}
        <ul className="space-y-1">
          {menuItems.map((item, i) => (
            <li key={i} className={`flex justify-between items-center px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-200 ${item.highlight ? "bg-red-100 text-red-700" : ""}`}>
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.count !== null && (
                <span className="text-xs font-semibold text-gray-500">{item.count}</span>
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
              <li key={i} className="flex justify-between items-center px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-sm">#</span>
                  <span>{proj.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">{proj.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">
        <button className="flex items-center gap-2 text-sm hover:text-gray-700">
          <Users className="w-4 h-4" />
          Add a team
        </button>
        <button className="flex items-center gap-2 text-sm hover:text-gray-700">
          <HelpCircle className="w-4 h-4" />
          Help
        </button>
        <button
          onClick={toggleTheme}
          className="self-center mt-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition"
        >
          {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
          <span className="sr-only">Toggle Theme</span>
        </button>
      </div>
    </aside>
  );
};

const BellIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" fill="currentColor"/><path fillRule="evenodd" clipRule="evenodd" d="M18 16V11C18 7.68629 16.2614 4.87973 13.5 4.18462V4C13.5 3.17157 12.8284 2.5 12 2.5C11.1716 2.5 10.5 3.17157 10.5 4V4.18462C7.73858 4.87973 6 7.68629 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/></svg>;
const MenuIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export default Sidebar;
