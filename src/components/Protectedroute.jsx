import React from 'react';
import { Navigate } from 'react-router-dom';

const Protectedroute = ({ children }) => {
  const storedUser = sessionStorage.getItem("loggedInUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return user ? children : <Navigate to="/login" />;
};

export default Protectedroute;