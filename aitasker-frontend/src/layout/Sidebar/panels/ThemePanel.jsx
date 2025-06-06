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
    focus: 'bg-[#fdfdfd] text-[#111827]',
    sunset: 'bg-[#fff7ed] text-[#1f2937]',
    neon: 'bg-[#0a0a23] text-[#d1d5db]',
    volcano: 'bg-[#1b1a1f] text-[#fce8e8]',
    forest: 'bg-[#0f1f1a] text-[#e4f5ec]',
    monochrome: 'bg-[#121212] text-[#e5e5e5]',
    grape: 'bg-[#1c1624] text-[#f3e8ff]',
    coffee: 'bg-[#1c1b18] text-[#f5f5dc]',
  };

  const themeNames = {
    light: 'Light',
    dark: 'Dark',
    cyan: 'Cyan',
    purple: 'Purple',
    notion: 'Notion',
    github: 'GitHub',
    midnight: 'Midnight',
    focus: 'Focus',
    sunset: 'Sunset',
    neon: 'Neon',
    volcano: 'Volcano',
    forest: 'Forest',
    monochrome: 'Monochrome',
    grape: 'Grape',
    coffee: 'Coffee',
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow space-y-6 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Palette className="w-6 h-6 text-gray-700 dark:text-white" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Theme Settings</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Select Theme</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.keys(themes).map((key) => {
            const currentTheme = themes[key];
            const isSelected = theme === currentTheme;
            const isLocked = false;

            return (
              <button
                key={key}
                onClick={() => !isLocked && setTheme(currentTheme)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-lg border text-sm font-medium transition hover:shadow-md ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-400'
                    : 'border-gray-300 dark:border-gray-600'
                } ${isLocked ? 'opacity-60 cursor-not-allowed' : ''} ${colors[currentTheme]}`}
              >
                <div className="w-full h-8 rounded mb-2" />
                <span className="capitalize">{themeNames[currentTheme] || currentTheme}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemePanel;
