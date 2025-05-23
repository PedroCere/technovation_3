import { Globe, Clock3 } from 'lucide-react';

const GeneralPanel = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-6 h-6 text-red-500" />
        <h2 className="text-xl font-bold text-gray-800">General Settings</h2>
      </div>

      <div className="space-y-4">
        {/* Language */}
        <div>
          <label className="text-sm font-medium text-gray-700">Language</label>
          <select className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            <option>English</option>
            <option>Español</option>
            <option>Português</option>
          </select>
        </div>

        {/* Time Zone */}
        <div>
          <label className="text-sm font-medium text-gray-700">Time Zone</label>
          <select className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            <option>UTC−03:00 (Buenos Aires)</option>
            <option>UTC+00:00 (London)</option>
            <option>UTC−05:00 (New York)</option>
          </select>
        </div>

        {/* Time Format */}
        <div>
          <label className="text-sm font-medium text-gray-700">Time Format</label>
          <select className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            <option>24-hour</option>
            <option>12-hour</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="text-sm font-medium text-gray-700">Date Format</label>
          <select className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        {/* Week Start */}
        <div>
          <label className="text-sm font-medium text-gray-700">Week Starts On</label>
          <select className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            <option>Monday</option>
            <option>Sunday</option>
          </select>
        </div>

        {/* Next Week Start */}
        <div>
          <label className="text-sm font-medium text-gray-700">Next Week Begins</label>
          <select className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            <option>Next Monday</option>
            <option>Next Sunday</option>
          </select>
        </div>

        {/* Weekend Days */}
        <div>
          <label className="text-sm font-medium text-gray-700">Weekend</label>
          <select className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50">
            <option>Saturday & Sunday</option>
            <option>Friday & Saturday</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GeneralPanel;
