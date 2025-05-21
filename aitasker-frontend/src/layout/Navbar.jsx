import { Layout, MessageSquare, MoreVertical, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ onToggleSidebar }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative h-12 flex items-center justify-between px-4 border-b bg-white text-black shadow-sm">
      {/* Left: Collapse sidebar */}
      <button
        onClick={onToggleSidebar}
        className="hover:bg-gray-200 p-1 rounded"
        title="Toggle Sidebar"
      >
        <Layout className="w-5 h-5" />
      </button>

      {/* Right: View, Chat, More */}
      <div className="flex items-center gap-4 relative">
        {/* View dropdown */}
        <div className="relative">
          <button
            onClick={() => setViewOpen(!viewOpen)}
            className="hover:text-black"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="sr-only">View</span>
          </button>
          {viewOpen && (
            <div className="absolute right-0 top-10 z-50 w-56 bg-white border rounded-md shadow-lg p-2 text-sm">
              <div className="font-semibold text-xs px-2 py-1 text-gray-600">View</div>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">List</button>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Board</button>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Calendar</button>
              <div className="font-semibold text-xs px-2 py-2 text-gray-600">Sort</div>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Grouping</button>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Sorting</button>
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
            onClick={() => setMenuOpen(!menuOpen)}
            className="hover:text-black"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-10 z-50 w-60 bg-white border rounded-md shadow-lg p-2 text-sm">
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Add section</button>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Copy link to Inbox</button>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Export as CSV</button>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Email tasks to Inbox</button>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Inbox calendar feed</button>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Activity log</button>
              <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Add extension...</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
