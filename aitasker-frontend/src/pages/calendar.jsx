import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TaskScheduler from '../features/tasks/TaskScheduler';
import { getTasks } from '../services/taskService';
import { useTheme } from '../context/ThemeContext';

const mockTasks = [
  { id: 1, title: 'Team Meeting', dueDate: new Date().toISOString(), status: 'pending', completed: false, subtasks: [] },
  { id: 2, title: 'Project Deadline', dueDate: new Date().toISOString(), status: 'completed', completed: true, subtasks: [] },
];

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError('Failed to load tasks, showing mock data');
        setTasks(mockTasks);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div 
        className="min-h-screen px-6 py-8 text-[var(--text-color)] transition-colors"
      >
        Loading tasks...
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen px-6 py-8 font-sans transition-colors"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-[var(--text-color)]">Task Calendar</h1>
        <p className="text-sm text-gray-400 mt-1">
          Visualize and manage your tasks in calendar view.
        </p>
      </div>

      {error && (
        <div 
          className="mb-4 p-3 rounded-lg"
          style={{
            backgroundColor: 'var(--button-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-color)'
          }}
        >
          {error}
        </div>
      )}

      <TaskScheduler tasks={tasks} />
    </motion.div>
  );
};

export default CalendarPage;
