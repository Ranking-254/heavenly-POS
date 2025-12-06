import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the token exists in the browser's memory
  const token = localStorage.getItem('token');

  // If no token, kick them to the Login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, let them see the page
  return children;
};

export default PrivateRoute;