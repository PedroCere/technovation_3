import React, { useState, useEffect } from 'react';
import TaskScheduler from '../features/tasks/TaskScheduler';
import { getTasks } from '../services/taskService';
import { useTheme } from '../context/ThemeContext'; // Adjust import path as needed

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
        className="max-w-4xl mx-auto p-6" 
        style={{ color: 'var(--text-color)' }}
      >
        Loading tasks...
      </div>
    );
  }

  return (
    <div 
      className="max-w-4xl mx-auto p-6"
      style={{ 
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}
    >
      <h1 className="text-2xl font-bold mb-4">Task Calendar</h1>
      
      {error && (
        <div 
          className="mb-4 p-3 rounded-lg"
          style={{
            backgroundColor: 'var(--button-bg)',
            border: '1px solid var(--border-color)'
          }}
        >
          {error}
        </div>
      )}
      
      <TaskScheduler tasks={tasks} />
    </div>
  );
};

export default CalendarPage;