import { useState } from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import meditationImage from '../../assets/meditation.svg';
import logo from '../../assets/logo.svg';
import image1 from '../../assets/image/image1.svg';
import image2 from '../../assets/image/image2.svg';
import image3 from '../../assets/image/image3.svg';
import image4 from '../../assets/image/image4.svg';


function WelcomePage() {

  const [burger, setBurger] = useState(false);
  const handleBurgerClick = () => {
    setBurger(prevState => !prevState);
  };

  return (
    <div className="welcome-container">
      {/* Navbar */}
      <nav className="navbar">
        <img src={logo} alt="Streakify Logo" className="navbar-logo" />

        {/* Hamburger Icon for mobile */}

        <button className="hamburger-icon" onClick={handleBurgerClick} aria-label="Toggle menu">
          <span className={`hamburger-bar ${burger ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${burger ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${burger ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${burger ? 'open' : ''}`}></span>
        </button>

        {burger && (
        <div className="menu-content">
          
            <a href="#section1">Home</a>
          
            <a href="#section2"> Services</a>
          
            <Link to="/LogInPage"> Login</Link>
          
            <Link to="/SignUpPage"> SignUp</Link>
         
        </div>
      )}


        {/* Navbar Links */}
        <ul className={`nav-links`}>
          <li>Home</li>
          <li><a href="#section2"> Services</a></li>
          <li><Link to="/LogInPage">Log in</Link></li>
          <li>
            <Link to="/SignUpPage">
              <button className="signup-button">Sign up</button>
            </Link>
          </li>
        </ul>

      </nav>

      {/* Welcome Section */}
      <div id="section1" className="welcome-background">
        <div className="welcome-section">
          <h1 className="welcome-text">Welcome</h1>
          <h2 className="streakify-text">to Streakify</h2>
          <p className="explore-text">Explore the app, find some peace of mind</p>
          <p className="explore-text">to achieve good habits.</p>
          <img src={meditationImage} alt="Meditation" className="meditation-image" />
          <a href="/SignUpPage">
            <button className="get-started-button">GET STARTED</button>
            </a>

        </div>
      </div>

      {/* Quote-section */}
      <><div className="quote-section">
        <div className="overlay top">
          <div className="sub-overlay"></div>
          <div className="sub-overlay"></div>
        </div>
        <div className="overlay bottom">
          <div className="sub-overlay"></div>
          <div className="sub-overlay"></div>
        </div>
        <div className="quote-content">
          <p className="quote">"The habit of success</p>
          <p className="quote">is built through the</p>
          <p className="quote">streaks of effort you</p>
          <p className="quote">make every day."</p>
          <p className="quote-author">- Anonymous</p>
        </div>
      </div><section className="image-section">
          <div id="section2" className="image-container">
            <div className="image-item">
              <img src={image1} alt="Image 1" />
              <h3>Track Your Goal</h3>
              <p>Struggling to define your goals? We’re here to help you</p>
              <p>set clear goals and stay on track every step of the way!</p>
            </div>
            <div className="image-item">
              <img src={image2} alt="Image 2" />
              <h3>Get Burn</h3>
              <p>Push through the challenge! The burn is temporary, but </p>
              <p>giving up lasts forever. Let’s crush your goals together.</p>
            </div>
            <div className="image-item">
              <img src={image3} alt="Image 3" />
              <h3>Eat Well</h3>
              <p>Fuel your body and mind! We make healthy eating </p>
              <p>simple and fun—let’s create a diet plan that works for</p>
              <p>you every day.</p>
            </div>
            <div className="image-item">
              <img src={image4} alt="Image 4" />
              <h3>Morning Yoga</h3>
              <p>Start your day with balance and calm. Join us for </p>
              <p>morning yoga to awaken your mind, energize your body, </p>
              <p>and embrace the day ahead.</p>
            </div>
          </div>
        </section></>
    </div>



  );

}

export default WelcomePage