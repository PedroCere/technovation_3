import React from 'react';
import PropTypes from 'prop-types';
import { FaRegCommentAlt, FaRegClock, FaTag } from 'react-icons/fa';
import { MdPriorityHigh } from 'react-icons/md';

const TaskCard = ({ task, onStatusChange, onEditClick, onDeleteClick }) => {
  return (
    <div className="bg-[var(--bg-color)] p-4 rounded-lg shadow-sm border-l-4 border-[var(--primary-color)] mb-4 text-[var(--text-color)] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-[var(--text-color)]">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEditClick(task)}
            className="px-2 py-1 bg-[var(--primary-color)] text-white rounded hover:bg-[var(--primary-color-hover)] text-xs"
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteClick(task.id)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
          >
            Delete
          </button>
        </div>
      </div>

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
        className="text-xs px-2 py-1 rounded border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-color)] mb-3"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {/* Etiquetas */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {task.label && (
          <span className="bg-[var(--label-bg-blue)] text-[var(--label-text-blue)] text-xs px-2 py-1 rounded flex items-center gap-1">
            <FaTag className="w-3 h-3" /> {task.label}
          </span>
        )}
        <div className="bg-[var(--label-bg-purple)] text-[var(--label-text-purple)] text-xs px-2 py-1 rounded flex items-center gap-1">
          <FaRegCommentAlt className="w-3 h-3" /> AI Note
        </div>
      </div>

      {/* Metadatos */}
      <div className="flex items-center gap-4 text-[var(--text-color)]/70 text-sm">
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
  onStatusChange: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default TaskCard;
