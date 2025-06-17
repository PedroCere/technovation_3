import React, { useState, useEffect } from "react";

const CompletedForm = ({ initialData, onSubmit, onClose }) => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [project, setProject] = useState("");

  useEffect(() => {
    if (initialData) {
      setTask(initialData.task || "");
      setTime(initialData.time || "");
      setProject(initialData.project || "");
    } else {
      setTask("");
      setTime("");
      setProject("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    onSubmit({ task: task.trim(), time: time.trim(), project: project.trim() });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--bg-color)] p-6 rounded shadow-lg w-full max-w-md"
        style={{ color: "var(--text-color)" }}
      >
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Completed Activity" : "Add Completed Activity"}
        </h2>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task"
          className="w-full p-2 border border-[var(--border-color)] rounded mb-4 bg-[var(--bg-color)] text-[var(--text-color)]"
          autoFocus
          required
        />
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Time"
          className="w-full p-2 border border-[var(--border-color)] rounded mb-4 bg-[var(--bg-color)] text-[var(--text-color)]"
        />
        <input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="Project"
          className="w-full p-2 border border-[var(--border-color)] rounded mb-4 bg-[var(--bg-color)] text-[var(--text-color)]"
        />
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border border-[var(--border-color)] hover:bg-[var(--border-color)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white rounded transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompletedForm;
