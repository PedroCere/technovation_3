import { useState } from "react";
import { IoRadioButtonOffOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const Upcoming = () => {
  const [days, setDays] = useState([
    {
      date: "May 21 - Today - Wednesday",
      tasks: [
        { id: 1, text: "Descargar aplicaciones y complementos adicionales para", completed: false },
        { id: 2, text: "Yes", completed: true },
        { id: 3, text: "Y", completed: false }
      ]
    },
    {
      date: "May 22 - Tomorrow - Thursday",
      tasks: []
    },
    {
      date: "May 23 - Friday",
      tasks: []
    },
    {
      date: "May 24 - Saturday",
      tasks: []
    },
    {
      date: "May 25 - Sunday",
      tasks: [
        { id: 4, text: "Hacer una revisión semanal de mis tareas y objetivos", completed: false },
        { id: 5, text: "No", completed: false },
        { id: 6, text: "Mis Cosas", completed: false },
        { id: 7, text: "/ Ruinas", completed: false }
      ]
    },
    {
      date: "May 26 - Monday",
      tasks: []
    }
  ]);

  const toggleTask = (dayIndex, taskId) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].tasks = updatedDays[dayIndex].tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setDays(updatedDays);
  };

  const addNewTask = (dayIndex) => {
    const newTask = {
      id: Date.now(),
      text: "Nueva tarea",
      completed: false
    };
    const updatedDays = [...days];
    updatedDays[dayIndex].tasks.push(newTask);
    setDays(updatedDays);
  };

  return (
    <div className="flex justify-center w-full min-h-full p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">Upcoming</h1>

        {/* Calendar Header */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">May 2025</h2>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {["Sun 18", "Mon 19", "Tue 20", "Wed 21", "Thu 22", "Fri 23", "Sat 24"].map((day, i) => (
              <div key={i} className="bg-white p-2 text-sm font-medium">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-200 mt-px">
            <div className="col-span-6 bg-white p-2 flex items-center">
              <span className="text-red-500 font-medium">Overdue</span>
            </div>
            <div className="bg-white p-2 text-right text-red-500 font-medium">
              Reschedule
            </div>
          </div>
        </div>

        {/* Days List */}
        <div className="space-y-6">
          {days.map((day, dayIndex) => (
            <div key={day.date} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-700">{day.date}</h3>
              </div>
              
              <div className="space-y-2">
                {day.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 group hover:bg-gray-50 px-2 py-1.5 rounded">
                    <button
                      onClick={() => toggleTask(dayIndex, task.id)}
                      className="text-gray-400 hover:text-red-500 transition-all"
                    >
                      {task.completed ? (
                        <IoCheckmarkCircleOutline className="text-xl text-red-500" />
                      ) : (
                        <IoRadioButtonOffOutline className="text-xl" />
                      )}
                    </button>
                    <span className={`text-sm ${task.completed ? 'line-through opacity-50' : 'text-gray-700'}`}>
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addNewTask(dayIndex)}
                className="mt-2 text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2"
              >
                <span className="text-xl">+</span>
                Add task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;