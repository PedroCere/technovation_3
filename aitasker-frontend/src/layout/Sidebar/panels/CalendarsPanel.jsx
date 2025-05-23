import React, { useState } from 'react';
import { CalendarDays, CalendarClock, ChevronLeft, ChevronRight, X } from 'lucide-react';

const tasks = [
  { date: '2025-05-27', title: 'Finalize presentation' },
  { date: '2025-05-28', title: 'Team meeting' },
  { date: '2025-06-01', title: 'Submit report' },
];

const getMonthDays = (year, month) => {
  const days = [];
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }
  return days;
};

const CalendarsPanel = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  const days = getMonthDays(currentYear, currentMonth);

  const tasksByDate = tasks.reduce((acc, task) => {
    const taskDate = new Date(task.date);
    if (taskDate.getFullYear() === currentYear && taskDate.getMonth() === currentMonth) {
      const day = taskDate.getDate();
      if (!acc[day]) acc[day] = [];
      acc[day].push(task);
    }
    return acc;
  }, {});

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-6 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold text-gray-800">
            Calendar – {monthName} {currentYear}
          </h2>
        </div>
        <div className="flex gap-2">
          <button onClick={goToPreviousMonth} className="p-1 rounded hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={goToNextMonth} className="p-1 rounded hover:bg-gray-100">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 text-sm text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="font-medium text-gray-500">{d}</div>
        ))}

        {days.map((day, index) => {
          const hasTasks = tasksByDate[day]?.length > 0;
          return (
            <div
              key={index}
              className={`h-28 border rounded-lg p-2 text-left text-xs cursor-pointer transition ${
                day ? 'bg-gray-50 hover:bg-gray-100' : 'bg-transparent cursor-default'
              } ${hasTasks ? 'border-red-400' : 'border-gray-200'}`}
              onClick={() => day && hasTasks && setSelectedDay(day)}
            >
              {day && <div className="font-bold text-gray-700">{day}</div>}
            </div>
          );
        })}
      </div>

      {selectedDay && tasksByDate[selectedDay] && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setSelectedDay(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Tasks for {monthName} {selectedDay}, {currentYear}</h3>
            <ul className="space-y-2">
              {tasksByDate[selectedDay].map((task, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CalendarClock className="w-4 h-4 text-blue-500" /> {task.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarsPanel;
