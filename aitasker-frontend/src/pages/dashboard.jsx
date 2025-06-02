import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { theme } = useTheme();

  const [tasks, setTasks] = useState([
    { title: 'Get started with tasks', icon: '✅', status: 'Pending' },
    { title: 'Reading list', icon: '📚', status: 'In Progress' },
  ]);

  const user = {
    name: 'Pedro Cereghetti',
    reminders: [
      { date: 'Today', time: '9:00 AM', title: 'Daily team standup', location: 'Office' },
      { date: 'Sun Jun 1', time: '10:00 AM', title: 'Project follow-up', location: 'Office' },
    ],
  };

  const toggleStatus = (index) => {
    const updated = [...tasks];
    const next = {
      Pending: 'In Progress',
      'In Progress': 'Done',
      Done: 'Pending',
    };
    updated[index].status = next[updated[index].status];
    setTasks(updated);
  };

  return (
    <div className="min-h-screen px-6 py-8 font-sans transition-colors" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="mb-8">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <motion.div
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            P
          </motion.div>
          Good afternoon, {user.name}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          View or search your tasks from your workspace...
        </p>
      </div>

      <div className="p-4 rounded-md mb-10 shadow" style={{ backgroundColor: 'var(--button-bg)' }}>
        <div className="flex flex-wrap gap-4 items-center">
          <select className="bg-[#1e1e1e] border border-gray-600 text-sm px-3 py-2 rounded text-white" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--input-border)' }}>
            <option>Search</option>
            <option>Create</option>
            <option>Explore</option>
          </select>
          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 border rounded px-3 py-2 text-sm"
            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--input-border)' }}
          />
          <button className="text-sm px-3 py-2 rounded hover:bg-gray-600" style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', borderColor: 'var(--button-border)', borderStyle: 'solid' }}>
            All sources ✓
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-sm font-medium mb-2 text-gray-400">Recent Tasks</h2>
          <div className="flex gap-4 overflow-x-auto">
            {tasks.map((task, i) => (
              <motion.div
                key={i}
                onClick={() => toggleStatus(i)}
                whileHover={{ scale: 1.05 }}
                className="w-40 h-36 rounded-md flex flex-col justify-center items-center cursor-pointer transition-shadow hover:shadow-lg"
                style={{ backgroundColor: 'var(--button-bg)' }}
              >
                <div className="text-3xl mb-2">{task.icon}</div>
                <p className="text-sm font-semibold text-center mb-1" style={{ color: 'var(--text-color)' }}>{task.title}</p>
                <span className="text-xs px-2 py-1 rounded bg-gray-700 text-white">{task.status}</span>
              </motion.div>
            ))}
            <div className="w-40 h-36 rounded-md flex justify-center items-center text-gray-500 hover:bg-[#3a3a3a] transition cursor-pointer" style={{ backgroundColor: 'var(--button-bg)' }}>
              + New task
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2 text-gray-400">Upcoming Reminders</h2>
          <div className="rounded-md p-4 shadow-sm" style={{ backgroundColor: 'var(--button-bg)' }}>
            <p className="text-sm text-gray-300 mb-4">
              Sync your tasks with your calendar using AI Notes.
              <br />
              <span className="text-blue-400 underline cursor-pointer">
                Connect with Notion Calendar
              </span>
            </p>
            {user.reminders.map((reminder, i) => (
              <div key={i} className="mb-3">
                <p className="text-xs text-gray-400">{reminder.date}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">{reminder.title}</p>
                    <p className="text-xs text-gray-500">{reminder.time} · {reminder.location}</p>
                  </div>
                  <button className="text-xs px-2 py-1 border rounded hover:bg-gray-700" style={{ borderColor: 'var(--button-border)', color: 'var(--button-text)' }}>
                    Join & Take Notes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
