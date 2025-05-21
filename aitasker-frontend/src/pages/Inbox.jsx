import React from 'react';
import { useState } from "react";

const Inbox = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Disclaimer adicionalmente y complementos adicionales para m o n, m",
      completed: false,
      subtasks: []
    },
    {
      id: 2,
      text: "Título",
      completed: false,
      subtasks: []
    },
    {
      id: 3,
      text: "Físico en que los métodos de consideración del",
      completed: false,
      subtasks: [
        "Óndice con recomendación especializada de Tabelas"
      ]
    },
    {
      id: 4,
      text: "Documento",
      completed: false,
      subtasks: []
    },
    {
      id: 5,
      text: "Emplea un proyecto",
      completed: false,
      subtasks: ["operacional"]
    },
    {
      id: 6,
      text: "Documento",
      completed: false,
      subtasks: []
    }
  ]);

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
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
    <div className="flex h-screen">
  
      
      <div className="flex-1 p-8 overflow-auto bg-[#f5f6fa]">
        <h1 className="text-2xl font-QuicksandMedium text-[#2d3436] mb-6">Inbox</h1>
        
        <div className="bg-white rounded-lg p-6 space-y-3 max-w-3xl">
          {tasks.map((task) => (
            <div key={task.id} className="group">
              <div className="flex items-start gap-3 hover:bg-white/50 p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 w-5 h-5 text-red-500 border-2 border-gray-300 rounded-md focus:ring-red-500 cursor-pointer"
                />
                <div className="flex-1">
                  <span className={`text-gray-700 text-base ${task.completed ? 'line-through opacity-50' : ''}`}>
                    {task.text}
                  </span>
                  {task.subtasks.map((subtask, index) => (
                    <div key={index} className="ml-8 mt-1 flex items-center gap-2">
                      <span className="text-gray-400 text-sm">-</span>
                      <span className="text-gray-500 text-sm">{subtask}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={addNewTask}
            className="mt-4 text-red-500 hover:text-red-600 flex items-center gap-2 text-sm font-QuicksandMedium transition-colors"
          >
            <span className="text-lg">+</span>
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inbox;