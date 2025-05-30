import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoRadioButtonOffOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { getTasks } from "../services/taskService";
import { useTheme } from "../context/ThemeContext";

const mockTasks = [
  { id: 1, title: 'Mock Task 1', dueDate: new Date().toISOString(), completed: false, subtasks: [] },
  { id: 2, title: 'Mock Task 2', dueDate: new Date().toISOString(), completed: true, subtasks: [] },
];

const Today = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const filteredTasks = data.filter(task =>
          task.dueDate?.startsWith(todayStr)
        );
        setTasks(filteredTasks);
        setError(null);
      } catch (err) {
        setError("Failed to load tasks, showing mock data");
        setTasks(mockTasks);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const toggleTask = (taskId) => {
    setTasks(prev =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const textColor = "var(--text-color)";
  const primaryColor = "var(--primary-color)";
  const hoverBg = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f3f4f6';

  if (loading) {
    return <div className="flex justify-center w-full min-h-full p-6" style={{ color: textColor }}>Loading tasks...</div>;
  }

  return (
  <div
  className="flex justify-center w-full min-h-full p-6"
  style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
>


      <div className="max-w-4xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold" style={{ color: textColor }}>Today</h1>
          <span className="text-sm" style={{ color: "var(--text-color)", opacity: 0.6 }}>
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {error && (
          <div className="mb-4" style={{ color: "red" }}>
            {error}
          </div>
        )}

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 group px-3 py-2 rounded transition-all w-full"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 transition-all p-0"
                style={{
                  color: task.completed ? primaryColor : 'var(--text-color)',
                }}
              >
                {task.completed ? (
                  <IoCheckmarkCircleOutline className="text-xl" />
                ) : (
                  <IoRadioButtonOffOutline className="text-xl" />
                )}
              </button>

              <div className="flex-1">
                <p
                  className={`font-medium text-sm`}
                  style={{
                    color: textColor,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    opacity: task.completed ? 0.5 : 1,
                  }}
                >
                  {task.title || task.text}
                </p>

                {task.subtasks?.length > 0 && (
                  <div className="flex flex-col mt-1 ml-1 text-xs space-y-0.5" style={{ color: "gray" }}>
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
