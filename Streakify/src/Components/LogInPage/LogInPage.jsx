import React from "react";
import "./LogInPage.css";
import logo from '../../assets/logo.svg';

const LogInPage = () => {
  return (
    <div className="login-container">
      {/* Logo positioned outside the login box */}
      <div className="streakify-logo">
        <img src={logo} alt="Streakify Logo" className="navbar-logo" />
      </div>


      <div className="login-box">
        <h2>Welcome Back!</h2>
        <form className="login-form">
          <input
            type="text"
            id="username"
            placeholder="Email address"
            required
          />
          <input
              type="password"
              id="password"
              placeholder="Password"
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
          Don’t have an account? <a href="/signup">SIGN UP</a>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
