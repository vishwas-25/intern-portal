import React from 'react';
import { Link } from 'react-router-dom';
import homelogo from '../../assets/homelogo.jpg'; 
import {useState} from 'react';

const Login = () => {
    const myUser = {
        'email': 'vishwas@gmail.com',
        'password': 'nicsi123'
    }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" />
          </div>

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