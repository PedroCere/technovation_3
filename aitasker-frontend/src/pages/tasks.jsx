import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TaskList from '../features/tasks/TaskList';
import TaskForm from '../features/tasks/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { useTheme } from '../context/ThemeContext';

const mockTasks = [
  { id: 1, title: 'Mock Task 1', status: 'todo', completed: false, subtasks: [], priority: 'medium', dueDate: '' },
  { id: 2, title: 'Mock Task 2', status: 'done', completed: true, subtasks: [], priority: 'low', dueDate: '' },
];

const Tasks = () => {
  const { theme } = useTheme();

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
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

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    setTasks(reorderedTasks);
  };

  const handleAddTask = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const updated = await updateTask(editingTask.id, updatedTask);
      setTasks(tasks.map(task => (task.id === updated.id ? updated : task)));
      setEditingTask(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      setError(null);
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-8 text-[var(--text-color)] transition-colors">
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
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Tasks</h1>
          <button
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white rounded transition-colors"
          >
            Add Task
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Manage all your tasks from a central place.
        </p>
      </div>

      {error && (
        <div className="mb-4 text-red-500 bg-[var(--button-bg)] p-3 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] scrollbar-custom">
        <TaskList
          tasks={tasks}
          onDragEnd={handleDragEnd}
          onStatusChange={handleStatusChange}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteTask}
        />
      </div>

      {showForm && (
        <TaskForm
          onClose={handleFormClose}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          initialData={editingTask}
        />
      )}
    </motion.div>
  );
};

export default Tasks;
