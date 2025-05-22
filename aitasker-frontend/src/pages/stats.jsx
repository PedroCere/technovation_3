import { FiActivity, FiCheckSquare, FiPieChart, FiCalendar } from 'react-icons/fi';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Stats = () => {
 
  const statsData = {
    completionRate: 75,
    productivityTrend: [65, 59, 80, 81, 56, 55, 40],
    categories: [
      { name: 'Trabajo', value: 40, color: 'bg-blue-500' },
      { name: 'Personal', value: 30, color: 'bg-green-500' },
      { name: 'Estudio', value: 20, color: 'bg-purple-500' },
      { name: 'Otros', value: 10, color: 'bg-yellow-500' }
    ],
    weeklyActivity: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      data: [4, 5, 3, 6, 4, 3, 2]
    }
  };


  const monthlyProgressData = statsData.productivityTrend.map((value, index) => ({
    name: `Semana ${index + 1}`,
    progreso: value
  }));

  return (
    <div className="flex justify-center w-full min-h-full p-6">
      <div className="max-w-6xl w-full">
        <h1 className="text-2xl font-bold mb-6">Estadísticas de Productividad</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
         
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <FiCheckSquare className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium">Tareas Completadas</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {statsData.completionRate}%
            </div>
            <div className="h-2 bg-gray-100 rounded-full mt-2">
              <div 
                className="h-full bg-red-500 rounded-full transition-all" 
                style={{ width: `${statsData.completionRate}%` }}
              />
            </div>
          </div>

          {/* Tarjeta Tendencia Productiva */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FiActivity className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium">Tendencia Semanal</span>
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
                className="fill-blue-500"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Tarjeta Distribución */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FiPieChart className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-medium">Distribución</span>
            </div>
            <div className="space-y-2">
              {statsData.categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-sm ${category.color}`} />
                  <span className="text-sm flex-1">{category.name}</span>
                  <span className="text-sm text-gray-600">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tarjeta Actividad */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FiCalendar className="w-6 h-6 text-yellow-500" />
              <span className="text-sm font-medium">Actividad Diaria</span>
            </div>
            <div className="flex gap-1 h-20 items-end">
              {statsData.weeklyActivity.data.map((value, index) => (
                <div 
                  key={index}
                className="flex-1 bg-green-200 hover:bg-green-300 transition-all rounded-t"
                  style={{ height: `${value * 10}%` }}
                >
                  <span className="sr-only">
                    {statsData.weeklyActivity.labels[index]}: {value} tareas
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gráfico principal */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <FiActivity className="text-red-500" />
            Progreso Mensual
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progreso" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
