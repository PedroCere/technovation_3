import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlayCircle, FiList, FiClock, FiZap } from 'react-icons/fi';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans px-6 py-12">
      {/* Hero */}
      <section className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1">
          <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            GESTIONA TU TIEMPO MEJOR
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 leading-tight">
            Organiza tu día con <span className="text-red-600">inteligencia.</span>
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            AItasker es una app de tareas potenciada por IA que te ayuda a enfocarte, priorizar y completar lo importante sin esfuerzo.
          </p>

          <div className="flex gap-4 mb-6">
            <Link
              to="/register"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-red-700 transition"
            >
              Empieza gratis
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition"
            >
              <FiPlayCircle className="w-4 h-4" />
              Inica sesión
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Únete a miles de personas que ya usan AItasker para planear mejor su tiempo.
          </p>
        </div>

        {/* Simulación gráfica */}
        <div className="flex-1">
          <div className="relative bg-lime-200 rounded-xl p-6 shadow-lg">
            <div className="bg-black text-white text-sm px-3 py-1 rounded-full absolute -top-4 left-4 shadow">
              Hoy
              <span className="ml-2 font-bold">5 tareas pendientes</span>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-sm font-semibold mb-4">Prioridades del día</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✅ Revisar correos importantes</li>
                <li>📌 Terminar presentación</li>
                <li>🧠 Sesión de estudio 45 min</li>
                <li>🏃 Caminata corta al mediodía</li>
                <li>📝 Planificar tareas de mañana</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes ficticios */}
      <section className="mt-16 mb-12 text-center">
        <p className="text-sm text-gray-500 mb-4">Confiado por equipos productivos en todo el mundo</p>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <span className="text-red-600 font-semibold">🧗 HabitFlow</span>
          <span className="text-blue-500 font-semibold">📘 FocusTrack</span>
          <span className="text-purple-500 font-semibold">📒 Listly</span>
          <span className="text-indigo-500 font-semibold">🔁 LoopTime</span>
          <span className="text-violet-600 font-semibold">🧠 MindTask</span>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
          <FiList className="text-red-600 w-6 h-6 mb-4" />
          <h4 className="font-semibold text-lg mb-2">Organiza sin esfuerzo</h4>
          <p className="text-sm text-gray-600">
            Crea tareas con prioridad automática, etiquetas inteligentes y recordatorios que realmente ayudan.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <FiClock className="text-blue-600 w-6 h-6 mb-4" />
          <h4 className="font-semibold text-lg mb-2">Optimiza tu día</h4>
          <p className="text-sm text-gray-600">
            La IA de AItasker analiza tu carga diaria y sugiere horarios ideales para cada tarea.
          </p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
          <FiZap className="text-yellow-600 w-6 h-6 mb-4" />
          <h4 className="font-semibold text-lg mb-2">Menos caos, más acción</h4>
          <p className="text-sm text-gray-600">
            Mantén el foco y reduce la procrastinación con flujos de trabajo guiados por inteligencia artificial.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
