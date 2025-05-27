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
    <div className="bg-[var(--bg-color)] p-4 rounded-lg shadow border border-[var(--border-color)] text-[var(--text-color)]">
      <div className="flex border-b border-[var(--border-color)] mb-3">
        <button
          className={`px-3 py-2 text-sm font-medium ${
            activeTab === 'suggestions'
              ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
              : 'text-[var(--text-color)]'
          }`}
          onClick={() => setActiveTab('suggestions')}
        >
          Sugerencias
        </button>
        <button
          className={`px-3 py-2 text-sm font-medium ${
            activeTab === 'warnings'
              ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
              : 'text-[var(--text-color)]'
          }`}
          onClick={() => setActiveTab('warnings')}
        >
          Alertas
        </button>
      </div>

      <ul className="space-y-2">
        {recommendations[activeTab].map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <div
              className={`w-2 h-2 mt-2 rounded-full ${
                activeTab === 'warnings'
                  ? 'bg-[var(--label-bg-yellow)]'
                  : 'bg-[var(--label-bg-blue)]'
              }`}
            />
            <p className="text-sm">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IARecommendations;
