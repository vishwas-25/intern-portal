import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const dashboardpage = () => {
  return (
    <div>
    
      <nav className="navbar navbar-expand-lg thin-orange-navbar"></nav>
      <div className="custom-rosewood navbar text-white py-3 px-4">
        <h5 className="mb-0">NICSI Intern Portal</h5>
      </div>

      {/* Main Background Area */}
      <div className="background-wrapper">
        <div className="page-wrapper">
          <div className="content-row">
            {/* LEFT IMAGE AREA */}
            <div className="image-block left-image">
              {/* Simulated Left Image */}
            </div>

            {/* CENTER CONTENT */}
            <div className="content-center">
              <h1 className="fw-bold mb-3">NICSI <span className="text-orange">Intern Portal</span></h1>
              <p className="lead fw-medium">A platform for managing internships easily</p>
              <div className="d-flex gap-3 my-4">
                <Link to="/Login" className="btn btn-danger">Login</Link>
                <Link to="/signup" className="btn btn-warning">Sign Up</Link>
                <Link to="/Adminlogin" className="btn btn-primary">Admin Login</Link>
              </div>
              <div className="d-flex gap-4 text-center">
                <div>
                  <h3 className="text-orange">50+</h3>
                  <p className="small text-muted">Active Interns</p>
                </div>
                <div>
                  <h3 className="text-orange">25+</h3>
                  <p className="small text-muted">Projects</p>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE AREA */}
            <div className="image-block right-image">
              {/* Simulated Right Image */}
            </div>
          </div>
        </div>
      </div>

    
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} NICSI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default dashboardpage;