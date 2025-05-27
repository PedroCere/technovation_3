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
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="flex items-center gap-2 mb-4">
        <AlarmClock className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>Task Reminders</h2>
      </div>
      {reminders.length === 0 ? (
        <p className="text-sm text-center" style={{ color: 'var(--button-text)' }}>No reminders set ⏳</p>
      ) : (
        <ul className="space-y-4">
          {reminders.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between p-3 rounded-lg border"
              style={{ backgroundColor: 'var(--button-bg)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
            >
              <div>
                <h4 className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>{r.task}</h4>
                <p className="text-xs" style={{ color: 'var(--button-text)' }}>{r.time}</p>
              </div>
              <button
                onClick={() => removeReminder(r.id)}
                className="hover:text-red-500"
                title="Delete"
                style={{ color: 'var(--button-text)' }}
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
