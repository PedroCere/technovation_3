// features/ai/IARecommendations.jsx
import { useState } from 'react';

const IARecommendations = () => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [recommendations] = useState({
    suggestions: [
      'Agrupa tareas similares para mayor eficiencia',
      'Considera delegar tareas de bajo impacto'
    ],
    warnings: [
      'Has pospuesto esta tarea 3 veces',
      'Tiempo estimado excede tu disponibilidad'
    ]
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <div className="flex border-b border-gray-200 mb-3">
        <button
          className={`px-3 py-2 text-sm font-medium ${activeTab === 'suggestions' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('suggestions')}
        >
          Sugerencias
        </button>
        <button
          className={`px-3 py-2 text-sm font-medium ${activeTab === 'warnings' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('warnings')}
        >
          Alertas
        </button>
      </div>

      <ul className="space-y-2">
        {recommendations[activeTab].map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <div className={`w-2 h-2 mt-2 rounded-full ${activeTab === 'warnings' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
            <p className="text-sm">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IARecommendations;