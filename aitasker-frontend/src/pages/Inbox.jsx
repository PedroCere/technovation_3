import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskList from "../features/tasks/TaskList";
import TaskForm from "../features/tasks/TaskForm";

const Inbox = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Analize team workflow",
      status: "todo",
      subtasks: ["Today"],
      priority: "medium",
      dueDate: "",
      label: "",
      description: "",
    },
    {
      id: 2,
      title: "Start My app",
      status: "todo",
      subtasks: ["Obtén una recomendación especializada de Todoist", "Tomorrow"],
      priority: "medium",
      dueDate: "",
      label: "",
      description: "",
    },
    
  ]);

  const [editingTask, setEditingTask] = useState(null);

  const toggleTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleDeleteClick = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleFormSubmit = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const handleFormClose = () => {
    setEditingTask(null);
  };

  return (
    <motion.div
      className="min-h-screen px-6 py-8 font-sans transition-colors"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Inbox
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Your personal catch-all list. Organize what’s on your mind.
        </p>
      </div>



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

export default Inbox;
