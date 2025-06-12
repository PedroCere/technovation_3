import React, { useState } from 'react';
import { useUser } from '../../../context/UserContext';

const BackgroundVideoSelector = () => {
  const { user, updateUserBackgroundVideo } = useUser();
  const [selectedVideo, setSelectedVideo] = useState(user?.backgroundVideo || '');

  const videoOptions = [
    '/src/assets/wall.mp4',
    '/src/assets/wall2.mp4',
    '/src/assets/wall3.mp4',
    '/src/assets/wall4.mp4',
    '/src/assets/wallpaper8.mp4',
  ];

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideo(videoUrl);
    updateUserBackgroundVideo(videoUrl);
  };

  return (
    <div className="bg-[var(--bg-color)] p-6 rounded shadow max-w-3xl text-[var(--text-color)] transition-colors">
      <h2 className="text-xl font-semibold mb-4">Choose Dashboard Background Video</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {videoOptions.map((videoUrl, index) => {
          const isSelected = selectedVideo === videoUrl;
          return (
            <button
              key={index}
              onClick={() => handleVideoSelect(videoUrl)}
              className={`overflow-hidden rounded border-2 transition ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-300'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <video
                src={videoUrl}
                className="w-full h-24 object-cover"
                muted
                loop
                playsInline
                preload="metadata"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BackgroundVideoSelector;
