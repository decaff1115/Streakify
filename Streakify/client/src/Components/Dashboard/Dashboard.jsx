import React, { useState } from 'react';
import './Dashboard.css';
import logo from '../../assets/logo.svg';
import Daily from './Daily';
import Weekly from './Weekly';

function Dashboard() {
  const [view, setView] = useState('daily');
  const [selected, setSelected] = useState('daily');
  const [showAddHabit, setShowAddHabit] = useState(false); // State to control the popup

  const handleSidebarClick = (viewType) => {
    setView(viewType);
    setSelected(viewType);
  };

  const handleAddClick = () => {
    setShowAddHabit(true); // Show the popup when the Add button is clicked
  };

  const handleClosePopup = () => {
    setShowAddHabit(false); // Close the popup
  };

  const getDateInfo = () => {
    const now = new Date();
    const options = { month: 'short', day: 'numeric' };
    const [month, date] = new Intl.DateTimeFormat('en-US', options)
      .format(now)
      .split(' ');

    return { month, date };
  };

  const { month, date } = getDateInfo();

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <img src={logo} alt="Streakify Logo" className="navbar-logo" />
      </nav>

      {/* Dashboard Sections */}
      <div className="dashboard-sections">
        {/* Sidebar */}
        <div className="sidebar-section">
          <ul>
            <li
              onClick={() => handleSidebarClick('daily')}
              className={`sidebar-link ${selected === 'daily' ? 'selected' : ''}`}
            >
              DAILY
            </li>
            <li
              onClick={() => handleSidebarClick('weekly')}
              className={`sidebar-link ${selected === 'weekly' ? 'selected' : ''}`}
            >
              WEEKLY
            </li>
            <li className="sidebar-link">PROFILE</li>
          </ul>
        </div>

        {/* Habits Section */}
        <div className="habits-section">
          {/* Date Widget */}
          <div className="date-widget">
            <div className="month">{month.toUpperCase()}</div>
            <div className="day">{date}</div>
          </div>

          {/* Add Button */}
          {view === 'daily' && (
            <button
              className="add-habit-button"
              onClick={handleAddClick}
            >
              +
            </button>
          )}

          {/* New container with normal text */}
          {(view === 'daily' || view === 'weekly') && (
            <div className="todo-container">
              You have nothing to do. Add a new habit now!
            </div>
          )}
          
          {/* Content for Daily or Weekly */}
          {view === 'daily' ? <Daily /> : <Weekly />}
        </div>

        {/* Streak Section */}
        <div className="streak-section">
         <div className="streak-text">
            <span>Complete habit to build your longest streak of 
            perfect day.</span>
         </div>
         <div className ="streak-box">
            <div className ="current-streak">1 Day</div>
            <div className ="current-text">
              Your current streak
            </div>
            <div className ="longest-streak">1 Day</div>
            <div className ="longest-text">
              Your longest streak
            </div>
         </div>
        </div>
      </div>

      {/* Add Habit Popup */}
      {showAddHabit && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Add a New Habit</h2>
            <input type="text" placeholder="Enter your habit" />
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
