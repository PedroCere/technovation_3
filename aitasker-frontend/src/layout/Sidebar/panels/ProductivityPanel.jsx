import { BarChart2, CheckCircle } from 'lucide-react';

const stats = {
  completedThisWeek: 18,
  dailyAverage: 2.6,
  activeDays: 5,
  goal: 25,
};

const ProductivityPanel = () => {
  const progressPercent = Math.min((stats.completedThisWeek / stats.goal) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <BarChart2 className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-bold text-gray-800">Your Productivity</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-green-600">{stats.completedThisWeek}</p>
          <p className="text-sm text-gray-600">Completed this week</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-600">{stats.dailyAverage}</p>
          <p className="text-sm text-gray-600">Daily average</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-yellow-600">{stats.activeDays}</p>
          <p className="text-sm text-gray-600">Active days</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Weekly Goal: {stats.goal} tasks</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-6 flex items-center gap-2 justify-center">
        <CheckCircle className="w-4 h-4 text-green-500" />
        Keep it up! You're on track to hit your weekly goal.
      </div>
    </div>
  );
};

export default ProductivityPanel;
