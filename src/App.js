import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Register from './Pages/Authentication/Register';
import Login from './Pages/Authentication/Login';
import CalendarPage from './Pages/CalenderPage/CalendarPage';
import AppointmentUpdateForm from './Components/AppointmentUpdateForm.jsx/AppointmentUpdateForm';
import AppointmentDashboard from './Components/AppointmentUpdateForm.jsx/AppointmentDashboard';
import ProtectedRoute from './Protected/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="/calendar" 
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AppointmentDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/update/:id" 
          element={
            <ProtectedRoute>
              <AppointmentUpdateForm />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
