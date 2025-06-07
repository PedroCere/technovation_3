import { FiActivity, FiCheckSquare, FiPieChart, FiCalendar } from 'react-icons/fi';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="min-h-screen px-6 py-10 transition-colors" 
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--text-color)]">Productivity Overview</h1>
          <p className="text-sm text-gray-400 mt-1">Insight into your performance trends</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <motion.div className="p-5 rounded-xl shadow border border-[var(--border-color)] bg-[var(--button-bg)]">
            <div className="flex items-center gap-3 mb-3">
              <FiCheckSquare className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium">Completion Rate</span>
            </div>
            <div className="text-3xl font-bold">{statsData.completionRate}%</div>
            <div className="h-2 mt-3 bg-[var(--border-color)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--primary-color)] rounded-full" 
                style={{ width: `${statsData.completionRate}%` }} 
              />
            </div>
          </motion.div>

          <motion.div className="p-5 rounded-xl shadow border border-[var(--border-color)] bg-[var(--button-bg)]">
            <div className="flex items-center gap-3 mb-4">
              <FiActivity className="w-6 h-6 text-[var(--primary-color)]" />
              <span className="text-sm font-medium">Weekly Tasks</span>
            </div>
            <div className="h-24 w-full grid grid-cols-7 items-end gap-1">
              {statsData.productivityTrend.map((v, i) => (
                <div 
                  key={i} 
                  className="w-full bg-[var(--primary-color)] rounded-md"
                  style={{ height: `${v * 0.9}%` }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div className="p-5 rounded-xl shadow border border-[var(--border-color)] bg-[var(--button-bg)]">
            <div className="flex items-center gap-3 mb-4">
              <FiPieChart className="w-6 h-6 text-[var(--label-text-purple)]" />
              <span className="text-sm font-medium">By Category</span>
            </div>
            <div className="space-y-3">
              {statsData.categories.map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${c.color}`} />
                    <span className="text-sm text-[var(--text-color)]">{c.name}</span>
                  </div>
                  <span className="text-sm text-[var(--text-color)]/70">{c.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="p-5 rounded-xl shadow border border-[var(--border-color)] bg-[var(--button-bg)]">
            <div className="flex items-center gap-3 mb-4">
              <FiCalendar className="w-6 h-6 text-[var(--label-text-yellow)]" />
              <span className="text-sm font-medium">Daily Activity</span>
            </div>
            <div className="flex gap-1 h-20 items-end">
              {statsData.weeklyActivity.data.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 bg-green-300 hover:bg-green-400 transition-all rounded"
                  style={{ height: `${v * 10}%` }}
                >
                  <span className="sr-only">{statsData.weeklyActivity.labels[i]}: {v} tasks</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="p-6 rounded-xl shadow border border-[var(--border-color)] bg-[var(--button-bg)]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiActivity className="text-[var(--primary-color)]" />
            Monthly Progress
          </h3>
          <div className="h-72">
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
    </motion.div>
  );
};

export default Stats;
