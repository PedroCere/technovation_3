import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoRadioButtonOffOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const Today = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Task",
      completed: false,
      subtasks: []
    },
    {
      id: 2,
      text: "Overview",
      completed: true,
      subtasks: []
    },
    {
      id: 3,
      text: "Developer publications x.commitmentata adecovate para [ ], [x], [x], [x]",
      completed: false,
      subtasks: ["Presently", "Next: 0"]
    }
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
      subtasks: []
    };
    setTasks([...tasks, newTask]);
  };

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
                  {task.text}
                </p>

                {task.subtasks.length > 0 && (
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

          <button
            onClick={addNewTask}
            className="mt-4 text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2 px-4 py-1 rounded"
          >
            <span className="text-xl">+</span> Add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Today;