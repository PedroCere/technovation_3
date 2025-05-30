import { Globe, Clock3 } from 'lucide-react';

const GeneralPanel = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow space-y-6" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>General Settings</h2>
      </div>

      <div className="space-y-4">
        {/* Language */}
        <div>
          <label className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Language</label>
          <select className="mt-1 w-full p-2 border rounded-md" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-color)' }}>
            <option>English</option>
            <option>Español</option>
            <option>Português</option>
          </select>
        </div>

        {/* Time Zone */}
        <div>
          <label className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Time Zone</label>
          <select className="mt-1 w-full p-2 border rounded-md" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-color)' }}>
            <option>UTC−03:00 (Buenos Aires)</option>
            <option>UTC+00:00 (London)</option>
            <option>UTC−05:00 (New York)</option>
          </select>
        </div>

        {/* Time Format */}
        <div>
          <label className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Time Format</label>
          <select className="mt-1 w-full p-2 border rounded-md" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-color)' }}>
            <option>24-hour</option>
            <option>12-hour</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Date Format</label>
          <select className="mt-1 w-full p-2 border rounded-md" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-color)' }}>
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        {/* Week Start */}
        <div>
          <label className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Week Starts On</label>
          <select className="mt-1 w-full p-2 border rounded-md" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-color)' }}>
            <option>Monday</option>
            <option>Sunday</option>
          </select>
        </div>

        {/* Next Week Start */}
        <div>
          <label className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Next Week Begins</label>
          <select className="mt-1 w-full p-2 border rounded-md" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-color)' }}>
            <option>Next Monday</option>
            <option>Next Sunday</option>
          </select>
        </div>

        {/* Weekend Days */}
        <div>
          <label className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Weekend</label>
          <select className="mt-1 w-full p-2 border rounded-md" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-color)' }}>
            <option>Saturday & Sunday</option>
            <option>Friday & Saturday</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GeneralPanel;
