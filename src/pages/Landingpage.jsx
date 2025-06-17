import React from 'react';
import nicsilogo from '../assets/nicsilogo.jpg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Landingpage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Welcome to NICSI Intern Portal</h1>
      <p className="lead">"A platform for managing internships easily."</p>

      <div className="mt-4">
        <Link to="/Login" className="btn btn-primary me-3">Login</Link>
        <Link to="/signup" className="btn btn-outline-primary">Sign Up</Link>
       <Link to="/Adminlogin" className="btn btn-danger ms-2 ">Admin Login</Link>
      </div>

      <div className="mt-5">
        <motion.img 
          src={nicsilogo} 
          alt="NICSI Logo" 
          className="img-fluid rounded shadow" 
          style={{ maxWidth: '600px' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

export default Landingpage;