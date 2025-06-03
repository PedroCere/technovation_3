import { Palette } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const ThemePanel = () => {
  const { theme, setTheme, themes } = useTheme();

  const colors = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    cyan: 'bg-cyan-600 text-white',
    purple: 'bg-purple-600 text-white',
    notion: 'bg-[#1D1D1D] text-[#EBEBEB]',
    github: 'bg-[#0d1117] text-[#c9d1d9]',
    midnight: 'bg-[#13111c] text-[#f0eff4]',
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow space-y-6 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Palette className="w-6 h-6 text-gray-700 dark:text-white" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Theme Settings</h2>
      </div>

      <div className="space-y-4">
        {/* Theme selection */}
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Select Theme</p>
        <div className="flex gap-3">
          {Object.keys(themes).map((key) => (
            <button
              key={key}
              onClick={() => setTheme(themes[key])}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                theme === themes[key] ? 'border-black dark:border-white' : 'border-transparent'
              } ${colors[themes[key]]}`}
              title={themes[key]}
            >
              {themes[key] === 'dark' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.485-8.485h1M3 12H2m15.364 6.364l.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M12 5a7 7 0 000 14 7 7 0 000-14z"
                  />
                </svg>
              ) : (
                <span className="sr-only">{themes[key]}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemePanel;
