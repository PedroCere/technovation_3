import {
  MessageSquare, MoreVertical, SlidersHorizontal,
  List, CalendarDays, Columns, Group, SortAsc, Mail, Link, Download, FilePlus2, History, Puzzle
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ sidebarCollapsed }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/home`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="relative h-12 flex items-center justify-end pr-4 bg-white/10 backdrop-blur-sm text-black shadow-sm">
      {!sidebarCollapsed && (
        <div className="flex items-center gap-4 relative">
          {/* View Options */}
          <div className="relative">
            <button
              onClick={() => {
                setViewOpen(!viewOpen);
                setMenuOpen(false);
              }}
              className="hover:text-black"
              title="View Options"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            </button>
            {viewOpen && (
              <div className="absolute right-0 top-10 z-50 w-64 bg-white border rounded-md shadow-lg py-2 text-sm">
                <MenuItem icon={<List className="w-4 h-4" />} label="List" onClick={() => navigate('/list')} />
                <MenuItem icon={<Columns className="w-4 h-4" />} label="Board" onClick={() => navigate('/board')} />
                <MenuItem icon={<CalendarDays className="w-4 h-4" />} label="Calendar" onClick={() => navigate('/calendar')} />
                <Separator />
                <MenuItem icon={<Group className="w-4 h-4" />} label="Grouping: None (default)" />
                <MenuItem icon={<SortAsc className="w-4 h-4" />} label="Sorting: Manual (default)" />
              </div>
            )}
          </div>

          {/* Comments */}
          <button title="Comments">
            <MessageSquare className="w-4 h-4 text-gray-500" />
          </button>

          {/* More Options */}
          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setViewOpen(false);
              }}
              title="More"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-10 z-50 w-64 bg-white border rounded-md shadow-lg py-2 text-sm">
                <MenuItem icon={<FilePlus2 className="w-4 h-4" />} label="Add section" onClick={() => alert('Funcionalidad próxima')} />
                <MenuItem icon={<Link className="w-4 h-4" />} label="Copy link to Inbox" onClick={handleCopyLink} />
                {copied && (
                  <div className="text-green-600 text-xs px-4 pt-1">¡Enlace copiado!</div>
                )}
                <MenuItem icon={<Download className="w-4 h-4" />} label="Export as CSV" onClick={() => alert('Exportando CSV...')} />
                <MenuItem icon={<Mail className="w-4 h-4" />} label="Email tasks to Inbox" />
                <MenuItem icon={<CalendarDays className="w-4 h-4" />} label="Inbox calendar feed" onClick={() => navigate('/calendar')} />
                <MenuItem icon={<History className="w-4 h-4" />} label="Activity log" onClick={() => navigate('/stats')} />
                <MenuItem icon={<Puzzle className="w-4 h-4" />} label="Add extension..." />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const MenuItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
  >
    {icon}
    <span>{label}</span>
  </div>
);

const Separator = () => (
  <div className="my-1 border-t border-gray-200" />
);

export default Navbar;
