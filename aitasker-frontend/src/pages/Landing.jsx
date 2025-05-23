import React from "react";
import Image from "../assets/image.png"

export default function Landing() {
  return (
    <section className="bg-white min-h-screen flex flex-col items-center justify-center px-4 md:px-12">
      {/* Top Navigation */}
      <header className="w-full max-w-7xl flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-red-500 text-xl">AITasker</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
          <a href="#" className="hover:underline">Usos</a>
          <a href="#" className="hover:underline">Recursos</a>
          <a href="#" className="hover:underline">Precios</a>
          <a href="#" className="hover:underline">Iniciar sesión</a>
          <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-full">
            Pruébala gratis
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
        {/* Text Block */}
        <div>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Claridad, por fin.
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Únete a los más de 50 millones de profesionales que simplifican el trabajo y la vida con la aplicación de listas de tareas n.º 1 del mundo.
          </p>

          <div className="flex items-center gap-2 mb-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="App Store" className="w-5 h-5" />
            <p className="text-gray-600 text-sm">Más de 374 mil valoraciones de ★★★★★</p>
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full text-base mb-1">
            Pruébala gratis
          </button>

          <p className="text-sm text-pink-600">¡Controla el caos en cuestión de minutos!</p>
        </div>

        {/* Image Block */}
        <div className="flex justify-center">
          <img
            src={Image} 
            alt="Demo screen"
            className="rounded-xl shadow-2xl w-full max-w-lg"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-6xl px-4 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          <div className="text-center max-w-xs">
            <p className="italic text-gray-800 mb-2">“Simple, directa y superpoderosa”</p>
            <p className="text-xs font-bold text-gray-600">THE VERGE</p>
          </div>
          <div className="text-center max-w-xs">
            <p className="italic text-gray-800 mb-2">
              “La mejor app de listas de tareas pendientes del mercado”
            </p>
            <p className="text-xs font-bold text-gray-600">PC</p>
          </div>
          <div className="text-center max-w-xs">
            <p className="italic text-gray-800 mb-2">“Nada menos que estelar”</p>
            <p className="text-xs font-bold text-gray-600">TechRadar</p>
          </div>
        </div>
      </div>
    </section>
  );
}