// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Check if the token is present and valid
  let isAuthenticated = false;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds

      // Ensure the token is not expired
      if (decodedToken.exp > currentTime) {
        isAuthenticated = true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // If authenticated, render the child component (Outlet)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
