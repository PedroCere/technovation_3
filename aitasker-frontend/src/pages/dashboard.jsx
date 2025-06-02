import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import TaskCard from '../features/tasks/TaskCard';

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

  const userData = {
    name: 'Pedro Cereghetti',
    reminders: [
      { date: 'Today', time: '9:00 AM', title: 'Daily team standup', location: 'Office' },
      { date: 'Sun Jun 1', time: '10:00 AM', title: 'Project follow-up', location: 'Office' },
    ],
  };

  const onStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const onEditClick = (task) => {
    alert(`Edit task: ${task.title}`);
  };

  const onDeleteClick = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen px-6 py-8 font-sans transition-colors" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="mb-8">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <motion.div
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold overflow-hidden"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              'P'
            )}
          </motion.div>
          Good afternoon, {userData.name}
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
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] scrollbar-custom">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
            <div className="w-full rounded-md flex justify-center items-center text-gray-500 hover:bg-[#3a3a3a] transition cursor-pointer p-4" style={{ backgroundColor: 'var(--button-bg)' }}>
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
            {userData.reminders.map((reminder, i) => (
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
