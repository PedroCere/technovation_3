import { Lightbulb } from 'lucide-react';

const QuickAddPanel = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto text-center">
      <div className="flex justify-center mb-5">
        <Lightbulb className="w-10 h-10 text-yellow-400" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Stay Focused, Stay Ahead</h2>
      <p className="text-gray-700 mb-4 text-lg">
        AItasker is designed to keep your mind clear and your tasks under control. With intelligent suggestions, seamless task organization, and an intuitive interface, you'll never miss a priority again.
      </p>
      <p className="text-gray-500 text-sm">
        Let your ideas flow. We'll help you turn them into actions, goals, and progress — all in one place.
      </p>
    </div>
  );
};

export default QuickAddPanel;
