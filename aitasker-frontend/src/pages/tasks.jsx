import React, { useState } from 'react';
import TaskList from '../features/tasks/TaskList';
import TaskForm from '../features/tasks/taskForm';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Example Task 1',
      description: 'This is an example task',
      priority: 'high',
      dueDate: '2024-06-30',
      label: 'Work',
      status: 'todo'
    },
    {
      id: '2',
      title: 'Example Task 2',
      description: 'Another example task',
      priority: 'medium',
      dueDate: '2024-07-05',
      label: 'Personal',
      status: 'in-progress'
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    setTasks(reorderedTasks);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now().toString(), status: 'todo' }]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Add Task
        </button>
      </div>

      <TaskList tasks={tasks} onDragEnd={handleDragEnd} onStatusChange={handleStatusChange} />

      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};

export default Tasks;
