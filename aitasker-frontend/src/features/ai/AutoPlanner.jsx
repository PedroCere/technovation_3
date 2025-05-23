// features/ai/AutoPlanner.jsx
import { useState, useEffect } from 'react';
import { FiLoader, FiCalendar } from 'react-icons/fi';

const AutoPlanner = ({ tasks }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generatePlan = async () => {
    setIsLoading(true);
    // Simulación de llamada a API de IA
    setTimeout(() => {
      setSuggestions([
        { time: '09:00', task: 'Check new emails' },
        { time: '11:00', task: 'Work on "Analize project workflow"' }, 
        { time: '14:00', task: 'Meeting with team, if possible' },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (tasks.length > 0) generatePlan();
  }, [tasks]);

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium flex items-center gap-2">
          <FiCalendar className="text-red-500" /> Daily Automatic Planner
        </h3>
        <button 
          onClick={generatePlan}
          className="text-sm text-red-500 hover:text-red-600"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Regenerate'}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <FiLoader className="animate-spin text-gray-400" />
        </div>
      ) : (
        <ul className="space-y-2">
          {suggestions.map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="font-medium text-gray-500">{item.time}</span>
              <span className="flex-1">{item.task}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoPlanner;