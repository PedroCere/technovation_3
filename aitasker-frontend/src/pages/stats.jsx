import { FiActivity, FiCheckSquare, FiPieChart, FiCalendar } from 'react-icons/fi';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Stats = () => {
  const statsData = {
    completionRate: 75,
    productivityTrend: [65, 59, 80, 81, 56, 55, 40],
    categories: [
      { name: 'Work', value: 40, color: 'bg-blue-500' },
      { name: 'Personal', value: 30, color: 'bg-green-500' },
      { name: 'Study', value: 20, color: 'bg-purple-500' },
      { name: 'Others', value: 10, color: 'bg-yellow-500' }
    ],
    weeklyActivity: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [4, 5, 3, 6, 4, 3, 2]
    }
  };

  const monthlyProgressData = statsData.productivityTrend.map((value, index) => ({
    name: `Week ${index + 1}`,
    progress: value
  }));

  return (
    <div className="flex justify-center w-full min-h-full p-6">
      <div className="max-w-6xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-[var(--text-color)]">Productivity Stats</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Completion Rate Card */}
          <div className="bg-[var(--bg-color)] p-4 rounded-xl shadow-sm border border-[var(--border-color)]">
            <div className="flex items-center gap-3 mb-3">
              <FiCheckSquare className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-[var(--text-color)]">Completed Tasks</span>
            </div>
            <div className="text-3xl font-bold text-[var(--text-color)]">
              {statsData.completionRate}%
            </div>
            <div className="h-2 bg-[var(--border-color)] rounded-full mt-2">
              <div 
                className="h-full bg-[var(--primary-color)] rounded-full transition-all" 
                style={{ width: `${statsData.completionRate}%` }}
              />
            </div>
          </div>

          {/* Productivity Trend Card */}
          <div className="bg-[var(--bg-color)] p-4 rounded-xl shadow-sm border border-[var(--border-color)]">
            <div className="flex items-center gap-3 mb-4">
              <FiActivity className="w-6 h-6 text-[var(--primary-color)]" />
              <span className="text-sm font-medium text-[var(--text-color)]">Weekly Trend</span>
            </div>
            <div className="h-20">
              <svg viewBox="0 0 300 80" className="w-full h-full">
                {statsData.productivityTrend.map((value, index) => (
                  <rect
                    key={index}
                    x={index * 40}
                    y={80 - value}
                    width="20"
                    height={value}
                    className="fill-[var(--primary-color)]"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Category Distribution Card */}
          <div className="bg-[var(--bg-color)] p-4 rounded-xl shadow-sm border border-[var(--border-color)]">
            <div className="flex items-center gap-3 mb-4">
              <FiPieChart className="w-6 h-6 text-[var(--label-text-purple)]" />
              <span className="text-sm font-medium text-[var(--text-color)]">Category Distribution</span>
            </div>
            <div className="space-y-2">
              {statsData.categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`${category.color} w-4 h-4 rounded-sm`} />
                  <span className="text-sm flex-1 text-[var(--text-color)]">{category.name}</span>
                  <span className="text-sm text-[var(--text-color)]/70">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Activity Card */}
          <div className="bg-[var(--bg-color)] p-4 rounded-xl shadow-sm border border-[var(--border-color)]">
            <div className="flex items-center gap-3 mb-4">
              <FiCalendar className="w-6 h-6 text-[var(--label-text-yellow)]" />
              <span className="text-sm font-medium text-[var(--text-color)]">Daily Activity</span>
            </div>
            <div className="flex gap-1 h-20 items-end">
              {statsData.weeklyActivity.data.map((value, index) => (
                <div 
                  key={index}
                  className="flex-1 bg-green-200 hover:bg-green-300 transition-all rounded-t"
                  style={{ height: `${value * 10}%` }}
                >
                  <span className="sr-only">
                    {statsData.weeklyActivity.labels[index]}: {value} tasks
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Progress Chart */}
        <div className="bg-[var(--bg-color)] p-6 rounded-xl shadow-sm border border-[var(--border-color)]">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--text-color)]">
            <FiActivity className="text-[var(--primary-color)]" />
            Monthly Progress
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-color)" />
                <YAxis stroke="var(--text-color)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
                <Bar dataKey="progress" fill="var(--primary-color)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
