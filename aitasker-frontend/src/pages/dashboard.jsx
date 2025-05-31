import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { theme } = useTheme();

  const user = {
    name: 'Pedro Cereghetti',
    recentPages: [
      { title: 'Primeros pasos', icon: '📄' },
      { title: 'Lista de lectura', icon: '📚' },
    ],
    events: [
      { date: 'Hoy', time: '9:00', title: 'Reunión diaria de equipo', location: 'Oficina' },
      { date: 'Dom 1 jun', time: '10:00', title: 'Seguimiento del proyecto', location: 'Oficina' },
    ],
  };

  return (
    <div className="min-h-screen px-6 py-8 font-sans transition-colors" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
            {user.name[0]}
          </div>
          Buenas tardes, {user.name}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Consulta o busca cualquier información dentro de tu espacio de trabajo...
        </p>
      </div>

      {/* Filtro de búsqueda */}
      <div className="bg-[#2b2b2b] p-4 rounded-md mb-10 shadow" style={{ backgroundColor: 'var(--button-bg)' }}>
        <div className="flex flex-wrap gap-4 items-center">
          <select className="bg-[#1e1e1e] border border-gray-600 text-sm px-3 py-2 rounded text-white" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--input-border)' }}>
            <option>Consultar</option>
            <option>Crear</option>
            <option>Investigar</option>
          </select>
          <input
            type="text"
            placeholder="Buscar..."
            className="flex-1 border rounded px-3 py-2 text-sm"
            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--input-border)' }}
          />
          <button className="text-sm px-3 py-2 rounded hover:bg-gray-600" style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', borderColor: 'var(--button-border)', borderStyle: 'solid' }}>
            Todas las fuentes ✓
          </button>
        </div>
      </div>

      {/* Recientes + Eventos */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Páginas recientes */}
        <div>
          <h2 className="text-sm font-medium mb-2 text-gray-400">Páginas recientes</h2>
          <div className="flex gap-4">
            {user.recentPages.map((page, i) => (
              <div
                key={i}
                className="w-40 h-32 rounded-md flex flex-col justify-center items-center hover:bg-[#3a3a3a] transition cursor-pointer"
                style={{ backgroundColor: 'var(--button-bg)' }}
              >
                <div className="text-3xl mb-2">{page.icon}</div>
                <p className="text-sm font-semibold text-center" style={{ color: 'var(--text-color)' }}>{page.title}</p>
              </div>
            ))}
            <div className="w-40 h-32 rounded-md flex justify-center items-center text-gray-500 hover:bg-[#3a3a3a] transition cursor-pointer" style={{ backgroundColor: 'var(--button-bg)' }}>
              + Nueva página
            </div>
          </div>
        </div>

        {/* Eventos próximos */}
        <div>
          <h2 className="text-sm font-medium mb-2 text-gray-400">Próximos eventos</h2>
          <div className="rounded-md p-4 shadow-sm" style={{ backgroundColor: 'var(--button-bg)' }}>
            <p className="text-sm text-gray-300 mb-4">
              Conecta el Anotador con IA a los eventos de tu calendario.
              <br />
              <span className="text-blue-400 underline cursor-pointer">
                Conectar con Notion Calendar
              </span>
            </p>
            {user.events.map((event, i) => (
              <div key={i} className="mb-3">
                <p className="text-xs text-gray-400">{event.date}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.time} · {event.location}</p>
                  </div>
                  <button className="text-xs px-2 py-1 border rounded hover:bg-gray-700" style={{ borderColor: 'var(--button-border)', color: 'var(--button-text)' }}>
                    Unirse y tomar notas
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
