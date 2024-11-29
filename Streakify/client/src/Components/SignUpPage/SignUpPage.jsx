// /Components/SignUpPage/SignUpPage.jsx
import React from 'react';
import './SignUpPage.css';
import logo from '../../assets/logo.svg';



function SignUpPage() {
  return (

    <div className="signup-container">
      {/* Logo positioned outside the login box */}
      <div className="streakify-logo">
        <img src={logo} alt="Streakify Logo" className="navbar-logo" />
      </div>


      <div className="signup-box">
        <h2>Create your account</h2>
        <form className="signup-form">
          <input
            type="text"
            id="username"
            placeholder="Full Name"
            required
          />
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
          Already have an account? <a href="/login">SIGN IN</a>
        </p>
      </div>
    </div>























  );
}

export default SignUpPage;
