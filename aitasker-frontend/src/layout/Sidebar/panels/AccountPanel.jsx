import React from 'react';

const AccountPanel = () => {
  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Account</h2>
      <p className="text-sm mb-2">Plan: <strong>Beginner</strong></p>

      {/* Photo */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-yellow-300 rounded-full" />
        <div className="flex flex-col gap-2">
          <button className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Change photo</button>
          <button className="text-sm px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50">Remove photo</button>
        </div>
      </div>

      {/* Name */}
      <label className="text-sm block mb-1">Name</label>
      <input
        type="text"
        className="w-full border p-2 rounded mb-4 bg-gray-100"
        value="Pedro Cereghetti"
        readOnly
      />

      {/* Email */}
      <div className="mb-4">
        <label className="text-sm block mb-1">Email</label>
        <p className="text-sm">pedrocerega@gmail.com</p>
        <button className="mt-1 text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Change email</button>
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="text-sm block mb-1">Password</label>
        <button className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Add password</button>
      </div>

      {/* 2FA */}
      <div className="mb-4">
        <label className="text-sm block mb-1">Two-factor authentication</label>
        <div className="flex items-center gap-2">
          <span className="text-sm">Disabled</span>
          <span className="bg-gray-200 w-10 h-6 rounded-full relative inline-block">
            <span className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow" />
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">2FA is disabled on your Todoist account.</p>
      </div>

      {/* Connected accounts */}
      <div className="mt-6 border-t pt-4">
        <p className="text-sm mb-1 font-medium">Connected accounts</p>
        <p className="text-sm mb-2">
          You can log in to Todoist with your Google account <strong>pedrocerega@gmail.com</strong>.
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Your password is not set, so we cannot disconnect you from your Google account.
          If you want to disconnect, please <span className="text-red-500 underline cursor-pointer">set up your password</span> first.
        </p>
        <button className="w-full py-2 text-sm bg-blue-100 rounded hover:bg-blue-200">Connect with Facebook</button>
        <button className="w-full mt-2 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">Connect with Apple</button>
      </div>
    </div>
  );
};

export default AccountPanel;
