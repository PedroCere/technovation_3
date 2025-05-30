import React, { useState } from 'react';
import { Bell, AlertCircle, CheckCircle, CalendarClock, Trash2 } from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    icon: <CalendarClock className="w-5 h-5 text-blue-500" />,
    title: 'Upcoming Task: Project Brief',
    description: 'Due tomorrow at 10:00 AM.',
  },
  {
    id: 2,
    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    title: 'Overdue Task: Team Feedback',
    description: 'Was due 2 days ago.',
  },
  {
    id: 3,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    title: 'Task Completed: Logo Design',
    description: 'Marked as done just now.',
  },
];

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>Your Notifications</h2>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm flex items-center gap-1 hover:text-red-600"
            style={{ color: 'var(--button-text)' }}
          >
            <Trash2 className="w-4 h-4" /> Clear all
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-sm text-center" style={{ color: 'var(--button-text)' }}>You're all caught up 🎉</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="flex items-start justify-between p-3 rounded-lg border"
              style={{ backgroundColor: 'var(--button-bg)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
            >
              <div className="flex gap-3">
                <div>{React.cloneElement(n.icon, { style: { color: 'var(--primary-color)' } })}</div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--text-color)' }}>{n.title}</h4>
                  <p className="text-xs" style={{ color: 'var(--button-text)' }}>{n.description}</p>
                </div>
              </div>
              <button
                onClick={() => removeNotification(n.id)}
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

export default NotificationsPanel;

