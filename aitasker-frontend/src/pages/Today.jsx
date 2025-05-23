import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoRadioButtonOffOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { getTasks } from "../services/taskService";

const Today = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  if (loading) {
    return <div className="flex justify-center w-full min-h-full p-6">Loading tasks...</div>;
  }

  if (error) {
    return <div className="flex justify-center w-full min-h-full p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="flex justify-center w-full min-h-full p-6">
      <div className="max-w-4xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold">Today</h1>
          <span className="text-sm text-gray-500">May 21 - Today - Wednesday</span>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 group hover:bg-gray-100 dark:hover:bg-white/5 px-3 py-2 rounded transition-all w-full"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 text-gray-400 hover:text-red-500 transition-all p-0"
              >
                {task.completed ? (
                  <IoCheckmarkCircleOutline className="text-xl text-red-500" />
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
                  {task.title || task.text}
                </p>

                {task.subtasks && task.subtasks.length > 0 && (
                  <div className="flex flex-col mt-1 ml-1 text-xs text-gray-500 space-y-0.5">
                    {task.subtasks.map((sub, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-gray-400">-</span>
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Today;
