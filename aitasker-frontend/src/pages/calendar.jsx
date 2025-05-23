import React, { useState, useEffect } from 'react';
import TaskScheduler from '../features/tasks/TaskScheduler';
import { getTasks } from '../services/taskService';

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Loading tasks...</div>;
  }

  if (error) {
    return <div className="max-w-4xl mx-auto p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Calendar</h1>
      <TaskScheduler tasks={tasks} />
    </div>
  );
};

export default CalendarPage;
