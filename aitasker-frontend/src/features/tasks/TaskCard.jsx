import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaRegCommentAlt, FaRegClock, FaTag } from 'react-icons/fa';
import { MdPriorityHigh, MdEdit, MdDelete } from 'react-icons/md';

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const TaskCard = ({ task, onStatusChange, onEditClick, onDeleteClick }) => {
  return (
    <motion.div
      className="w-full bg-[var(--bg-color)] p-5 rounded-xl shadow border border-[var(--card-border)] transition hover:shadow-md flex-shrink-0"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      {/* Header: Title and Actions */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-lg leading-tight text-[var(--text-color)]">
          {task.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEditClick(task)}
            className="p-2 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--primary-color-hover)]"
            title="Edit Task"
          >
            <MdEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteClick(task.id)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            title="Delete Task"
          >
            <MdDelete className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Dropdown */}
      <div className="mb-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="text-sm px-3 py-2 rounded-md border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-color)] w-full"
        >
          <option value="todo">📝 To Do</option>
          <option value="in-progress">🚧 In Progress</option>
          <option value="done">✅ Done</option>
        </select>
      </div>

      {/* Labels */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {task.label && (
          <span className="bg-[var(--label-bg-blue)] text-[var(--label-text-blue)] text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <FaTag className="w-3 h-3" /> {task.label}
          </span>
        )}
        <span className="bg-[var(--label-bg-purple)] text-[var(--label-text-purple)] text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <FaRegCommentAlt className="w-3 h-3" /> AI Note
        </span>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-[var(--text-color)]/70 text-sm">
        <div className="flex items-center gap-1">
          <MdPriorityHigh className="w-4 h-4 text-yellow-500" />
          <span className="capitalize">{task.priority}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaRegClock className="w-4 h-4" />
          <span>{task.dueDate}</span>
        </div>
      </div>
    </motion.div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default TaskCard;
