// src/components/LogoutComponent.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Logout = () => {
  const navigate = useNavigate();


  useEffect (() => {
      console.log("useEffect fired")
      AuthService.logoutUser(); // Remove JWT token from localStorage
    console.log("logoutUser")
    navigate('/login'); // Redirect to login page after logout
  })


  return (
    <div>

    </div>
    
  );
};

export default Logout;