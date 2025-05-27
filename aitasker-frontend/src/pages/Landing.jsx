import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/image.png";
import { useTheme } from "../context/ThemeContext";

export default function Landing() {
  const navigate = useNavigate();
  const { theme, setTheme, themes } = useTheme();

  return (
    <section className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors flex flex-col items-center justify-center px-4 md:px-12">
      {/* Top Navigation */}
      <header className="w-full max-w-7xl flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <span className="font-semiboldtext-[var(--bg-color) text-xl">AITasker</span>
        </div>

        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#" className="hover:underline">Use Cases</a>
          <a href="#" className="hover:underline">Resources</a>
          <a href="#" className="hover:underline">Pricing</a>
          <button onClick={() => navigate('/login')} className="hover:underline">
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-[var(--button-bg)] hover:bg-red-600t text-[var(--text)]  text-sm font-bold py-2 px-4 rounded-full"
          >
            Try it free
          </button>
          {/* Theme Toggle */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="text-sm bg-[var(--button-bg)] border border-[var(--button-border)] rounded px-2 py-1 text-[var(--text-color)]"
          >
            {Object.keys(themes).map((key) => (
              <option key={key} value={themes[key]}>
                {themes[key][0].toUpperCase() + themes[key].slice(1)}
              </option>
            ))}
          </select>
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
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="App Store" className="w-5 h-5" />
            <p className="text-sm">Over 374K ★★★★★ ratings</p>
          </div>

          <button
            onClick={() => navigate('/register')}
            className="bg-[var(--button-bg)] hover-[var(--primary-color-hover)] text-[var(--text)] font-semibold py-3 px-6 rounded-full text-base mb-1"
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
