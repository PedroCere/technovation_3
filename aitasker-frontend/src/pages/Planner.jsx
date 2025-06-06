import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import TaskList from '../features/tasks/TaskList';
import SmartCalendar from '../features/calendar/SmartCalendar';
import AutoPlanner from '../features/ai/AutoPlanner';
import { getTasks } from '../services/taskService';

const mockTasks = [
  {
    id: 1,
    title: 'Mock Task 1',
    dueDate: new Date().toISOString(),
    priority: 'MEDIUM',
    status: 'pending',
    completed: false,
    subtasks: [],
  },
  {
    id: 2,
    title: 'Mock Task 2',
    dueDate: new Date().toISOString(),
    priority: 'HIGH',
    status: 'completed',
    completed: true,
    subtasks: [],
  },
];

const Planner = () => {
  const { theme } = useTheme();
  const { user } = useUser();

  const [view, setView] = useState('list');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setTasks(mockTasks);
        setError('No se pudieron cargar las tareas. Mostrando datos de prueba.');
      }
    };

    fetchTasks();
  }, []);

  const calendarEvents = tasks.map((task) => {
    let startDate = new Date();
    let endDate = new Date();

    if (task.dueDate) {
      try {
        const { parseISO } = require('date-fns');
        startDate = parseISO(task.dueDate);
        endDate = parseISO(task.dueDate);
      } catch {
        startDate = new Date();
        endDate = new Date();
      }
    }

    return {
      title: task.title,
      start: startDate,
      end: endDate,
      allDay: true,
      meta: {
        priority: task.priority,
        status: task.status,
      },
    };
  });

  return (
    <div className="min-h-screen px-6 py-10 font-sans transition-colors"
         style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Tasks */}
        <div className="md:col-span-8 space-y-4">
          {/* View toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg ${
                view === 'list'
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg ${
                view === 'calendar'
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Calendar
            </button>
          </div>

          {/* View content */}
          <div className="mb-8">
            {view === 'list' ? (
              <TaskList tasks={tasks} />
            ) : (
              <SmartCalendar view="week" events={calendarEvents} />
            )}
          </div>
        </div>

        {/* Right: AutoPlanner + Summary */}
        <aside className="md:col-span-4 space-y-6">
          <AutoPlanner tasks={tasks} />
          <div className="bg-[var(--button-bg)] p-4 rounded-xl shadow-sm border border-[var(--border-color)]">
            <h3 className="font-medium mb-3">Weekly Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tasks Completed:</span>
                <span className="text-[var(--primary-color-hover)]">3/5</span>
              </div>
              <div className="flex justify-between">
                <span>Average Time:</span>
                <span className="text-[var(--primary-color-hover)]">2.4h/day</span>
              </div>
              <div className="flex justify-between">
                <span>Productivity:</span>
                <span className="text-[var(--primary-color-hover)]">78%</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Planner;
