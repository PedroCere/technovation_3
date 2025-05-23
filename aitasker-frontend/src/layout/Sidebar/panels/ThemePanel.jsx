import { Moon, Palette } from 'lucide-react';
import { useState, useEffect } from 'react';

const ThemePanel = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('red');

  const colors = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    violet: 'text-violet-600',
  };

  // Aplica o quita modo oscuro al <html>
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  // Aplica color primario a una clase CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, [primaryColor]);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-6 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Palette className="w-6 h-6 text-red-500 dark:text-white" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Theme Settings</h2>
      </div>

      <div className="space-y-4">
        {/* Modo oscuro */}
        <label className="flex items-center justify-between text-sm text-gray-800 dark:text-gray-200">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </label>

        {/* Colores */}
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Primary Color</p>
          <div className="flex gap-3">
            {Object.keys(colors).map((color) => (
              <button
                key={color}
                onClick={() => setPrimaryColor(color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  primaryColor === color ? 'border-black dark:border-white' : 'border-transparent'
                } bg-${color}-500`}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePanel;
