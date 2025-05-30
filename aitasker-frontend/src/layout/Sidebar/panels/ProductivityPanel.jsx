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
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow space-y-6" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="flex items-center gap-2 mb-2">
        <BarChart2 className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>Your Productivity</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold" style={{ color: 'var(--success-color)' }}>{stats.completedThisWeek}</p>
          <p className="text-sm" style={{ color: 'var(--button-text)' }}>Completed this week</p>
        </div>
        <div>
          <p className="text-3xl font-bold" style={{ color: 'var(--info-color)' }}>{stats.dailyAverage}</p>
          <p className="text-sm" style={{ color: 'var(--button-text)' }}>Daily average</p>
        </div>
        <div>
          <p className="text-3xl font-bold" style={{ color: 'var(--warning-color)' }}>{stats.activeDays}</p>
          <p className="text-sm" style={{ color: 'var(--button-text)' }}>Active days</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--button-text)' }}>
          <span>Weekly Goal: {stats.goal} tasks</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: 'var(--input-bg)' }}>
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%`, backgroundColor: 'var(--success-color)' }}
          />
        </div>
      </div>

      <div className="text-sm mt-6 flex items-center gap-2 justify-center" style={{ color: 'var(--button-text)' }}>
        <CheckCircle className="w-4 h-4" style={{ color: 'var(--success-color)' }} />
        Keep it up! You're on track to hit your weekly goal.
      </div>
    </div>
  );
};

export default ProductivityPanel;
