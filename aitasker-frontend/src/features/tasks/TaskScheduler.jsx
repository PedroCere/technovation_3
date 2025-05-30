import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { 
  format, 
  parse, 
  startOfWeek, 
  getDay, 
  parseISO,
  addHours
} from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';
import { useTheme } from '../../context/ThemeContext'; // Adjust import path as needed

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // Start week on Monday
  getDay,
  locales
});

const views = {
  month: true,
  week: true,
  day: true,
  agenda: true
};

const TaskScheduler = ({ tasks }) => {
  const { theme } = useTheme();
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const events = tasks.map(task => ({
    title: task.title,
    start: parseISO(task.dueDate),
    end: addHours(parseISO(task.dueDate), 1), // 1 hour duration
    allDay: false,
    resource: task
  }));

  // Custom event styling
  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        borderRadius: '4px',
        border: 'none',
        fontSize: '0.85rem',
        padding: '2px 5px'
      }
    };
  };

  // Custom toolbar with view switcher
  const CustomToolbar = ({ onNavigate, label }) => {
    const handleViewChange = (newView) => {
      setView(newView);
    };

    const navigate = (action) => {
      onNavigate(action);
    };

    return (
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 p-2 rounded-lg"
        style={{
          backgroundColor: 'var(--button-bg)',
          border: '1px solid var(--border-color)'
        }}
      >
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <button 
            onClick={() => navigate('PREV')}
            className="px-3 py-1 rounded"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              border: '1px solid var(--border-color)'
            }}
          >
            &lt;
          </button>
          <button 
            onClick={() => navigate('TODAY')}
            className="px-3 py-1 rounded"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              border: '1px solid var(--border-color)'
            }}
          >
            Today
          </button>
          <button 
            onClick={() => navigate('NEXT')}
            className="px-3 py-1 rounded"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              border: '1px solid var(--border-color)'
            }}
          >
            &gt;
          </button>
          <span className="font-medium">{label}</span>
        </div>
        
        <div className="flex space-x-1">
          {Object.keys(views).map(v => (
            <button
              key={v}
              onClick={() => handleViewChange(v)}
              className={`px-3 py-1 rounded capitalize ${
                view === v ? 'font-bold' : ''
              }`}
              style={{
                backgroundColor: view === v 
                  ? 'var(--primary-color)' 
                  : 'var(--button-bg)',
                color: view === v 
                  ? 'white' 
                  : 'var(--button-text)',
                border: '1px solid var(--border-color)'
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ 
          height: '100%',
          color: 'var(--text-color)'
        }}
        components={{
          toolbar: CustomToolbar
        }}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        eventPropGetter={eventStyleGetter}
        messages={{
          today: 'Today',
          previous: 'Back',
          next: 'Next',
          month: 'Month',
          week: 'Week',
          day: 'Day',
          agenda: 'Agenda',
          showMore: total => `+${total} more`
        }}
      />
    </div>
  );
};

export default TaskScheduler;