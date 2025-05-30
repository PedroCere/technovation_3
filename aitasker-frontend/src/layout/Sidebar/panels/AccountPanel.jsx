import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../../context/UserContext';

const AccountPanel = () => {
  const { user, updateUserPhoto } = useUser();
  const [uploading, setUploading] = useState(false);
  const [photoUrlWithTimestamp, setPhotoUrlWithTimestamp] = useState('');
  const fileInputRef = useRef(null);

  const handlePhotoChangeClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (user?.photoUrl) {
      const baseUrl = 'http://localhost:8080'; 
      const fullUrl = user.photoUrl.startsWith('http') ? user.photoUrl : baseUrl + user.photoUrl;
      setPhotoUrlWithTimestamp(fullUrl + '?t=' + new Date().getTime());
    } else {
      setPhotoUrlWithTimestamp('');
    }
  }, [user?.photoUrl]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      // Create form data
      const formData = new FormData();
      formData.append('photo', file);

      // Upload photo to backend
      // Assuming backend accepts multipart/form-data at /api/user/upload-photo
      // and returns the new photoUrl in response
      const response = await fetch('/api/user/upload-photo', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const data = await response.json();
      const newPhotoUrl = data.photoUrl;
      console.log('New photo URL from upload:', newPhotoUrl);

      // Update user photo in context and backend profile
      updateUserPhoto(newPhotoUrl);

      // Also update profile with new photoUrl
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
        body: JSON.stringify({ photoUrl: newPhotoUrl }),
      });
    } catch (error) {
      console.error(error);
      alert('Error uploading photo');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    setUploading(true);
    try {
      // Remove photo by setting photoUrl to null
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ photoUrl: null }),
      });
      updateUserPhoto(null);
    } catch (error) {
      console.error(error);
      alert('Error removing photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-[var(--bg-color)] p-6 rounded shadow max-w-3xl text-[var(--text-color)] transition-colors">
      <h2 className="text-xl font-semibold mb-4">Account</h2>
      <p className="text-sm mb-2">
        Plan: <strong>Beginner</strong>
      </p>

      {console.log('Current user photoUrl:', user?.photoUrl)}

      {/* Photo */}
      <div className="flex items-center gap-4 mb-4">
        {photoUrlWithTimestamp ? (
          <img
            src={photoUrlWithTimestamp}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <button
            onClick={handlePhotoChangeClick}
            disabled={uploading}
            className="text-sm px-3 py-1 bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] border border-[var(--button-border)] rounded"
          >
            {uploading ? 'Uploading...' : 'Change photo'}
          </button>
          <button
            onClick={handleRemovePhoto}
            disabled={uploading || !user?.photoUrl}
            className="text-sm px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500/10"
          >
            Remove photo
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Name */}
      <label className="text-sm block mb-1">Name</label>
      <input
        type="text"
        className="w-full p-2 rounded mb-4 bg-[var(--input-bg)] text-[var(--text-color)] border border-[var(--input-border)]"
        value={user?.username || ''}
        readOnly
      />

      {/* Email */}
      <div className="mb-4">
        <label className="text-sm block mb-1">Email</label>
        <p className="text-sm">{user?.email || ''}</p>
        <button className="mt-1 text-sm px-3 py-1 bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] border border-[var(--button-border)] rounded">
          Change email
        </button>
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="text-sm block mb-1">Password</label>
        <button className="text-sm px-3 py-1 bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] border border-[var(--button-border)] rounded">
          Add password
        </button>
      </div>

      {/* 2FA */}
      <div className="mb-4">
        <label className="text-sm block mb-1">Two-factor authentication</label>
        <div className="flex items-center gap-2">
          <span className="text-sm">Disabled</span>
          <span className="bg-[var(--border-color)] w-10 h-6 rounded-full relative inline-block">
            <span className="absolute left-0 top-0 w-6 h-6 bg-[var(--bg-color)] rounded-full shadow transition-transform" />
          </span>
        </div>
        <p className="text-xs opacity-70 mt-1">
          2FA is disabled on your Todoist account.
        </p>
      </div>

      {/* Connected accounts */}
      <div className="mt-6 border-t pt-4 border-[var(--border-color)]">
        <p className="text-sm mb-1 font-medium">Connected accounts</p>
        <p className="text-sm mb-2">
          You can log in to Todoist with your Google account <strong>{user?.email || ''}</strong>.
        </p>
        <p className="text-xs opacity-70 mb-4">
          Your password is not set, so we cannot disconnect you from your Google account.
          If you want to disconnect, please{' '}
          <span className="text-red-500 underline cursor-pointer">set up your password</span>{' '}
          first.
        </p>
        <button className="w-full py-2 text-sm bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] border border-[var(--button-border)] rounded">
          Connect with Facebook
        </button>
        <button className="w-full mt-2 py-2 text-sm bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] border border-[var(--button-border)] rounded">
          Connect with Apple
        </button>
      </div>
    </div>
  );
};

export default AccountPanel;
