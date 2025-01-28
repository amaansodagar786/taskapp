import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate

const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function here

  useEffect(() => {
    // Fetch appointments when the component mounts
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/appointments');
        setAppointments(response.data);
      } catch (err) {
        console.error('Error fetching appointments', err);
      }
    };

    fetchAppointments();
  }, []);

  // Delete an appointment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/appointments/${id}`);
      setAppointments(appointments.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error('Error deleting appointment', err);
    }
  };

  // Update an appointment (Navigate to update page)
  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Use the navigate function to redirect
  };

  return (
    <div>
      <h2>Appointments Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.name}</td>
              <td>{appointment.position}</td>
              <td>{new Date(appointment.date).toDateString()}</td>
              <td>{new Date(appointment.time).toLocaleTimeString()}</td>
              <td>
                <button onClick={() => handleUpdate(appointment._id)}>Edit</button>
                <button onClick={() => handleDelete(appointment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentDashboard;
