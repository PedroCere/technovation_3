import React, { useState } from 'react';
import { FiList, FiCheck, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const ListPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Organizar reunión con el equipo', completed: false },
    { id: 2, title: 'Enviar reporte mensual', completed: true },
    { id: 3, title: 'Revisar planificación semanal', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      setTasks([...tasks, { id: nextId, title: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, title: editingTitle } : task));
    setEditingId(null);
    setEditingTitle('');
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f6fa] text-[#2d3436] p-8 overflow-y-auto font-sans">
      <div className="flex items-center gap-3 mb-6">
        <FiList size={28} />
        <h1 className="text-3xl font-bold">Lista de Tareas</h1>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Agregar nueva tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-2 rounded-md border border-gray-300 bg-white text-[#2d3436] shadow-sm hover:border-red-400 focus:border-red-500 focus:ring-red-500"
        />
        <button onClick={addTask} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <FiPlus /> Agregar
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className={`flex justify-between items-center p-4 rounded-md shadow-sm border transition hover:border-red-400 ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
            <div className="flex items-center gap-3 w-full">
              <button onClick={() => toggleComplete(task.id)} title="Completar" className="hover:text-red-600">
                <FiCheck className={`w-5 h-5 ${task.completed ? 'text-green-600' : 'text-gray-400'}`} />
              </button>
              {editingId === task.id ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 p-1 rounded-md bg-gray-100 text-[#2d3436] border border-gray-300 hover:border-red-400 focus:border-red-500 focus:ring-red-500"
                />
              ) : (
                <span className={`text-lg flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {editingId === task.id ? (
                <button onClick={() => saveEdit(task.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md font-medium">
                  Guardar
                </button>
              ) : (
                <button onClick={() => { setEditingId(task.id); setEditingTitle(task.title); }} className="text-blue-500 hover:text-red-600">
                  <FiEdit2 size={16} />
                </button>
              )}
              <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPage;
