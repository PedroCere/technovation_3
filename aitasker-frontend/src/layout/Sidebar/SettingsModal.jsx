const SettingsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-[800px] max-w-[90%] bg-white rounded-xl shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">✕</button>
        <h2 className="text-2xl font-semibold mb-6">Settings</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 border-r pr-4 space-y-2">
            {['Account', 'General', 'Theme', 'Notifications'].map((item) => (
              <button key={item} className="w-full text-left text-sm text-gray-700 hover:text-black hover:bg-gray-100 px-3 py-2 rounded">
                {item}
              </button>
            ))}
          </div>
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-2">Account</h3>
            <p className="text-sm text-gray-600 mb-4">Plan: <strong>Beginner</strong></p>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full" />
              <div className="space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Change photo</button>
                <button className="px-3 py-1 text-sm text-red-500 border border-red-500 rounded">Remove photo</button>
              </div>
            </div>
            <label className="block text-sm text-gray-700">Name</label>
            <input className="w-full border rounded px-3 py-2 text-sm mb-2" defaultValue="Pedro Cereghetti" />
            <p className="text-xs text-right text-gray-400 mb-6">16/255</p>
            <label className="block text-sm text-gray-700">Email</label>
            <p className="text-sm mb-2">pedrocerega@gmail.com</p>
            <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Change email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
