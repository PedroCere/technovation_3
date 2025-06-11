import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import TaskCard from '../features/tasks/TaskCard';
import wallpaper1 from '../assets/wallpaper6.png';
import wall from '../assets/wall2.mp4';

const Dashboard = () => {
  const { theme } = useTheme();
  const { user } = useUser();

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Get started with tasks', status: 'todo', label: 'Start', priority: 'High', dueDate: '2024-06-10' },
    { id: 2, title: 'Reading list', status: 'in-progress', label: 'Reading', priority: 'Medium', dueDate: '2024-06-15' },
    { id: 3, title: 'Buy groceries 🛒', status: 'done', label: 'Shopping', priority: 'Low', dueDate: '2024-06-05' },
    { id: 4, title: 'Fix broken light in hallway', status: 'todo', label: 'Home', priority: 'High', dueDate: '2024-06-12' },
    { id: 5, title: 'Write blog post: "How to use GPTs!"', status: 'in-progress', label: 'Writing', priority: 'Medium', dueDate: '2024-06-20' },
    { id: 6, title: 'Refactor legacy code 🚀', status: 'done', label: 'Coding', priority: 'High', dueDate: '2024-06-08' },
    { id: 7, title: 'Review pull requests (15!)', status: 'todo', label: 'Review', priority: 'High', dueDate: '2024-06-11' },
    { id: 8, title: 'Book dentist appointment', status: 'in-progress', label: 'Health', priority: 'Medium', dueDate: '2024-06-18' },
    { id: 9, title: 'Water the plants 🌱', status: 'todo', label: 'Garden', priority: 'Low', dueDate: '2024-06-07' },
    { id: 10, title: 'Plan weekend trip: 🚗 🏕️ 🏖️', status: 'todo', label: 'Travel', priority: 'Medium', dueDate: '2024-06-22' },
  ]);

  const onStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const onEditClick = (task) => alert(`Edit task: ${task.title}`);
  const onDeleteClick = (taskId) => setTasks(tasks.filter(task => task.id !== taskId));

  return (
    <motion.main
      className="min-h-screen px-6 py-10 font-sans transition-colors"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

{/* Hero video section con contenido sobrepuesto */}
<div className="relative w-full min-h-[45vh] overflow-hidden rounded-xl mb-12">
 <video
  className="absolute top-0 left-0 w-full h-full object-cover object-top"

    src={wall}
    autoPlay
    muted
    loop
    playsInline
  />
  <div className="absolute inset-0 bg-black/40 dark:bg-black/50 backdrop-blur-sm" />

  {/* Contenido sobre el video */}
  <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 py-8 gap-6 text-white dark:text-white">
    <div className="flex items-center gap-4">
      <motion.div
        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center font-bold overflow-hidden"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        {user?.photoUrl ? (
          <img src={user.photoUrl} alt="User" className="w-full h-full object-cover" />
        ) : (
          user?.name?.[0]?.toUpperCase() || 'U'
        )}
      </motion.div>
      <div>
        <h1 className="text-3xl font-bold">Bienvenido de nuevo, {user?.name || 'Usuario'}</h1>
        <p className="text-base opacity-80 mt-1">Estas son tus tareas para hoy.</p>
      </div>
    </div>

    {/* Search dentro del hero */}
    <div className="w-full max-w-4xl bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-4 flex flex-wrap gap-3 items-center">
      <select className="text-sm px-3 py-2 rounded border bg-white/20 text-white border-white/30">
        <option>Search</option>
        <option>Create</option>
        <option>Explore</option>
      </select>
      <input
        type="text"
        placeholder="Buscar tareas..."
        className="flex-1 px-3 py-2 rounded border bg-white/20 text-white placeholder-white/70 border-white/30"
      />
      <button className="text-sm px-3 py-2 rounded border bg-white/20 text-white border-white/30 hover:bg-white/30">
        Todas ✓
      </button>
    </div>
  </div>
</div>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Tasks</h2>
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
            <AnimatePresence>
              {tasks.map(task => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TaskCard
                    task={task}
                    onStatusChange={onStatusChange}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 text-center rounded-lg border-dashed border-2 text-sm"
              style={{ backgroundColor: 'var(--button-bg)', color: 'var(--text-color)', borderColor: 'var(--primary-color)' }}
            >
              + New Task
            </motion.button>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Reminders</h2>
          <motion.div
            className="rounded-xl border border-[var(--border-color)] p-5 bg-[var(--button-bg)] shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm mb-4 text-[var(--button-text)]">
              Sync tasks with your calendar via AI Notes.
              <br />
              <span className="text-[var(--primary-color)] underline cursor-pointer">Connect with Notion</span>
            </p>
            {(user?.reminders || []).length ? (
              user.reminders.map((reminder, i) => (
                <div key={i} className="mb-3">
                  <p className="text-xs text-gray-400">{reminder.date}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">{reminder.title}</p>
                      <p className="text-xs text-gray-500">{reminder.time} · {reminder.location}</p>
                    </div>
                    <button
                      className="text-xs px-3 py-1 rounded border hover:bg-opacity-20"
                      style={{ borderColor: 'var(--button-border)', color: 'var(--button-text)' }}
                    >
                      Join & Note
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No reminders for now.</p>
            )}
          </motion.div>
        </aside>
      </div>
    </motion.main>
  );
};

export default Dashboard;
