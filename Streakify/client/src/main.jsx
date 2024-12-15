import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './Components/WelcomePage/WelcomePage';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import LogInPage from './Components/LogInPage/LogInPage';
import Dashboard from './Components/Dashboard/Dashboard';
import Progress from './Components/Progress/Progress';
import './index.css';  // Ensure this file exists and doesn't interfere with Mantine styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/LogInPage" element={<LogInPage />} />
          <Route path="/Progress" element={<Progress />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
