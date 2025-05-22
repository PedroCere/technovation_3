import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';

const StatsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <FiBarChart2 size={28} />
        <h1 className="text-3xl font-bold">Estadísticas de Productividad</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
        Revisá tus avances semanales, hábitos de trabajo y rendimiento según IA.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">Tareas completadas esta semana</p>
          <p className="text-3xl font-bold text-green-500">12</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">Horas activas por día</p>
          <p className="text-3xl font-bold text-blue-500">4.5h</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">Porcentaje de tareas urgentes</p>
          <p className="text-3xl font-bold text-red-500">35%</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
