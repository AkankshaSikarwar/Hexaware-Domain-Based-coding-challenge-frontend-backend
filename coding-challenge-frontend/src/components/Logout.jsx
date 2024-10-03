// src/components/LogoutComponent.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Logout = () => {
  const navigate = useNavigate();


  useEffect (() => {
      console.log("useEffect fired")
      AuthService.logoutUser(); 
    console.log("logoutUser")
    navigate('/login'); 
  })


  return (
    <div>

    </div>
    
  );
};

export default Logout;