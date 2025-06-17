import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import FilterList from "../features/filters/FilterList";
import FilterForm from "../features/filters/FilterForm";

const Filters = () => {
  const { theme } = useTheme();

  const [filters, setFilters] = useState([
    { id: 1, text: "Analize team Worflow", checked: false },
    { id: 2, text: "Start the new App", checked: false }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingFilter, setEditingFilter] = useState(null);

  const toggleFilter = (filterId) => {
    setFilters(filters.map(filter =>
      filter.id === filterId ? { ...filter, checked: !filter.checked } : filter
    ));
  };

  const handleAddClick = () => {
    setEditingFilter(null);
    setShowForm(true);
  };

  const handleEditClick = (filter) => {
    setEditingFilter(filter);
    setShowForm(true);
  };

  const handleDeleteClick = (filterId) => {
    setFilters(filters.filter(filter => filter.id !== filterId));
  };

  const handleFormSubmit = (filterData) => {
    if (editingFilter) {
      setFilters(filters.map(filter => filter.id === editingFilter.id ? { ...filter, ...filterData } : filter));
    } else {
      const newFilter = { id: Date.now(), ...filterData, checked: false };
      setFilters([...filters, newFilter]);
    }
    setShowForm(false);
    setEditingFilter(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingFilter(null);
  };

  return (
    <motion.div
      className="min-h-screen px-6 py-8 font-sans transition-colors"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Filters & Labels</h1>
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white rounded transition-colors"
          >
            Add Filter
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Manage your filters and labels from here.
        </p>
      </div>

      {error && (
        <div className="mb-4 text-red-500 bg-[var(--button-bg)] p-3 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] scrollbar-custom">
        <FilterList
          filters={filters}
          onToggle={toggleFilter}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {showForm && (
        <FilterForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={editingFilter}
        />
      )}
    </motion.div>
  );
};

export default Filters;
