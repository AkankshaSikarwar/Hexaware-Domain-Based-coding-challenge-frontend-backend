import { createContext, useContext } from "react";
 
import React from 'react'
import { AuthContext } from "../context/AuthProvider";

 
export const useAuth = () => {
  return useContext(AuthContext)
 
}
