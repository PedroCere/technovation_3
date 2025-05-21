import React, { useState } from 'react';
import TaskScheduler from '../features/tasks/TaskScheduler';

const CalendarPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Example Task 1',
      dueDate: '2024-06-30',
    },
    {
      id: '2',
      title: 'Example Task 2',
      dueDate: '2024-07-05',
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Calendar</h1>
      <TaskScheduler tasks={tasks} />
    </div>
  );
};

export default CalendarPage;
