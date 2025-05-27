import { Layout } from 'lucide-react';
import { useState } from 'react';

const defaultItems = [
  { key: 'inbox', label: 'Inbox' },
  { key: 'today', label: 'Today' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'filters', label: 'Filters & Labels' },
  { key: 'completed', label: 'Completed' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'planner', label: 'Planner' },
  { key: 'stats', label: 'Stats' },
  { key: 'assistant', label: 'Assistant' },
];

const SidebarPanel = () => {
  const [enabledItems, setEnabledItems] = useState(defaultItems.map(i => i.key));

  const toggleItem = (key) => {
    setEnabledItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl shadow space-y-6" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="flex items-center gap-2">
        <Layout className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>Sidebar Customization</h2>
      </div>

      <p className="text-sm mb-2" style={{ color: 'var(--button-text)' }}>
        Enable or disable the items you want to see in your sidebar.
      </p>

      <ul className="space-y-2">
        {defaultItems.map((item) => (
          <li key={item.key} className="flex items-center justify-between text-sm" style={{ color: 'var(--text-color)' }}>
            <span>{item.label}</span>
            <input
              type="checkbox"
              checked={enabledItems.includes(item.key)}
              onChange={() => toggleItem(item.key)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarPanel;
