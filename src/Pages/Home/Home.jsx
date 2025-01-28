import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const navigate = useNavigate();

  const handleCalendarRedirect = () => {
    navigate('/calendar');
  };

  return (
    <div className="home-container">
      <div className="task-info">
        <h1>Task: Create a Scheduling Application</h1>
        <p>Created by: Amaan Sodagar</p>
      </div>
      <button className="calendar-button" onClick={handleCalendarRedirect}>
        Go to Interview Schedule Page
      </button>
    </div>
  );
};

export default Home;
