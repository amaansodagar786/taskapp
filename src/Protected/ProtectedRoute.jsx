// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage after login

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login page if not logged in
  }

  return children; // Allow access to the route if logged in
};

export default ProtectedRoute;
