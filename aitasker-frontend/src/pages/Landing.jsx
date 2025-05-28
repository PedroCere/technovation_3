import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/image.png";
import { useTheme } from "../context/ThemeContext";

export default function Landing() {
  const navigate = useNavigate();
  const { theme, setTheme, themes } = useTheme();

  // Colores representativos por tema
  const themeColors = {
    light: '#f3f4f6',
    dark: '#1f2937',
    cyan: '#06b6d4',
    purple: '#8b5cf6',
  };

  return (
    <section className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors flex flex-col items-center justify-center px-4 md:px-12">
      {/* Top Navigation */}
      <header className="w-full max-w-7xl flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-red-500 text-xl">AITasker</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#" className="hover:underline">Use Cases</a>
          <a href="#" className="hover:underline">Resources</a>
          <a href="#" className="hover:underline">Pricing</a>
          <button onClick={() => navigate('/login')} className="hover:underline">
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white text-sm font-bold py-2 px-4 rounded-full"
          >
            Try it free
          </button>

          {/* Theme Circles */}
          <div className="flex items-center gap-2 ml-4">
            {Object.keys(themes).map((key) => (
              <button
                key={key}
                onClick={() => setTheme(themes[key])}
                className={`w-5 h-5 rounded-full border-2 ${
                  theme === themes[key]
                    ? 'border-[var(--text-color)]'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: themeColors[key] }}
                title={themes[key]}
              />
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
        {/* Text Block */}
        <div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Clarity, finally.
          </h1>
          <p className="text-lg mb-6">
            Join over 50 million professionals simplifying work and life with the world’s #1 task list app.
          </p>

          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="App Store"
              className="w-5 h-5"
            />
            <p className="text-sm">Over 374K ★★★★★ ratings</p>
          </div>

          <button
            onClick={() => navigate('/register')}
            className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white font-semibold py-3 px-6 rounded-full text-base mb-1"
          >
            Try it free
          </button>

          <p className="text-sm text-pink-600">Take control of chaos in minutes!</p>
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
          {[
            { quote: "“Simple, straightforward, and super powerful.”", source: "THE VERGE" },
            { quote: "“The best to-do list app on the market.”", source: "PC" },
            { quote: "“Nothing short of stellar.”", source: "TechRadar" }
          ].map((item, index) => (
            <div key={index} className="text-center max-w-xs">
              <p className="italic mb-2">{item.quote}</p>
              <p className="text-xs font-bold opacity-70">{item.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
