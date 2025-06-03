import React, { useState } from "react";
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
    {
      id: 3,
      title: "Present new Package",
      status: "todo",
      subtasks: ["ejemplo1", "Tomorrow"],
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
    <div className="flex justify-center w-full min-h-full px-2 py-6 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">Inbox</h1>
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

export default Inbox;
