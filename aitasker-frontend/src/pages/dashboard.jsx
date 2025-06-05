import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import TaskCard from '../features/tasks/TaskCard';

const Dashboard = () => {
  const { theme } = useTheme();
  const { user } = useUser();

  const [tasks, setTasks] = useState([
    // ... tus tareas (igual)
  ]);

  const onStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const onEditClick = (task) => alert(`Edit task: ${task.title}`);
  const onDeleteClick = (taskId) => setTasks(tasks.filter(task => task.id !== taskId));

  return (
    <div className="min-h-screen px-6 py-10 font-sans transition-colors"
         style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold overflow-hidden"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            {user?.photoUrl ? (
              <img src={user.photoUrl} alt="User Profile" className="w-full h-full object-cover" />
            ) : user?.name?.[0]?.toUpperCase() || 'U'}
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold">Good afternoon, {user?.name || 'User'}</h1>
            <p className="text-sm text-[var(--button-text)]/70 mt-1">
              View or search your tasks from your workspace...
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="mb-8 bg-[var(--button-bg)] p-4 rounded-lg shadow-sm border border-[var(--border-color)]">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            className="text-sm px-3 py-2 rounded border"
            style={{
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text)',
              borderColor: 'var(--input-border)',
            }}
          >
            <option>Search</option>
            <option>Create</option>
            <option>Explore</option>
          </select>

          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 px-3 py-2 rounded border text-sm"
            style={{
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text)',
              borderColor: 'var(--input-border)',
            }}
          />

          <button
            className="text-sm px-3 py-2 rounded border hover:brightness-110"
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'var(--button-text)',
              borderColor: 'var(--primary-color-hover)',
            }}
          >
            All Sources ✓
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Tasks */}
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-lg font-semibold">Recent Tasks</h2>
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            ))}

            <button
              className="w-full py-3 text-center rounded-lg border-dashed border-2 text-sm hover:scale-[1.02] transition"
              style={{
                backgroundColor: 'var(--button-bg)',
                color: 'var(--text-color)',
                borderColor: 'var(--primary-color)',
              }}
            >
              + New Task
            </button>
          </div>
        </div>

        {/* Right: Reminders */}
        <aside className="md:col-span-4 space-y-4">
          <h2 className="text-lg font-semibold">Upcoming Reminders</h2>
          <div className="rounded-xl border border-[var(--border-color)] p-4 bg-[var(--button-bg)] shadow-sm">
            <p className="text-sm text-[var(--button-text)] mb-4">
              Sync your tasks with your calendar using AI Notes. <br />
              <span className="text-[var(--primary-color)] underline cursor-pointer">
                Connect with Notion Calendar
              </span>
            </p>

            {(user?.reminders || []).length > 0 ? (
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
                      style={{
                        borderColor: 'var(--button-border)',
                        color: 'var(--button-text)',
                      }}
                    >
                      Join & Take Notes
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No reminders.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
