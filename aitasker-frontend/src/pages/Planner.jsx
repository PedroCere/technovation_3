// features/planner/Planner.jsx
import { useState } from 'react';
import TaskList from '../features/tasks/TaskList';
import SmartCalendar from '../features/calendar/SmartCalendar';
import AutoPlanner from '../features/ai/AutoPlanner';

const Planner = () => {
  const [view, setView] = useState('list');
  const [tasks, setTasks] = useState([]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setView('list')}
            className={`px-4 py-2 ${view === 'list' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
          >
            Lista
          </button>
          <button 
            onClick={() => setView('calendar')}
            className={`px-4 py-2 ${view === 'calendar' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
          >
            Calendario
          </button>
        </div>

        {view === 'list' ? (
          <TaskList tasks={tasks} />
        ) : (
          <SmartCalendar view="week" events={tasks} />
        )}
      </div>

      <div className="space-y-6">
        <AutoPlanner tasks={tasks} />
        {/* Otros widgets del planner */}
      </div>
    </div>
  );
};

export default Planner;