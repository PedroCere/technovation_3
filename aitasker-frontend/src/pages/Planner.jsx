import { useState, useEffect } from 'react';
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
  const [view, setView] = useState('list');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    <div className="max-w-4xl mx-auto p-6 text-[var(--text-color)] transition-colors">
      {error && (
        <div className="mb-4 text-red-500 bg-[var(--button-bg)] p-3 rounded">
          {error}
        </div>
      )}

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
          Lista
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 rounded-lg ${
            view === 'calendar'
              ? 'bg-[var(--primary-color)] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Calendario
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

      {/* AutoPlanner + Summary */}
      <div className="space-y-6">
        <AutoPlanner tasks={tasks} />
        <div className="bg-[var(--bg-color)] p-4 rounded-xl shadow-sm border border-[var(--border-color)]">
          <h3 className="font-medium mb-3">Resumen semanal</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tareas completadas:</span>
              <span className="text-[var(--primary-color-hover)]">3/5</span>
            </div>
            <div className="flex justify-between">
              <span>Tiempo promedio:</span>
              <span className="text-[var(--primary-color-hover)]">2.4h/día</span>
            </div>
            <div className="flex justify-between">
              <span>Productividad:</span>
              <span className="text-[var(--primary-color-hover)]">78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
