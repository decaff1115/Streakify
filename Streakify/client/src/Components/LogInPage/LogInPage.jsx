import React from "react";
import { useState } from "react";
import "./LogInPage.css";
import logo from '../../assets/logo.svg';

const LogInPage = () => {
  // State to store username, password, and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send login request to the backend API
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store JWT in localStorage
        localStorage.setItem("authToken", data.token);
        console.log("Login successful:", data);

        // Optionally, redirect to the dashboard or home page
        window.location.href = "/Dashboard"; // Adjust the redirect path as needed
      } else {
        // Handle error if login failed
        setError(data.message || "Login failed, please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <div className="login-container">
      {/* Logo positioned outside the login box */}
      <div className="streakify-logo">
        <img src={logo} alt="Streakify Logo" className="navbar-logo" />
      </div>


      <div className="login-box">
        <h2>Welcome Back!</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
          <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          <button type="submit" className="login-button">
            LOG IN
          </button>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </form>

        <p className="signup-text">
          Don’t have an account? <a href="/SignUpPage">SIGN UP</a>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;