import { useState } from 'react';
import {
  AiOutlineCalendar,
  AiOutlineFlag,
  AiOutlineClockCircle
} from 'react-icons/ai';

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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--bg-color)] rounded-xl w-full max-w-2xl p-6 text-[var(--text-color)] shadow-lg transition-colors">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Nueva Tarea</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-[var(--text-color)]/70 hover:text-[var(--text-color)] text-lg"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          {/* Title input */}
          <input
            type="text"
            placeholder="Título de la tarea"
            className="w-full p-2 mb-4 border-b-2 border-[var(--border-color)] focus:border-black-500 outline-none bg-transparent text-[var(--text-color)] placeholder-opacity-70"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          {/* Action buttons */}
          <div className="flex gap-2 mb-6">
            <ButtonIcon icon={<AiOutlineCalendar />} label="Date" />
            <ButtonIcon icon={<AiOutlineFlag />} label="Priority" />
            <ButtonIcon icon={<AiOutlineClockCircle />} label="Reminder" />
          </div>

          {/* Description */}
          <textarea
            placeholder="Descripción..."
            className="w-full p-3 mb-6 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] placeholder-opacity-70 h-32 resize-none"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* Bottom controls */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className="bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] text-[var(--button-text)] border border-[var(--button-border)] rounded px-4 py-2"
            >
              {showAISuggestions ? 'Ocultar' : 'Mostrar'} sugerencias de IA
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[var(--text-color)]/70 hover:bg-[var(--border-color)] rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] text-[var(--button-text)] border border-[var(--button-border)] rounded px-4 py-2"
              >
                Crear Tarea
              </button>
            </div>
          </div>

          {/* AI Suggestions */}
          {showAISuggestions && (
            <div className="mt-6 p-4 bg-[var(--border-color)] rounded-lg text-sm text-[var(--text-color)]/70">
              {/* Aquí puedes integrar tu motor de IA o un llamado a API */}
              <p>Sugerencias generadas por IA aparecerán aquí.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Botón reutilizable con ícono
const ButtonIcon = ({ icon, label }) => (
  <button
    type="button"
    className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[var(--border-color)] text-[var(--text-color)] hover:ring-2 hover:ring-red-500 transition-colors"
  >
    {icon}
    {label}
  </button>
);

export default TaskForm;
