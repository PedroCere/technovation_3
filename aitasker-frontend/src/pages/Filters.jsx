import { useState } from "react";
import { IoRadioButtonOffOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";

const Filters = () => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState([
    { id: 1, text: "Analize team Worflow", checked: false },
    { id: 2, text: "Start the new App", checked: false }
  ]);

  const toggleFilter = (filterId) => {
    setFilters(filters.map(filter =>
      filter.id === filterId ? { ...filter, checked: !filter.checked } : filter
    ));
  };

  return (
    <div className="flex justify-center w-full min-h-full p-6 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">Filters & Labels</h1>

        <div className="space-y-6">
          {/* Sección Filters */}
          <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg p-4 shadow-sm transition-colors">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Filters</h2>
              <span className="text-xs opacity-70">USED: 2/3</span>
            </div>

            <div className="space-y-2">
              {filters.map((filter) => (
                <div
                  key={filter.id}
                  className="flex items-center gap-3 group hover:bg-[color:var(--border-color)] px-2 py-1.5 rounded transition-colors"
                >
                  <button
                    onClick={() => toggleFilter(filter.id)}
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
              ))}
            </div>
          </div>

          {/* Sección Labels */}
          <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg p-4 shadow-sm transition-colors">
            <h2 className="font-medium mb-4">Labels</h2>
            <div className="text-center py-6">
              <p className="text-sm opacity-70">
                Your list of labels will show up here.
              </p>
            </div>
          </div>

          <button className="mt-4 text-sm font-medium flex items-center gap-2 px-4 py-1.5 rounded border border-[color:var(--primary-color)] text-[color:var(--primary-color)] hover:text-white hover:bg-[color:var(--primary-color-hover)] transition-colors">
            <span className="text-xl">+</span>
            Add filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
