import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AppointmentUpdateForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current appointment details for the selected appointment ID
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/appointments/${id}`);
        const appointment = response.data;
        setName(appointment.name);
        setPosition(appointment.position);
        setDate(new Date(appointment.date));
        setTime(new Date(appointment.time));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointment details', err);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send updated details to backend to save changes
      const updatedAppointment = { name, position, date, time };
      await axios.put(`http://localhost:4000/api/appointments/${id}`, updatedAppointment);
      navigate('/dashboard'); // Redirect to the dashboard after successful update
    } catch (err) {
      console.error('Error updating appointment', err);
    }
  };

  return (
    <div>
      <h2>Update Appointment</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Position:</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Date:</label>
            <input
              type="date"
              value={date.toISOString().substr(0, 10)} // Format to YYYY-MM-DD
              onChange={(e) => setDate(new Date(e.target.value))}
              required
            />
          </div>

          <div>
            <label>Time:</label>
            <input
              type="time"
              value={time.toISOString().substr(11, 5)} // Format to HH:MM
              onChange={(e) => setTime(new Date(`1970-01-01T${e.target.value}:00`))}
              required
            />
          </div>

          <button type="submit">Update Appointment</button>
        </form>
      )}
    </div>
  );
};

export default AppointmentUpdateForm;
