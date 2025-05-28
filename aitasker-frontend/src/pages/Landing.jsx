import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Landing() {
  const navigate = useNavigate();
  const { theme, setTheme, themes } = useTheme();

  React.useEffect(() => {
    setTheme(themes.dark);
  }, [setTheme, themes]);

  const themeColors = {
    light: "#111827",
    dark: "#f9fafb",
    cyan: "#06b6d4",
    purple: "#8b5cf6",
  };

  const primaryColor = themeColors[theme];

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fullScreen: { enable: false },
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: "#888" },
      shape: { type: "circle" },
      opacity: { value: 0.15 },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none",
        outMode: "bounce",
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true,
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.2 } },
      },
    },
    detectRetina: true,
  };

  return (
    <section className="relative bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen transition-colors overflow-hidden">
      {/* Fondo animado */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 px-6 py-8">
        {/* NAVBAR */}
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-16">
          <span
            className="text-2xl font-bold"
            style={{ color: primaryColor }}
          >
            AITasker
          </span>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="hover:underline">Services</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Use Cases</a>
            <a href="#" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">Blog</a>
            <button
              onClick={() => navigate("/register")}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white px-4 py-2 rounded-md font-semibold"
            >
              Register/Log in
            </button>
            <div className="flex gap-2 ml-4">
              {Object.keys(themes).map((key) => (
                <button
                  key={key}
                  onClick={() => setTheme(themes[key])}
                  className={`w-5 h-5 rounded-full border-2 ${
                    theme === themes[key]
                      ? "border-[var(--text-color)]"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: themeColors[key] }}
                  title={themes[key]}
                />
              ))}
            </div>
          </nav>
        </div>

        {/* HERO */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              All your tasks in one place.
            </h1>
            <p className="text-base md:text-lg mb-6 max-w-md opacity-90">
              Organize, prioritize, and achieve your goals effortlessly. Stop
              worrying about what you need to do and start enjoying the feeling
              of productivity.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white font-semibold py-3 px-6 rounded-lg text-base shadow-md"
            >
              Try Now
            </button>
          </div>

          {/* Ilustración simulada */}
          <div className="flex flex-col space-y-6">
            {[30, 80, 60].map((value, i) => (
              <div
                key={i}
                className="w-full h-10 bg-[var(--input-bg)] rounded-md overflow-hidden shadow border border-[var(--border-color)]"
              >
                <div
                  className="h-full bg-[var(--primary-color)]"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div className="max-w-7xl mx-auto px-0 py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="bg-[var(--primary-color)] text-white px-2 py-1 rounded">
              Services
            </span>
          </h2>
          <p className="text-sm md:text-base text-[var(--text-color)]/80 mb-10">
            At AITasker, we offer a range of tools to help you take control of
            your time and productivity:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Project organization",
                desc: "Manage multiple projects effortlessly",
                bg: "bg-[var(--input-bg)] text [var-(bg-color)]",
              },
              {
                title: "Task management",
                desc: "Organize your tasks with ease",
                bg: "bg-[var(--primary-color)] text-white",
              },
              {
                title: "Comments & Collaboration",
                desc: "Collaborate with your team through comments",
                bg: "bg-[var(--text-color)] text-[var(--bg-color)]",
              },
              {
                title: "Real-time Notifications",
                desc: "Stay updated with real-time alerts",
                bg: "bg-[var(--input-bg)]",
              },
              {
                title: "Deadline Tracking",
                desc: "Never miss a deadline",
                bg: "bg-[var(--primary-color)] text-white",
              },
              {
                title: "Progress Monitoring",
                desc: "Track your progress effortlessly",
                bg: "bg-[var(--text-color)] text-[var(--bg-color)]",
              },
            ].map(({ title, desc, bg }, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl shadow border border-[var(--border-color)] ${bg}`}
              >
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm opacity-80">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-[var(--primary-color)] text-[var(--bg-color)] mt-20 pt-12 pb-6 px-6 rounded-t-3xl">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AITasker</h3>
              <p className="text-sm opacity-80 mb-2">Contact us:</p>
              <p className="text-sm mb-1">📧 support@aitasker.com</p>
              <p className="text-sm mb-1">📞 +1 (800) 123-4567</p>
              <p className="text-sm mb-1">🏢 123 Productivity Ave, Remote City</p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-semibold mb-2">Quick links</h4>
              <a href="#" className="text-white hover:underline">About us</a>
              <a href="#" className="text-white hover:underline">Services</a>
              <a href="#" className="text-white hover:underline">Use Cases</a>
              <a href="#" className="text-white hover:underline">Pricing</a>
              <a href="#" className="text-white hover:underline">Blog</a>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Subscribe to news</h4>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 rounded bg-[var(--input-bg)] text-[var(--text-color)] border border-[var(--border-color)]"
                />
                <button
                  type="submit"
                  className="bg-[var(--input-bg)] hover:bg-[var(--primary-color-hover)] text-[var(--primary-color)] font-semibold py-2 px-4 rounded"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-[var(--border-color)] mt-10 pt-4 text-xs text-center opacity-60">
            © {new Date().getFullYear()} AITasker. All rights reserved. •{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
