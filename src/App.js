import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Register from './Pages/Authentication/Register';
import Login from './Pages/Authentication/Login';
import CalendarPage from './Pages/CalenderPage/CalendarPage';
import AppointmentDashboard from './Components/Appointments/AppointmentDashboard';
import AppointmentUpdateForm from './Components/AppointmentUpdateForm.jsx/AppointmentUpdateForm';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/dashboard" element={<AppointmentDashboard />} />
        <Route path="/update/:id" element={<AppointmentUpdateForm/>} />
        {/* <Route path="/update" element={<AppointmentDashboard/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
