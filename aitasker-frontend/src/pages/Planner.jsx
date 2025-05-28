import { useState, useEffect } from 'react';
import TaskList from '../features/tasks/TaskList';
import SmartCalendar from '../features/calendar/SmartCalendar';
import AutoPlanner from '../features/ai/AutoPlanner';
import { getTasks } from '../services/taskService';

const mockTasks = [
  { id: 1, title: 'Mock Task 1', dueDate: new Date().toISOString(), priority: 'MEDIUM', status: 'pending', completed: false, subtasks: [] },
  { id: 2, title: 'Mock Task 2', dueDate: new Date().toISOString(), priority: 'HIGH', status: 'completed', completed: true, subtasks: [] },
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
        // Show error message and mock data
        setTasks(mockTasks);
        setError('Failed to load tasks, showing mock data');
      }
    };
    fetchTasks();
  }, []);

  const calendarEvents = tasks.map(task => {
    // Defensive check for dueDate to avoid parse errors
    let startDate = new Date();
    let endDate = new Date();
    if (task.dueDate) {
      try {
        // Use parseISO from date-fns to parse ISO strings safely
        const { parseISO } = require('date-fns');
        startDate = parseISO(task.dueDate);
        endDate = parseISO(task.dueDate);
      } catch {
        // fallback to current date if parsing fails
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
        status: task.status
      }
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {error && (
          <div className="mb-4 text-red-600">{error}</div>
        )}
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg ${
              view === 'list' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            List
          </button>
          <button 
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg ${
              view === 'calendar' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Calendar
          </button>
        </div>

        {view === 'list' ? (
          <TaskList tasks={tasks} />
        ) : (
          <SmartCalendar view="week" events={calendarEvents} />
        )}
      </div>

      <div className="space-y-6">
        <AutoPlanner tasks={tasks} />
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-medium mb-3">Weekly Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tasks completed:</span>
              <span className="text-red-500">3/5</span>
            </div>
            <div className="flex justify-between">
              <span>Average time:</span>
              <span className="text-red-500">2.4h/day</span>
            </div>
            <div className="flex justify-between">
              <span>Productivity:</span>
              <span className="text-red-500">78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
