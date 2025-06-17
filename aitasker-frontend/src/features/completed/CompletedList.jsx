import React from "react";
import { IoCheckmarkCircle, IoPencilOutline, IoTrashOutline } from "react-icons/io5";

const CompletedList = ({ activities, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-4">
      {activities.map((activity, index) => (
        <div
          key={activity.id || index}
          className="flex items-start gap-3 p-4 rounded-md border border-[var(--border-color)] hover:shadow transition-colors bg-[var(--bg-color)]"
        >
          <IoCheckmarkCircle className="text-[var(--primary-color)] w-5 h-5 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-[var(--text-color)]">
              You completed <span className="font-medium">{activity.task}</span>
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-color)]/60 mt-1">
              <span>{activity.time}</span>
              <span>•</span>
              <span>{activity.project}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(activity)}
              className="text-[color:var(--text-color)] hover:text-[color:var(--primary-color)]"
              aria-label="Edit activity"
            >
              <IoPencilOutline className="text-lg" />
            </button>
            <button
              onClick={() => onDelete(activity.id)}
              className="text-[color:var(--text-color)] hover:text-[color:var(--primary-color)]"
              aria-label="Delete activity"
            >
              <IoTrashOutline className="text-lg" />
            </button>
          </div>
        </div>
      ))}
      {activities.length === 0 && (
        <div className="text-center pt-6 text-sm text-[var(--text-color)]/60">
          That’s it. No more history to load.
        </div>
      )}
    </div>
  );
};

export default CompletedList;
