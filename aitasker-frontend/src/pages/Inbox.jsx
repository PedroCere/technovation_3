import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoRadioButtonOffOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";

const Inbox = () => {
  const { theme } = useTheme(); // Esto te permite hacer cambios si necesitas condicionales por tema
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Analize team workflow",
      completed: false,
      subtasks: ["Today"],
    },
    {
      id: 2,
      text: "Start My app",
      completed: false,
      subtasks: ["Obtén una recomendación especializada de Todoist", "Tomorrow"],
    },
    {
      id: 3,
      text: "Present new Package",
      completed: false,
      subtasks: ["ejemplo1", "Tomorrow"],
    },
  ]);

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addNewTask = () => {
    const newTask = {
      id: Date.now(),
      text: "Nueva tarea",
      completed: false,
      subtasks: [],
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="flex justify-center w-full min-h-full p-6 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">Inbox</h1>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 group hover:bg-[color:var(--border-color)] px-3 py-2 rounded transition-all w-full"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 text-[color:var(--text-color)] hover:text-[color:var(--primary-color)] transition-all p-0"
              >
                {task.completed ? (
                  <IoCheckmarkCircleOutline className="text-xl text-[color:var(--primary-color)]" />
                ) : (
                  <IoRadioButtonOffOutline className="text-xl" />
                )}
              </button>

              <div className="flex-1">
                <p
                  className={`font-medium text-sm ${
                    task.completed ? "line-through opacity-50" : ""
                  }`}
                >
                  {task.text}
                </p>

                {task.subtasks.length > 0 && (
                  <div className="flex flex-col mt-1 ml-1 text-xs text-[color:var(--text-color)] opacity-70 space-y-0.5">
                    {task.subtasks.map((sub, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaRegCalendarAlt className="text-[color:var(--primary-color-hover)]" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={addNewTask}
            className="mt-4 text-sm font-medium flex items-center gap-2 bg-[color:var(--primary-color)] hover:bg-[color:var(--primary-color-hover)] text-white px-4 py-1 rounded"
          >
            <span className="text-xl">＋</span> Add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
