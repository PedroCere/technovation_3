import { useState, useEffect } from 'react';
import TaskList from '../features/tasks/TaskList';
import SmartCalendar from '../features/calendar/SmartCalendar';
import AutoPlanner from '../features/ai/AutoPlanner';
import { getTasks } from '../services/taskService';

const Planner = () => {
  const [view, setView] = useState('list');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const calendarEvents = tasks.map(task => ({
    title: task.title,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    allDay: true,
    meta: {
      priority: task.priority,
      status: task.status
    }
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
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
