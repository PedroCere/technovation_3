import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskList from "../features/tasks/TaskList";
import TaskForm from "../features/tasks/TaskForm";
import { getTasks } from "../services/taskService";

const mockTasks = [
  { id: 1, title: 'Mock Task 1', dueDate: new Date().toISOString(), status: "todo", completed: false, subtasks: [], priority: 'medium' },
  { id: 2, title: 'Mock Task 2', dueDate: new Date().toISOString(), status: "done", completed: true, subtasks: [], priority: 'low' },
];

const Today = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const filteredTasks = data.filter(task =>
          task.dueDate?.startsWith(todayStr)
        );
        setTasks(filteredTasks);
        setError(null);
      } catch (err) {
        setError("Failed to load tasks, showing mock data");
        setTasks(mockTasks);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const toggleTaskStatus = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleDeleteClick = (taskId) => {
    setTasks(prev => prev.filter((task) => task.id !== taskId));
  };

  const handleFormSubmit = (updatedTask) => {
    setTasks(prev =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const handleFormClose = () => {
    setEditingTask(null);
  };

  if (loading) {
    return <div className="min-h-screen px-6 py-8 text-[var(--text-color)] transition-colors">Loading tasks...</div>;
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
        <h1 className="text-xl font-semibold flex items-center gap-3">
          Today
          <span className="text-sm text-gray-400">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          View tasks due today.
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
          onDragEnd={() => {}}
          onStatusChange={toggleTaskStatus}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>

      {editingTask && (
        <TaskForm
          initialData={editingTask}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </motion.div>
  );
};

export default Today;
