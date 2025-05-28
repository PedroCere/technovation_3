import { useState } from 'react';
import { format } from 'date-fns';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SmartCalendar = ({ view = 'week', events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-[var(--bg-color)] rounded-lg shadow overflow-hidden text-[var(--text-color)]">
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
        <h3 className="font-medium">
          {format(currentDate, view === 'week' ? 'MMMM yyyy' : 'yyyy')}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('prev')}
            className="p-1 rounded hover:bg-[var(--primary-color-hover)] transition"
          >
            <FiChevronLeft className="text-[var(--text-color)]" />
          </button>
          <button 
            onClick={() => navigate('next')}
            className="p-1 rounded hover:bg-[var(--primary-color-hover)] transition"
          >
            <FiChevronRight className="text-[var(--text-color)]" />
          </button>
        </div>
      </div>
   
    </div>
  );
};

export default SmartCalendar;
