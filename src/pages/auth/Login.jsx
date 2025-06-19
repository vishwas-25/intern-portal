import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import homelogo from '../../assets/homelogo.jpg'; 
//import {useState} from 'react';

import dummydata from '../../data';

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find user from dummy data
    const user = dummydata.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Store user session
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/Adminlogin");
      } else {
        navigate("/dashboard");
      }
    } else {
      seterror("Invalid email or password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setemail(e.target.value)} 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)} 
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>

        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <div className="text-center mt-4">
          <Link to="/">
            <img
              src={homelogo}
              alt="Home Logo"
              style={{
                height: '60px',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;