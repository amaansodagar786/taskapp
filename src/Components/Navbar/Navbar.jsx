import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaSignOutAlt, FaCalendarAlt, FaUserShield } from 'react-icons/fa';
import './Navbar.scss';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('token'); // Check if user is logged in
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">HR Schedule</Link>
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <Link to="/calendar">
              <FaCalendarAlt className="icon" />
              <span>Calendar</span>
            </Link>

            {/* Admin Dashboard Button for logged-in users */}
            <Link to="/dashboard">
              <FaUserShield className="icon" />
              <span>Admin Dashboard</span>
            </Link>
            
            <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt className="icon" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/register">
              <FaUserPlus className="icon" />
              <span>Register</span>
            </Link>
            <Link to="/login">
              <FaSignInAlt className="icon" />
              <span>Login</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
