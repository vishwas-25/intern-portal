import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hamburgersidebar from './Hamburgersidebar';


const Dashboardnavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const getGreetings = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Profile', href: '/profile' },
    { label: "Interns List", href: "/interns"},
    { label: 'Settings', href: '/settings' },
    { label: 'Logout', href: '/login', onClick: handleLogout },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      {/* 👇 Include the sidebar component and pass navLinks as a prop */}
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