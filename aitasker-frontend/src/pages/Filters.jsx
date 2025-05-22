import { useState } from "react";
import { IoRadioButtonOffOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const Filters = () => {
  const [filters, setFilters] = useState([
    { id: 1, text: "Asignada a mí", checked: false },
    { id: 2, text: "Prioridad 1", checked: false }
  ]);

  const toggleFilter = (filterId) => {
    setFilters(filters.map(filter => 
      filter.id === filterId ? { ...filter, checked: !filter.checked } : filter
    ));
  };

  return (
    <div className="flex justify-center w-full min-h-full p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">Filters & Labels</h1>

        <div className="space-y-6">
          {/* Sección Filters */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-gray-700">Filters</h2>
              <span className="text-xs text-gray-500">USED: 2/3</span>
            </div>
            
            <div className="space-y-2">
              {filters.map((filter) => (
                <div
                  key={filter.id}
                  className="flex items-center gap-3 group hover:bg-gray-50 px-2 py-1.5 rounded"
                >
                  <button
                    onClick={() => toggleFilter(filter.id)}
                    className="text-gray-400 hover:text-red-500 transition-all"
                  >
                    {filter.checked ? (
                      <IoCheckmarkCircleOutline className="text-xl text-red-500" />
                    ) : (
                      <IoRadioButtonOffOutline className="text-xl" />
                    )}
                  </button>
                  <span className="text-sm text-gray-700">{filter.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sección Labels */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="font-medium text-gray-700 mb-4">Labels</h2>
            <div className="text-center py-6">
              <p className="text-sm text-gray-500">
                Your list of labels will show up here.
              </p>
            </div>
          </div>

          <button className="mt-4 text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2 px-4 py-1.5 rounded border border-red-500 transition-colors">
            <span className="text-xl">+</span>
            Add filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;