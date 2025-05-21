import {
  Layout, MessageSquare, MoreVertical, SlidersHorizontal,
  List, CalendarDays, Columns, Group, SortAsc, Mail, Link, Download, FilePlus2, History, Puzzle
} from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ onToggleSidebar, sidebarCollapsed }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative h-12 flex items-center justify-between px-4 border-b bg-white text-black shadow-sm">
      {/* Always show Layout toggle */}
      <button
        onClick={onToggleSidebar}
        className="hover:bg-gray-200 p-1 rounded"
        title="Toggle Sidebar"
      >
        <Layout className="w-5 h-5" />
      </button>

      {/* Only show the right side when the sidebar is expanded */}
      { !sidebarCollapsed && (
        <div className="flex items-center gap-4 relative">
          {/* View dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setViewOpen(!viewOpen);
                setMenuOpen(false);
              }}
              className="hover:text-black"
              title="View Options"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            {viewOpen && (
              <div className="absolute right-0 top-10 z-50 w-64 bg-white border rounded-md shadow-lg py-2 text-sm">
                <MenuItem icon={<List className="w-4 h-4" />} label="List" />
                <MenuItem icon={<Columns className="w-4 h-4" />} label="Board" />
                <MenuItem icon={<CalendarDays className="w-4 h-4" />} label="Calendar" />
                <Separator />
                <MenuItem icon={<Group className="w-4 h-4" />} label="Grouping: None (default)" />
                <MenuItem icon={<SortAsc className="w-4 h-4" />} label="Sorting: Manual (default)" />
              </div>
            )}
          </div>

          {/* Chat icon */}
          <button title="Comments">
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* More menu */}
          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setViewOpen(false);
              }}
              title="More"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-10 z-50 w-64 bg-white border rounded-md shadow-lg py-2 text-sm">
                <MenuItem icon={<FilePlus2 className="w-4 h-4" />} label="Add section" />
                <MenuItem icon={<Link className="w-4 h-4" />} label="Copy link to Inbox" />
                <MenuItem icon={<Download className="w-4 h-4" />} label="Export as CSV" />
                <MenuItem icon={<Mail className="w-4 h-4" />} label="Email tasks to Inbox" />
                <MenuItem icon={<CalendarDays className="w-4 h-4" />} label="Inbox calendar feed" />
                <MenuItem icon={<History className="w-4 h-4" />} label="Activity log" />
                <MenuItem icon={<Puzzle className="w-4 h-4" />} label="Add extension..." />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const MenuItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

const Separator = () => (
  <div className="my-1 border-t border-gray-200" />
);

export default Navbar;
