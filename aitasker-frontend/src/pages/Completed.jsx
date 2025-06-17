import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import CompletedList from "../features/completed/CompletedList";
import CompletedForm from "../features/completed/CompletedForm";

const Completed = () => {
  const { theme } = useTheme();

  const [activities, setActivities] = useState([
    {
      id: 1,
      task: "Send a package",
      time: "3:31 PM",
      project: "Inbox ☉"
    },
    {
      id: 2,
      task: "Make a productivity quiz",
      time: "3:31 PM",
      project: "Inbox ☉"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const handleAddClick = () => {
    setEditingActivity(null);
    setShowForm(true);
  };

  const handleEditClick = (activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  const handleDeleteClick = (activityId) => {
    setActivities(activities.filter(activity => activity.id !== activityId));
  };

  const handleFormSubmit = (activityData) => {
    if (editingActivity) {
      setActivities(activities.map(activity => activity.id === editingActivity.id ? { ...activity, ...activityData } : activity));
    } else {
      const newActivity = { id: Date.now(), ...activityData };
      setActivities([...activities, newActivity]);
    }
    setShowForm(false);
    setEditingActivity(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingActivity(null);
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
          <h1 className="text-xl font-semibold">Completed</h1>
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white rounded transition-colors"
          >
            Add Activity
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          A summary of your completed tasks across all projects.
        </p>
      </div>

      {error && (
        <div className="mb-4 text-red-500 bg-[var(--button-bg)] p-3 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] scrollbar-custom">
        <CompletedList
          activities={activities}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {showForm && (
        <CompletedForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={editingActivity}
        />
      )}
    </motion.div>
  );
};

export default Completed;
