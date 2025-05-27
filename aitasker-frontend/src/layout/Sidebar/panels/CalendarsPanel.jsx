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
    <div className="max-w-5xl mx-auto p-6 rounded-xl shadow space-y-6 relative" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>
            Calendar – {monthName} {currentYear}
          </h2>
        </div>
        <div className="flex gap-2">
          <button onClick={goToPreviousMonth} className="p-1 rounded hover:bg-[var(--button-bg-hover)]" style={{ backgroundColor: 'var(--button-bg)' }}>
            <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-color)' }} />
          </button>
          <button onClick={goToNextMonth} className="p-1 rounded hover:bg-[var(--button-bg-hover)]" style={{ backgroundColor: 'var(--button-bg)' }}>
            <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-color)' }} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 text-sm text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="font-medium" style={{ color: 'var(--button-text)' }}>{d}</div>
        ))}

        {days.map((day, index) => {
          const hasTasks = tasksByDate[day]?.length > 0;
          return (
            <div
              key={index}
              className={`h-28 border rounded-lg p-2 text-left text-xs cursor-pointer transition ${
                day ? 'hover:bg-[var(--button-bg-hover)]' : 'bg-transparent cursor-default'
              }`}
              style={{
                backgroundColor: day ? 'var(--button-bg)' : 'transparent',
                borderColor: hasTasks ? 'var(--primary-color)' : 'var(--border-color)',
                color: 'var(--text-color)'
              }}
              onClick={() => day && hasTasks && setSelectedDay(day)}
            >
              {day && <div className="font-bold" style={{ color: 'var(--text-color)' }}>{day}</div>}
            </div>
          );
        })}
      </div>

      {selectedDay && tasksByDate[selectedDay] && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-full max-w-md rounded-xl shadow-xl p-6 relative" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <button
              onClick={() => setSelectedDay(null)}
              className="absolute top-3 right-3 hover:text-red-600"
              style={{ color: 'var(--button-text)' }}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Tasks for {monthName} {selectedDay}, {currentYear}</h3>
            <ul className="space-y-2">
              {tasksByDate[selectedDay].map((task, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-color)' }}>
                  <CalendarClock className="w-4 h-4" style={{ color: 'var(--primary-color)' }} /> {task.title}
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
