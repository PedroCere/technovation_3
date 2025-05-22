// features/ai/ProcrastinationDetector.jsx
import { useEffect, useState } from 'react';

const ProcrastinationDetector = ({ tasks }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const detectedAlerts = tasks
      .filter(task => task.postponedCount > 2)
      .map(task => ({
        taskId: task.id,
        message: `Has pospuesto esta tarea ${task.postponedCount} veces`,
        severity: task.postponedCount > 3 ? 'high' : task.postponedCount > 1 ? 'medium' : 'low'
      }));
    
    setAlerts(detectedAlerts);
  }, [tasks]);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800 border-l-4 border-red-500';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500';
      default: return 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Detector de Procrastinación
      </h3>
      
      {alerts.length === 0 ? (
        <div className="p-3 bg-green-100 text-green-800 rounded-lg border-l-4 border-green-500">
          ¡Buen trabajo! No hay tareas pospuestas recurrentemente.
        </div>
      ) : (
        alerts.map(alert => (
          <div 
            key={alert.taskId} 
            className={`p-3 rounded-r-lg ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start gap-2">
              {alert.severity === 'high' && (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              <div>
                <p className="font-medium">{alert.message}</p>
                <p className="text-sm mt-1">
                  {alert.severity === 'high' 
                    ? 'Prioridad máxima' 
                    : alert.severity === 'medium' 
                      ? 'Considera abordarla pronto' 
                      : 'Sugerencia de atención'}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProcrastinationDetector;