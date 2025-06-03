import React, { useState, useEffect } from "react";
import TaskList from "../features/tasks/TaskList";
import TaskForm from "../features/tasks/TaskForm";
import { getTasks } from "../services/taskService";

const mockTasks = [
  { id: 1, title: 'Mock Task 1', dueDate: new Date().toISOString(), status: "todo", completed: false, subtasks: [] },
  { id: 2, title: 'Mock Task 2', dueDate: new Date().toISOString(), status: "done", completed: true, subtasks: [] },
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
    return <div className="flex justify-center w-full min-h-full p-6" style={{ color: "var(--text-color)" }}>Loading tasks...</div>;
  }

  return (
    <div className="flex justify-center w-full min-h-full p-6" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="max-w-4xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold">Today</h1>
          <span className="text-sm" style={{ color: "var(--text-color)", opacity: 0.6 }}>
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {error && (
          <div className="mb-4" style={{ color: "red" }}>
            {error}
          </div>
        )}

        <TaskList
          tasks={tasks}
          onDragEnd={() => {}}
          onStatusChange={toggleTaskStatus}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />

        {editingTask && (
          <TaskForm
            initialData={editingTask}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
          />
        )}
      </div>
    </div>
  );
};

export default Today;
