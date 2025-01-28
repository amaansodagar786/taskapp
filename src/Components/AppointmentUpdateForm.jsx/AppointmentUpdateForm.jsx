import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./AppointmentUpdateForm.scss";

const AppointmentUpdateForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(''); // Time as string in HH:mm format
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current appointment details for the selected appointment ID
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(`https://task-backend-n37l.onrender.com/api/appointments/${id}`);
        const appointment = response.data;
        setName(appointment.name);
        setPosition(appointment.position);
        setDate(new Date(appointment.date));
        setTime(new Date(appointment.time).toISOString().substr(11, 5)); // Format time as HH:mm
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
      // Correctly combine date and time for the update
      const updatedDateTime = new Date(date); 
      const [hours, minutes] = time.split(':');
      updatedDateTime.setHours(hours, minutes); // Set hours and minutes from the time string

      const updatedAppointment = { 
        name, 
        position, 
        date: date.toISOString(), 
        time: updatedDateTime.toISOString() // Send the updated datetime as ISO string
      };

      await axios.put(`https://task-backend-n37l.onrender.com/api/appointments/${id}`, updatedAppointment);
      navigate('/dashboard'); 
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
              value={time} // Using the string format HH:mm
              onChange={(e) => setTime(e.target.value)}
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
