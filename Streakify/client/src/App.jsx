import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import LogInPage from './Components/LogInPage/LogInPage';
import SignUpPage from './Components/SignUpPage/SignUpPage';  // Import SignUpPage



function App() {
  return (
      <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />  {/* Add route for SignUpPage */}
      </Routes>
  );
}


export default App;

