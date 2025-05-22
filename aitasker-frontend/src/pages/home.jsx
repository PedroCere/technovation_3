import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Preparar presentación para reunión', priority: 'Alta', suggestedTime: '09:00 - 10:30' },
    { id: 2, title: 'Revisar correos urgentes', priority: 'Media', suggestedTime: '11:00 - 11:20' },
    { id: 3, title: 'Actualizar documentación del proyecto', priority: 'Baja', suggestedTime: '16:00 - 17:00' },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({ title: '', priority: 'Media', time: '' });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return darkMode ? 'border-red-500 text-red-400' : 'border-red-400 text-red-500';
      case 'Media': return darkMode ? 'border-yellow-500 text-yellow-400' : 'border-yellow-400 text-yellow-500';
      case 'Baja': return darkMode ? 'border-green-500 text-green-400' : 'border-green-400 text-green-500';
      default: return darkMode ? 'border-gray-500 text-gray-300' : 'border-gray-400 text-gray-500';
    }
  };

  const openModal = (task = null) => {
    if (task) {
      setForm({ title: task.title, priority: task.priority, time: task.suggestedTime });
      setEditId(task.id);
    } else {
      setForm({ title: '', priority: 'Media', time: '' });
      setEditId(null);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setForm({ title: '', priority: 'Media', time: '' });
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      setTasks(tasks.map(task => task.id === editId ? { ...task, ...form, suggestedTime: form.time } : task));
    } else {
      const newTask = { id: tasks.length + 1, title: form.title, priority: form.priority, suggestedTime: form.time };
      setTasks([...tasks, newTask]);
    }
    closeModal();
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const themeClasses = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800';
  const cardClasses = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${themeClasses} px-6 py-10 space-y-10 font-sans`}>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Bienvenido a tu día organizado por IA</h1>
          <p className={`${textSecondary} mt-1`}>Gestioná tus tareas de forma eficiente y simple</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-md shadow text-sm">
            {darkMode ? '☀️ Modo claro' : '🌙 Modo oscuro'}
          </button>
          <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md shadow text-sm">
            ➕ Añadir tarea
          </button>
          <button onClick={() => navigate('/calendar')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md shadow text-sm">
            📅 Ver calendario
          </button>
          <button onClick={() => navigate('/stats')} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-md shadow text-sm">
            📊 Ver estadísticas
          </button>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">📌 Tareas del Día</h2>
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task.id} className={`${cardClasses} p-4 rounded-xl shadow border-l-4 ${getPriorityColor(task.priority)} transition-transform hover:scale-[1.01]`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{task.title}</h3>
                  <p className={`text-sm ${textSecondary}`}>{task.suggestedTime}</p>
                  <p className={`text-sm mt-1 ${getPriorityColor(task.priority)}`}>Prioridad: {task.priority}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal(task)} className="text-blue-400 hover:text-blue-600">
                    <FiEdit2 size={18} />
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">🧠 Recomendaciones de IA</h2>
        <div className={`${cardClasses} p-5 rounded-xl border text-sm ${textSecondary}`}>
          La IA recomienda abordar las tareas de alta prioridad en las primeras horas. Considerá una pausa breve a mitad del día y reservá bloques para tareas creativas a la tarde.
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">📊 Estadísticas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`${cardClasses} p-5 rounded-xl text-center border`}>
            <p className={`text-sm ${textSecondary} mb-1`}>Tareas completadas</p>
            <p className="text-2xl font-bold text-green-500">8</p>
          </div>
          <div className={`${cardClasses} p-5 rounded-xl text-center border`}>
            <p className={`text-sm ${textSecondary} mb-1`}>Horas productivas</p>
            <p className="text-2xl font-bold text-blue-500">6h</p>
          </div>
          <div className={`${cardClasses} p-5 rounded-xl text-center border`}>
            <p className={`text-sm ${textSecondary} mb-1`}>Tareas IA generadas</p>
            <p className="text-2xl font-bold text-purple-500">3</p>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`rounded-xl p-6 w-full max-w-md border shadow-xl ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">{editId !== null ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Título</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-500' : 'bg-gray-100 text-gray-800 border-gray-300'} border`}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Prioridad</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-500' : 'bg-gray-100 text-gray-800 border-gray-300'} border`}
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Horario sugerido</label>
                  <input
                    type="text"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    placeholder="Ej: 14:00 - 15:00"
                    className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-500' : 'bg-gray-100 text-gray-800 border-gray-300'} border`}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={closeModal} className="text-gray-500 hover:underline">
                    Cancelar
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
