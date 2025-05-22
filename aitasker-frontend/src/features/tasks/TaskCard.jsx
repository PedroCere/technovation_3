// features/tasks/TaskCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaRegCommentAlt, FaRegClock, FaTag } from 'react-icons/fa';
import { MdPriorityHigh } from 'react-icons/md';

const TaskCard = ({ task, onStatusChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500 mb-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{task.title}</h3>
<select 
  value={task.status}
  onChange={(e) => onStatusChange(task.id, e.target.value)}
  className="text-xs px-2 py-1 rounded border border-gray-200 bg-white text-black"
>
  <option value="todo" className="bg-white text-black">To Do</option>
  <option value="in-progress" className="bg-white text-black">In Progress</option>
  <option value="done" className="bg-white text-black">Done</option>
</select>
      </div>
      
      {/* Etiquetas y AI */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1">
          <FaTag className="w-3 h-3" /> {task.label}
        </span>
        <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded flex items-center gap-1">
          <FaRegCommentAlt className="w-3 h-3" /> AI Note
        </div>
      </div>

      {/* Metadatos */}
      <div className="flex items-center gap-4 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <MdPriorityHigh className="w-4 h-4" />
          <span>{task.priority}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaRegClock className="w-4 h-4" />
          <span>{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired
};

export default TaskCard;
