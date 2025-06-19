import React from 'react';
import { Link } from 'react-router-dom';
import homelogo from '../../assets/homelogo.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dummydata from '../../data';
const Signup = () => {
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    setError("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  const userExists = dummydata.find((user) => user.email === email);
  if (userExists) {
    setError("User already exists");
    return;
  }

  const newUser = {
    name,
    email,
    password,
    role: 'intern'  // default role
  };

  dummydata.push(newUser); // Just for demo
  localStorage.setItem("loggedInUser", JSON.stringify(newUser));
  navigate("/Dashboard");
};
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">Sign Up</h3>

        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Full Name</label>
    <input
      type="text"
      className="form-control"
      id="name"
      placeholder="Enter your full name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input
      type="email"
      className="form-control"
      id="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input
      type="password"
      className="form-control"
      id="password"
      placeholder="Create a password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
    <input
      type="password"
      className="form-control"
      id="confirmPassword"
      placeholder="Confirm your password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />
  </div>

  {error && (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  )}

  <div className="d-grid">
    <button type="submit" className="btn btn-success">Sign Up</button>
  </div>
</form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
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

export default Signup;
