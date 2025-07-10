import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line
import axios from 'axios';
import Hamburgersidebar from './Hamburgersidebar';
// eslint-disable-next-line
const API_URL = "http://192.168.0.135:3001";

// Allow cookies to be sent
// axios.defaults.withCredentials = true;

const Dashboardnavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));  

  const getGreetings = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogout = async () => {
    try {
      console.log('in handle logut')
      // await axios.post(`${API_URL}/logout`); // Call logout API
      sessionStorage.clear();  // Clear stored user session info
      navigate("/login");      // Redirect to login
    } catch (error) {
      console.log('in navbar logout')
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Profile', href: '/profile' },
    { label: "Interns List", href: "/interns"},
    { label: 'Settings', href: '/settings' },
    { label: 'Logout', href: '#', onClick: handleLogout }, // Don't navigate directly
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <Hamburgersidebar links={navLinks} />

      <a className="navbar-brand" href="/">Intern Dashboard</a>

      <div className="ms-auto text-white d-flex align-items-center gap-3">
        <span>
          {getGreetings()}, <strong>{user?.name || 'Intern'} 👋</strong>
        </span>
        <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Dashboardnavbar;
