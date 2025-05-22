import React from 'react';
import { X } from 'lucide-react';

const HelpModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-6 relative">
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-red-600">
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-2xl font-semibold mb-4">Centro de Ayuda</h2>
      <p className="text-sm text-gray-700">Explicaciones breves aquí...</p>
    </div>
  </div>
);

export default HelpModal;
