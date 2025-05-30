import React, { useState } from 'react';
import { Command, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext'; 

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
  const { theme } = useTheme();

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border"
        style={{
          backgroundColor: 'var(--bg-color)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div 
          className="p-4 border-b flex items-center justify-between"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--button-bg)'
          }}
        >
          <div className="flex items-center gap-2">
            <Command 
              className="w-5 h-5" 
              style={{ color: 'var(--text-color)' }} 
            />
            <input
              type="text"
              autoFocus
              placeholder="Search or type a command..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none text-sm placeholder-gray-400"
              style={{
                color: 'var(--text-color)',
                placeholderColor: 'var(--text-color)'
              }}
            />
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
            style={{
              backgroundColor: theme === 'dark' ? 'var(--button-bg-hover)' : 'transparent',
              color: 'var(--text-color)'
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div 
          className="divide-y max-h-60 overflow-y-auto p-2 text-sm"
          style={{
            color: 'var(--text-color)',
            divideColor: 'var(--border-color)'
          }}
        >
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <div
                key={page.path}
                onClick={() => handleSelect(page.path)}
                className="cursor-pointer px-3 py-2 rounded"
                style={{
                  '--hover-bg': theme === 'dark' ? 'var(--button-bg-hover)' : 'var(--button-bg)',
                  '&:hover': {
                    backgroundColor: 'var(--hover-bg)'
                  }
                }}
              >
                {page.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-2" style={{ color: 'var(--text-color)' }}>
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;