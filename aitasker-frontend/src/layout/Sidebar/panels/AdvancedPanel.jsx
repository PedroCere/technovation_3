import { Settings2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const AdvancedPanel = () => {
  const [autoArchive, setAutoArchive] = useState(true);
  const [smartSuggestions, setSmartSuggestions] = useState(true);
  const [taskDependencyWarning, setTaskDependencyWarning] = useState(true);
  const [betaFeatures, setBetaFeatures] = useState(false);

  const resetSettings = () => {
    if (confirm('Are you sure you want to reset all advanced settings?')) {
      setAutoArchive(true);
      setSmartSuggestions(true);
      setTaskDependencyWarning(true);
      setBetaFeatures(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Settings2 className="w-6 h-6 text-red-500" />
        <h2 className="text-xl font-bold text-gray-800">Advanced Settings</h2>
      </div>

      <div className="space-y-4 text-sm">
        <label className="flex items-center justify-between">
          <span>Auto-archive completed tasks</span>
          <input
            type="checkbox"
            checked={autoArchive}
            onChange={(e) => setAutoArchive(e.target.checked)}
          />
        </label>

        <label className="flex items-center justify-between">
          <span>Enable smart suggestions</span>
          <input
            type="checkbox"
            checked={smartSuggestions}
            onChange={(e) => setSmartSuggestions(e.target.checked)}
          />
        </label>

        <label className="flex items-center justify-between">
          <span>Warn about task dependencies</span>
          <input
            type="checkbox"
            checked={taskDependencyWarning}
            onChange={(e) => setTaskDependencyWarning(e.target.checked)}
          />
        </label>

        <label className="flex items-center justify-between">
          <span>Enable beta features</span>
          <input
            type="checkbox"
            checked={betaFeatures}
            onChange={(e) => setBetaFeatures(e.target.checked)}
          />
        </label>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={resetSettings}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800"
          >
            <AlertTriangle className="w-4 h-4" />
            Reset all advanced settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedPanel;
