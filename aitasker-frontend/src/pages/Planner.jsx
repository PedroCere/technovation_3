// features/planner/Planner.jsx
import { useState } from 'react';
import TaskList from '../features/tasks/TaskList';
import SmartCalendar from '../features/calendar/SmartCalendar';
import AutoPlanner from '../features/ai/AutoPlanner';

// Datos mockeados
const mockTasks = [
  {
    id: 1,
    title: 'Revisar documentación técnica',
    description: 'Revisar los últimos cambios en la documentación del API',
    dueDate: '2024-03-25',
    priority: 'high',
    label: 'Trabajo',
    status: 'in-progress',
    postponedCount: 0
  },
  {
    id: 2,
    title: 'Preparar presentación mensual',
    description: 'Recopilar métricas y preparar slides ejecutivos',
    dueDate: '2024-03-28',
    priority: 'medium',
    label: 'Reuniones',
    status: 'todo',
    postponedCount: 2
  },
  {
    id: 3,
    title: 'Actualizar dependencias del proyecto',
    description: 'Actualizar paquetes NPM a sus últimas versiones estables',
    dueDate: '2024-04-01',
    priority: 'low',
    label: 'Desarrollo',
    status: 'done',
    postponedCount: 1
  },
  {
    id: 4,
    title: 'Revisar propuesta de diseño UI',
    description: 'Feedback para el equipo de diseño sobre nuevos componentes',
    dueDate: '2024-03-26',
    priority: 'medium',
    label: 'Revisión',
    status: 'todo',
    postponedCount: 3
  }
];

const Planner = () => {
  const [view, setView] = useState('list');
  const [tasks, setTasks] = useState(mockTasks);

  // Convertir tareas a eventos para el calendario
  const calendarEvents = tasks.map(task => ({
    title: task.title,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    allDay: true,
    meta: {
      priority: task.priority,
      status: task.status
    }
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg ${
              view === 'list' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Lista
          </button>
          <button 
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg ${
              view === 'calendar' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Calendario
          </button>
        </div>

        {view === 'list' ? (
          <TaskList tasks={tasks} />
        ) : (
          <SmartCalendar view="week" events={calendarEvents} />
        )}
      </div>

      <div className="space-y-6">
        <AutoPlanner tasks={tasks} />
        {/* Sección adicional para widgets */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-medium mb-3">Resumen Semanal</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tareas completadas:</span>
              <span className="text-red-500">3/5</span>
            </div>
            <div className="flex justify-between">
              <span>Tiempo promedio:</span>
              <span className="text-red-500">2.4h/día</span>
            </div>
            <div className="flex justify-between">
              <span>Productividad:</span>
              <span className="text-red-500">78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;