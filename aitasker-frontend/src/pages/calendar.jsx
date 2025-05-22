import React, { useState } from 'react';
import { FiCalendar, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const CalendarPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, day: 'Lunes', title: 'Reunión equipo IA', priority: 'Alta' },
    { id: 2, day: 'Martes', title: 'Escribir informe de resultados', priority: 'Media' },
    { id: 3, day: 'Miércoles', title: 'Capacitación online', priority: 'Baja' },
    { id: 4, day: 'Viernes', title: 'Entrega de tareas', priority: 'Alta' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newTask, setNewTask] = useState({ day: 'Lunes', title: '', priority: 'Media' });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return 'bg-red-500 text-white';
      case 'Media': return 'bg-yellow-400 text-black';
      case 'Baja': return 'bg-green-500 text-white';
      default: return 'bg-gray-300 text-black';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      setTasks(tasks.map(task => task.id === editId ? { id: editId, ...newTask } : task));
    } else {
      const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      setTasks([...tasks, { id: nextId, ...newTask }]);
    }
    setNewTask({ day: 'Lunes', title: '', priority: 'Media' });
    setEditId(null);
    setModalOpen(false);
  };

  const openEdit = (task) => {
    setNewTask({ day: task.day, title: task.title, priority: task.priority });
    setEditId(task.id);
    setModalOpen(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FiCalendar size={28} />
          <h1 className="text-3xl font-bold">Vista de Calendario</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setNewTask({ day: 'Lunes', title: '', priority: 'Media' }); setEditId(null); setModalOpen(true); }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm shadow"
          >
            ➕ Añadir tarea
          </button>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow"
          >
            ⬅ Volver al Home
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {days.map((day) => (
          <div key={day} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3 text-center">{day}</h3>
            {tasks.filter(task => task.day === day).length > 0 ? (
              tasks.filter(task => task.day === day).map((task) => (
                <div
                  key={task.id}
                  className={`p-2 rounded-md text-sm font-medium mb-2 flex items-center justify-between ${getPriorityColor(task.priority)}`}
                >
                  <span>{task.title}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(task)} className="text-white hover:text-blue-200">
                      <FiEdit2 size={16} />
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="text-white hover:text-red-200">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Sin tareas</p>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">{editId !== null ? 'Editar tarea' : 'Nueva tarea en el calendario'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Día</label>
                  <select
                    value={newTask.day}
                    onChange={(e) => setNewTask({ ...newTask, day: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Título</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Prioridad</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => { setModalOpen(false); setEditId(null); }}
                    className="text-gray-500 hover:underline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
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

export default CalendarPage;
