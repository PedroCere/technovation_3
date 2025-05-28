import React, { useState, useEffect } from "react";
import {
  IoRadioButtonOffOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { getTasks } from "../services/taskService";
import { format, parseISO, isValid } from "date-fns";

const mockTasks = [
  {
    id: 1,
    title: "Mock Task 1",
    dueDate: new Date().toISOString(),
    completed: false,
    subtasks: [],
  },
  {
    id: 2,
    title: "Mock Task 2",
    dueDate: new Date().toISOString(),
    completed: true,
    subtasks: [],
  },
];

const Upcoming = () => {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const groupTasksByDate = (tasks) => {
    const grouped = tasks.reduce((acc, task) => {
      let dateKey = "No Date";
      if (task.dueDate) {
        const parsedDate = parseISO(task.dueDate);
        if (isValid(parsedDate)) {
          dateKey = format(parsedDate, "MMM dd - EEEE");
        }
      }
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(task);
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, tasks]) => ({
      date,
      tasks,
    }));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setDays(groupTasksByDate(data));
        setError(null);
      } catch (err) {
        console.error("Backend failed. Using mock data.");
        setError("Backend unavailable — showing mock data.");
        setDays(groupTasksByDate(mockTasks));
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleTask = (dayIndex, taskId) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].tasks = updatedDays[dayIndex].tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setDays(updatedDays);
  };

  const addNewTask = (dayIndex) => {
    const newTask = {
      id: Date.now(),
      title: "New Task",
      completed: false,
      dueDate: new Date().toISOString(),
    };
    const updatedDays = [...days];
    updatedDays[dayIndex].tasks.push(newTask);
    setDays(updatedDays);
  };

  if (loading) {
    return (
      <div className="flex justify-center w-full min-h-full p-6 text-[var(--text-color)]">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full min-h-full p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-[var(--text-color)]">
          Upcoming
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded">
            ⚠️ {error}
          </div>
        )}

        {/* Calendar Header */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
            May 2025
          </h2>
          <div className="grid grid-cols-7 gap-px bg-[var(--border-color)]">
            {[
              "Sun 18",
              "Mon 19",
              "Tue 20",
              "Wed 21",
              "Thu 22",
              "Fri 23",
              "Sat 24",
            ].map((day, i) => (
              <div
                key={i}
                className="bg-[var(--bg-color)] p-2 text-sm font-medium text-[var(--text-color)]"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-[var(--border-color)] mt-px">
            <div className="col-span-6 bg-[var(--bg-color)] p-2 flex items-center">
              <span className="text-red-500 font-medium">Overdue</span>
            </div>
            <div className="bg-[var(--bg-color)] p-2 text-right text-red-500 font-medium">
              Reschedule
            </div>
          </div>
        </div>

        {/* Tasks grouped by date */}
        <div className="space-y-6">
          {days.map((day, dayIndex) => (
            <div
              key={day.date}
              className="bg-[var(--bg-color)] rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-[var(--text-color)]">
                  {day.date}
                </h3>
              </div>

              <div className="space-y-2">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 group hover:bg-[var(--border-color)] px-2 py-1.5 rounded"
                  >
                    <button
                      onClick={() => toggleTask(dayIndex, task.id)}
                      className="text-[var(--text-color)] hover:text-red-500 transition-all"
                    >
                      {task.completed ? (
                        <IoCheckmarkCircleOutline className="text-xl text-red-500" />
                      ) : (
                        <IoRadioButtonOffOutline className="text-xl" />
                      )}
                    </button>
                    <span
                      className={`text-sm ${
                        task.completed
                          ? "line-through opacity-50"
                          : "text-[var(--text-color)]"
                      }`}
                    >
                      {task.title || task.text}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addNewTask(dayIndex)}
                className="mt-2 text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2"
              >
                <span className="text-xl">+</span> Add task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
