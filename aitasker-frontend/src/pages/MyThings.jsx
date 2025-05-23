import React from "react";

export default function MyThings() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-sm">
    

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-xl font-bold mb-6">My Things 🎉</h1>

        <section className="mb-8">
          <h2 className="font-semibold text-gray-800 mb-2">Routines <span className="text-xs text-gray-500">2</span></h2>
          <ul className="space-y-2 mb-2">
            <li className="flex items-start gap-2">
              <input type="radio" className="mt-1" />
              <div>
                <p>Review my tasks and goals weekly</p>
                <p className="text-xs text-purple-600">Sunday ↻</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <input type="radio" className="mt-1" />
              <div>
                <p><em>Add more personal routines</em></p>
                <p className="text-xs text-gray-500">e.g. pay taxes yearly, take out trash weekly, meditate 10 min every workday at 9am</p>
              </div>
            </li>
          </ul>
          <button className="text-red-500 font-medium">+ Add task</button>
        </section>

        <section>
          <h2 className="font-semibold text-gray-800 mb-2">Inspiration ✨ <span className="text-xs text-gray-500">2</span></h2>
          <ul className="space-y-2 mb-2">
            <li className="flex items-start gap-2">
              <input type="radio" className="mt-1" />
              <div>
                <a href="#" className="text-blue-600 hover:underline">
                  7 real Todoist configurations to steal
                </a> <span className="text-xs">(in English) 💡</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <input type="radio" className="mt-1" />
              <div>
                <a href="#" className="text-blue-600 hover:underline">
                  Organize your family task list with Todoist (User Lessons)
                </a> <span className="text-xs">(in English)</span>
              </div>
            </li>
          </ul>
          <button className="text-red-500 font-medium">+ Add task</button>
        </section>
      </main>
    </div>
  );
}
