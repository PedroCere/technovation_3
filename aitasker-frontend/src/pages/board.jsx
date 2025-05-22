import React, { useState } from 'react';
import { Columns } from 'lucide-react';
import { FiTrash2, FiArrowRight, FiArrowLeft, FiPlus } from 'react-icons/fi';

const initialTasks = [
  { id: 1, title: 'Idear propuesta para cliente', status: 'pendiente' },
  { id: 2, title: 'Diseñar interfaz', status: 'en-progreso' },
  { id: 3, title: 'Entregar informe final', status: 'completado' },
  { id: 4, title: 'Enviar correo de seguimiento', status: 'pendiente' },
];

const BoardPage = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const moveTask = (id, direction) => {
    setTasks(tasks.map(task => {
      if (task.id !== id) return task;
      const order = ['pendiente', 'en-progreso', 'completado'];
      const index = order.indexOf(task.status);
      const newIndex = direction === 'next' ? index + 1 : index - 1;
      if (newIndex >= 0 && newIndex < order.length) {
        return { ...task, status: order[newIndex] };
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      setTasks([...tasks, { id: nextId, title: newTask.trim(), status: 'pendiente' }]);
      setNewTask('');
    }
  };

  const columns = {
    'pendiente': 'Pendiente',
    'en-progreso': 'En Progreso',
    'completado': 'Completado'
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] text-[#2d3436] p-8 font-sans">
      <div className="flex items-center gap-3 mb-6">
        <Columns size={28} />
        <h1 className="text-3xl font-bold">Vista de Tablero</h1>
      </div>

      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-2 rounded-md border border-gray-300 bg-white text-[#2d3436] shadow-sm hover:border-red-400 focus:border-red-500 focus:ring-red-500"
        />
        <button
          onClick={addTask}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FiPlus /> Agregar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([key, label]) => (
          <div key={key} className="bg-white border border-gray-200 rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">{label}</h2>
            {tasks.filter(task => task.status === key).map(task => (
              <div key={task.id} className="flex items-center justify-between bg-gray-50 text-sm p-3 mb-2 rounded-lg border border-gray-200 hover:border-red-400 transition">
                <span>{task.title}</span>
                <div className="flex gap-2">
                  {key !== 'pendiente' && (
                    <button onClick={() => moveTask(task.id, 'prev')} className="text-gray-500 hover:text-red-600">
                      <FiArrowLeft size={16} />
                    </button>
                  )}
                  {key !== 'completado' && (
                    <button onClick={() => moveTask(task.id, 'next')} className="text-gray-500 hover:text-red-600">
                      <FiArrowRight size={16} />
                    </button>
                  )}
                  <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
