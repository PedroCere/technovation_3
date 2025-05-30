// features/tasks/TaskScheduler.jsx
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, parseISO } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import es from 'date-fns/locale/es';

const locales = {
  'es': es
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const TaskScheduler = ({ tasks }) => {
  const events = tasks.map(task => ({
    title: task.title,
    start: parseISO(task.dueDate),
    end: parseISO(task.dueDate),
    allDay: true
  }));

  // Create a set of event dates for quick lookup
  const eventDates = new Set(events.map(event => event.start.toDateString()));

  // Function to style day cells with celeste background if they have events
  const dayPropGetter = (date) => {
    if (eventDates.has(date.toDateString())) {
      return {
        style: {
          backgroundColor: '#b3d4fc' // celeste color
        }
      };
    }
    return {};
  };

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        dayPropGetter={dayPropGetter}
        style={{ height: '100%' }}
        messages={{
          today: 'Hoy',
          previous: 'Anterior',
          next: 'Siguiente',
          month: 'Mes',
          week: 'Semana',
          day: 'Día'
        }}
      />
    </div>
  );
};

export default TaskScheduler;
