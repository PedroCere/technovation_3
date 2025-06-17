import React from "react";
import { IoRadioButtonOffOutline, IoCheckmarkCircleOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5";

const FilterList = ({ filters, onToggle, onEdit, onDelete }) => {
  return (
    <div className="space-y-2">
      {filters.map((filter) => (
        <div
          key={filter.id}
          className="flex items-center justify-between gap-3 group hover:bg-[color:var(--border-color)] px-2 py-1.5 rounded transition-colors"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggle(filter.id)}
              className="text-[color:var(--text-color)] hover:text-[color:var(--primary-color)] transition-all"
            >
              {filter.checked ? (
                <IoCheckmarkCircleOutline className="text-xl text-[color:var(--primary-color)]" />
              ) : (
                <IoRadioButtonOffOutline className="text-xl" />
              )}
            </button>
            <span className="text-sm">{filter.text}</span>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(filter)}
              className="text-[color:var(--text-color)] hover:text-[color:var(--primary-color)]"
              aria-label="Edit filter"
            >
              <IoPencilOutline className="text-lg" />
            </button>
            <button
              onClick={() => onDelete(filter.id)}
              className="text-[color:var(--text-color)] hover:text-[color:var(--primary-color)]"
              aria-label="Delete filter"
            >
              <IoTrashOutline className="text-lg" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterList;
