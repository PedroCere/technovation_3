import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
        AItasker: Gestión Inteligente de Tareas
      </h1>
      <p className="text-secondary text-lg md:text-xl text-center max-w-2xl mb-10">
        Organiza tus tareas con la ayuda de la inteligencia artificial. Nuestra IA analiza tus pendientes y te sugiere cómo priorizar tu tiempo para que logres más, con menos esfuerzo.
      </p>
      <ul className="text-left text-sm text-secondary mb-10 space-y-2">
        <li>✅ Priorización automática de tareas</li>
        <li>✅ Sugerencias inteligentes de horarios</li>
        <li>✅ Análisis de urgencia y hábitos</li>
        <li>🔍 Potenciado por TensorFlow</li>
      </ul>
      <div className="flex gap-4">
        <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition">
          Iniciar sesión
        </Link>
        <Link to="/register" className="border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition">
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Landing;
