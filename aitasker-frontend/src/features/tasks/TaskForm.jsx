// features/tasks/TaskForm.jsx
import { useState } from 'react';
import { AiOutlineCalendar, AiOutlineFlag, AiOutlineClockCircle } from 'react-icons/ai';

const TaskForm = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    label: ''
  });

  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">New Task</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <input
            type="text"
            placeholder="Título de la tarea"
          className="w-full p-2 mb-4 border-b-2 border-gray-200 focus:border-red-500 outline-none bg-white text-black"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />

          <div className="flex gap-2 mb-4">
            <button
              type="button"
              className="task-form-button bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-red-500 rounded-md px-3 py-1 flex items-center gap-1"
            >
              <AiOutlineCalendar className="mr-1" /> Date
            </button>
            <button
              type="button"
              className="task-form-button bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-red-500 rounded-md px-3 py-1 flex items-center gap-1"
            >
              <AiOutlineFlag className="mr-1" /> Priority
            </button>
            <button
              type="button"
              className="task-form-button bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-red-500 rounded-md px-3 py-1 flex items-center gap-1"
            >
              <AiOutlineClockCircle className="mr-1" /> Reminder
            </button>
          </div>

          <textarea
            placeholder="Descripción..."
          className="w-full p-2 mb-4 border rounded-lg h-32 bg-white text-black"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className="text-red-500 hover:text-red-600 flex items-center"
            >
              {showAISuggestions ? 'Hide' : 'Show'} IA suggestions
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Create Task
              </button>
            </div>
          </div>

          {showAISuggestions && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              {/* Integración con API de IA aquí */}
              <p className="text-sm text-gray-600">Sugerencias de IA...</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TaskForm;