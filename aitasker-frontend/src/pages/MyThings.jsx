import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function MyThings() {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] text-sm transition-colors">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-xl font-bold mb-6">My Things 🎉</h1>

        <section className="mb-8">
          <h2 className="font-semibold mb-2">
            Routines <span className="text-xs opacity-70">2</span>
          </h2>
          <ul className="space-y-2 mb-2">
            <li className="flex items-start gap-2">
              <input type="radio" className="mt-1 accent-[var(--primary-color)]" />
              <div>
                <p>Review my tasks and goals weekly</p>
                <p className="text-xs text-[color:var(--label-text-purple)]">Sunday ↻</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <input type="radio" className="mt-1 accent-[var(--primary-color)]" />
              <div>
                <p><em>Add more personal routines</em></p>
                <p className="text-xs opacity-70">
                  e.g. pay taxes yearly, take out trash weekly, meditate 10 min every workday at 9am
                </p>
              </div>
            </li>
          </ul>
          <button className="text-[color:var(--primary-color)] hover:text-[color:var(--primary-color-hover)] font-medium">
            + Add task
          </button>
        </section>

        <section>
          <h2 className="font-semibold mb-2">
            Inspiration ✨ <span className="text-xs opacity-70">2</span>
          </h2>
          <ul className="space-y-2 mb-2">
            <li className="flex items-start gap-2">
              <input type="radio" className="mt-1 accent-[var(--primary-color)]" />
              <div>
                <a href="#" className="text-[color:var(--label-text-blue)] hover:underline">
                  7 real Todoist configurations to steal
                </a> <span className="text-xs opacity-70">(in English) 💡</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <input type="radio" className="mt-1 accent-[var(--primary-color)]" />
              <div>
                <a href="#" className="text-[color:var(--label-text-blue)] hover:underline">
                  Organize your family task list with Todoist (User Lessons)
                </a> <span className="text-xs opacity-70">(in English)</span>
              </div>
            </li>
          </ul>
          <button className="text-[color:var(--primary-color)] hover:text-[color:var(--primary-color-hover)] font-medium">
            + Add task
          </button>
        </section>
      </main>
    </div>
  );
}
