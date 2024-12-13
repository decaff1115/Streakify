// /Components/SignUpPage/SignUpPage.jsx
import React from 'react';
import { useState } from "react";
import './SignUpPage.css';
import logo from '../../assets/logo.svg';



function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send login request to the backend API
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store JWT in localStorage
        localStorage.setItem("authToken", data.token);
        console.log("Sign up successful:", data);

        // Optionally, redirect to the dashboard or home page
        window.location.href = "/Dashboard"; // Adjust the redirect path as needed
      } else {
        // Handle error if login failed
        setError(data.message || "Sign up failed, please try again.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setError("An error occurred. Please try again.");
    }
  };
  return (

    <div className="signup-container">
      {/* Logo positioned outside the login box */}
      <div className="streakify-logo">
        <img src={logo} alt="Streakify Logo" className="navbar-logo" />
      </div>


      <div className="signup-box">
        <h2>Create your account</h2>
        <form className="signup-form" onSubmit={handleRegister}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
          <button type="submit" className="getstarted-button">
            GET STARTED
          </button>
          <p className= "privacy-policy">
            I have read the{' '} 
            <a href="#" className="privacy-policy">
              Privacy Policy
            </a>
          </p>
        </form>

        <p className="login-text">
          Already have an account? <a href="/LogInPage">SIGN IN</a>
        </p>
      </div>
    </div>























  );
}

export default SignUpPage;
