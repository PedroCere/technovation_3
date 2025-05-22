import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Login from './pages/login';
import Home from './pages/home';
import Calendar from './pages/calendar';
import Stats from './pages/stats';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
};

export default AppRoutes;
