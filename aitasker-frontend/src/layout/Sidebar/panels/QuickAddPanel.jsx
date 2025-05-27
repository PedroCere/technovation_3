import { Lightbulb } from 'lucide-react';

const QuickAddPanel = () => {
  return (
    <div className="p-8 rounded-xl shadow-md max-w-2xl mx-auto text-center" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="flex justify-center mb-5">
        <Lightbulb className="w-10 h-10" style={{ color: 'var(--warning-color)' }} />
      </div>
      <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-color)' }}>Stay Focused, Stay Ahead</h2>
      <p className="mb-4 text-lg" style={{ color: 'var(--button-text)' }}>
        AItasker is designed to keep your mind clear and your tasks under control. With intelligent suggestions, seamless task organization, and an intuitive interface, you'll never miss a priority again.
      </p>
      <p className="text-sm" style={{ color: 'var(--button-text)' }}>
        Let your ideas flow. We'll help you turn them into actions, goals, and progress — all in one place.
      </p>
    </div>
  );
};

export default QuickAddPanel;
