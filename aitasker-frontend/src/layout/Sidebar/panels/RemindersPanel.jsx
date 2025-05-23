import React, { useState } from 'react';
import { AlarmClock, Trash2 } from 'lucide-react';

const initialReminders = [
  {
    id: 1,
    task: 'Finish client proposal',
    time: 'Today at 4:00 PM',
  },
  {
    id: 2,
    task: 'Weekly team meeting',
    time: 'Tomorrow at 10:00 AM',
  },
  {
    id: 3,
    task: 'Submit expense report',
    time: 'Friday at 1:00 PM',
  },
];

const RemindersPanel = () => {
  const [reminders, setReminders] = useState(initialReminders);

  const removeReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <div className="flex items-center gap-2 mb-4">
        <AlarmClock className="w-6 h-6 text-red-500" />
        <h2 className="text-xl font-bold text-gray-800">Task Reminders</h2>
      </div>
      {reminders.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">No reminders set ⏳</p>
      ) : (
        <ul className="space-y-4">
          {reminders.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
            >
              <div>
                <h4 className="text-sm font-medium text-gray-800">{r.task}</h4>
                <p className="text-xs text-gray-500">{r.time}</p>
              </div>
              <button
                onClick={() => removeReminder(r.id)}
                className="text-gray-400 hover:text-red-500"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemindersPanel;
