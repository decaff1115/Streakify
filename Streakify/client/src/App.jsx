import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import LogInPage from './Components/LogInPage/LogInPage';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
