// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthProvider';

const ProtectedRoute = () => {

  const {auth} = useContext(AuthContext)
  const location = useLocation()
  
  return auth?.username ? <Outlet/> : <Navigate to="/login" state={{from:location}} replace/>;

  // const location = useLocation();
  // const token = localStorage.getItem('token');

  // let isAuthenticated = false;
  // if (token) {
  //   try {
  //     const decodedToken = jwtDecode(token);
  //     const currentTime = Date.now() / 1000; 

  //     if (decodedToken.exp > currentTime) {
  //       isAuthenticated = true;
  //     }
  //   } catch (error) {
  //     console.error("Invalid token:", error);
  //   }
  // }

  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
