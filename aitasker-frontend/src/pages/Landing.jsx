import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
        AItasker: Gestión Inteligente de Tareas
      </h1>
      <p className="text-gray-600 text-lg md:text-xl text-center max-w-2xl mb-10">
        Organiza tus tareas con la ayuda de la inteligencia artificial. Nuestra IA analiza tus pendientes y te sugiere cómo priorizar tu tiempo para que logres más, con menos esfuerzo.
      </p>
      <ul className="text-left text-sm text-gray-600 mb-10 space-y-2">
        <li>✅ Priorización automática de tareas</li>
        <li>✅ Sugerencias inteligentes de horarios</li>
        <li>✅ Análisis de urgencia y hábitos</li>
        <li>🔍 Potenciado por TensorFlow</li>
      </ul>
      <div className="flex gap-4">
        <Link to="/login" className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
          Iniciar sesión
        </Link>
        <Link to="/register" className="border border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Landing;
