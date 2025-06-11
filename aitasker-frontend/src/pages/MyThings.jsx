import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function MyThings() {
  const { theme } = useTheme();

  return (
    <motion.main
      className="min-h-screen px-6 py-10 font-sans transition-colors"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="mb-10">
        <h1 className="text-2xl font-bold">My Things 🎉</h1>
      </header>

      <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
        {/* Routines Section */}
        <section className="bg-[var(--button-bg)] border border-[var(--border-color)] rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Routines <span className="text-sm opacity-70">2</span>
          </h2>
          <ul className="space-y-4 mb-4">
            <li className="flex items-start gap-3">
              <input type="radio" className="mt-1 accent-[var(--primary-color)]" />
              <div>
                <p>Review my tasks and goals weekly</p>
                <p className="text-xs text-[color:var(--label-text-purple)]">Sunday ↻</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <input type="radio" className="mt-1 accent-[var(--primary-color)]" />
              <div>
                <p><em>Add more personal routines</em></p>
                <p className="text-xs opacity-70">
                  e.g. pay taxes yearly, take out trash weekly, meditate 10 min every workday at 9am
                </p>
              </div>
            </li>
          </ul>
          <button className="text-[color:var(--primary-color)] hover:text-[color:var(--primary-color-hover)] font-medium text-sm">
            + Add routine
          </button>
        </section>

        {/* Inspiration Section */}
        <section className="bg-[var(--button-bg)] border border-[var(--border-color)] rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Inspiration ✨ <span className="text-sm opacity-70">2</span>
          </h2>
          <ul className="space-y-4 mb-4">
            <li className="flex items-start gap-3">
              <input type="radio" className="mt-1 accent-[var(--primary-color)]" />
              <div>
                <a href="#" className="text-[color:var(--label-text-blue)] hover:underline">
                  7 real Todoist configurations to steal
                </a>
                <span className="text-xs opacity-70 ml-1">(in English) 💡</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <input type="radio" className="mt-1 accent-[var(--primary-color)]" />
              <div>
                <a href="#" className="text-[color:var(--label-text-blue)] hover:underline">
                  Organize your family task list with Todoist (User Lessons)
                </a>
                <span className="text-xs opacity-70 ml-1">(in English)</span>
              </div>
            </li>
          </ul>
          <button className="text-[color:var(--primary-color)] hover:text-[color:var(--primary-color-hover)] font-medium text-sm">
            + Add inspiration
          </button>
        </section>
      </div>
    </motion.main>
  );
}
