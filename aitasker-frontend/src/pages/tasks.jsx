import React, { useState, useEffect } from 'react';
import TaskList from '../features/tasks/TaskList';
import TaskForm from '../features/tasks/taskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { useTheme } from '../context/ThemeContext';

const mockTasks = [
  { id: 1, title: 'Mock Task 1', status: 'pending', completed: false, subtasks: [] },
  { id: 2, title: 'Mock Task 2', status: 'completed', completed: true, subtasks: [] },
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
      <div className="max-w-4xl mx-auto p-6 text-[var(--text-color)]">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-[var(--text-color)] transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
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

      {error && (
        <div className="mb-4 text-red-500 bg-[var(--button-bg)] p-3 rounded">
          {error}
        </div>
      )}

      <TaskList
        tasks={tasks}
        onDragEnd={handleDragEnd}
        onStatusChange={handleStatusChange}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteTask}
      />

      {showForm && (
        <TaskForm
          onClose={handleFormClose}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          initialData={editingTask}
        />
      )}
    </div>
  );
};

export default Tasks;
