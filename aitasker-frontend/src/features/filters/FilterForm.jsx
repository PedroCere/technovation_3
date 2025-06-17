import React, { useState, useEffect } from "react";

const FilterForm = ({ initialData, onSubmit, onClose }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (initialData) {
      setText(initialData.text);
    } else {
      setText("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSubmit({ text: text.trim() });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--bg-color)] p-6 rounded shadow-lg w-full max-w-md"
        style={{ color: "var(--text-color)" }}
      >
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Filter" : "Add Filter"}
        </h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Filter text"
          className="w-full p-2 border border-[var(--border-color)] rounded mb-4 bg-[var(--bg-color)] text-[var(--text-color)]"
          autoFocus
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

export default FilterForm;
