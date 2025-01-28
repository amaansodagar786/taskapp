import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AppointmentDashboard.scss";

const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://task-backend-n37l.onrender.com/api/appointments');
        setAppointments(response.data);
      } catch (err) {
        console.error('Error fetching appointments', err);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://task-backend-n37l.onrender.com/api/appointments/${id}`);
      setAppointments(appointments.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error('Error deleting appointment', err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="appointment-dashboard">
      <h2>Appointments Dashboard</h2>
      <table className="appointment-table">
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
              <td className="actions">
                <button onClick={() => handleUpdate(appointment._id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(appointment._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentDashboard;
