import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import LogInPage from './Components/LogInPage/LogInPage';
import Dashboard from './Components/Dashboard/Dashboard';
import './index.css';  // Ensure this file exists and doesn't interfere with Mantine styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/" element={<LogInPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
