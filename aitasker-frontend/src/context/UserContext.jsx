import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser
      ? JSON.parse(storedUser)
      : {
          username: 'Usuario',
          email: 'user@example.com', // Added email field with default value
          photoUrl: 'src/assets/profile-pics/sample4.jpg',
          backgroundVideo: '', // new property for background video
        };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const updateUserPhoto = (photoUrl) => {
    setUser((prevUser) => ({
      ...prevUser,
      photoUrl,
    }));
  };

  const updateUserBackgroundVideo = (backgroundVideo) => {
    setUser((prevUser) => ({
      ...prevUser,
      backgroundVideo,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserPhoto, updateUserBackgroundVideo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
