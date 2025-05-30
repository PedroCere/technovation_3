import React, { useState } from 'react';
import { Command, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const pages = [
  { name: 'Assistant', path: '/assistant' },
  { name: 'Board', path: '/board' },
  { name: 'Calendar', path: '/calendar' },
  { name: 'Completed', path: '/completed' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Filters & Labels', path: '/filters' },
  { name: 'Home', path: '/home' },
  { name: 'Inbox', path: '/inbox' },
  { name: 'Landing', path: '/' },
  { name: 'List', path: '/list' },
  { name: 'Login', path: '/login' },
  { name: 'My Things', path: '/mythings' },
  { name: 'Planner', path: '/planner' },
  { name: 'Register', path: '/register' },
  { name: 'Settings', path: '/settings' },
  { name: 'Stats', path: '/stats' },
  { name: 'Tasks', path: '/tasks' },
  { name: 'Today', path: '/today' },
  { name: 'Upcoming', path: '/upcoming' },
];

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              autoFocus
              placeholder="Search or type a command..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto p-2 text-sm text-gray-700">
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <div
                key={page.path}
                onClick={() => handleSelect(page.path)}
                className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100"
              >
                {page.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
