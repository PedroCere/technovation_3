import React from 'react';
import { Command, X } from 'lucide-react';

const SearchModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <Command className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-500">Search or type a command...</span>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="divide-y divide-gray-100 p-4 text-sm text-gray-700">
        <div>Recently viewed: Inbox, Today, Upcoming</div>
      </div>
    </div>
  </div>
);

export default SearchModal;
