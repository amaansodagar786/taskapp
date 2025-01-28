import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Snackbar, Button } from '@mui/material';
import axios from 'axios';

import './CalendarPage.scss';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [time, setTime] = useState(new Date());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'position') {
      setPosition(e.target.value);
    }
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && position && date && time) {
      try {
        // Check if the time slot is available before scheduling
        const dateStr = date.toISOString();
        const timeStr = time.toISOString();
        const response = await axios.get('https://task-backend-n37l.onrender.com/api/appointments/check-time', {
          params: { date: dateStr, time: timeStr },
        });

        if (response.status === 200) {
          // If time is available, schedule the appointment
          await axios.post('https://task-backend-n37l.onrender.com/api/appointments', {
            name,
            position,
            date: dateStr,
            time: timeStr,
          });
          setSnackbarMessage('Appointment scheduled successfully!');
          setOpenSnackbar(true);
          setName('');
          setPosition('');
          setDate(new Date());
          setTime(new Date());
        }
      } catch (err) {
        setSnackbarMessage(err.response?.data?.message || 'Failed to schedule appointment.');
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage('Please fill in all fields.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="calendar-container">
      <h2>Schedule an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">

          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="input-group">

          <input
            type="text"
            name="position"
            value={position}
            onChange={handleInputChange}
            placeholder="Enter your position"
            required
          />
        </div>

        <div className="input-group">
          <label>Select Date:</label>
          <Calendar
            onChange={handleDateChange}
            value={date}
            minDate={new Date()}
            className="custom-calendar"
          />
        </div>

        <div className="selected-date">
          <p>Selected Date: {date.toDateString()}</p>
        </div>

        <div className="input-group">
          <label>Select Time:</label>
          <DatePicker
  selected={time}
  onChange={handleTimeChange}
  showTimeSelect
  showTimeSelectOnly
  timeIntervals={30}
  timeCaption="Time"
  dateFormat="h:mm aa"
  minTime={
    date.toDateString() === new Date().toDateString()
      ? new Date() // Current time for today's date
      : new Date().setHours(8, 0, 0) // 8:00 AM for future dates
  }
  maxTime={new Date().setHours(18, 0, 0)} // 6:00 PM
/>


        </div>

        <button type="submit" className="submit-btn">Schedule Appointment</button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={
          <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </div>
  );
};

export default CalendarPage;
