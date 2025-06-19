import React from 'react';
import { Link } from 'react-router-dom';
import nicsilogo from '../assets/nicsilogo.jpg';
import digitalIndiaLogo from '../assets/digilogo.png';
import swachhBharatLogo from '../assets/swatch-bharat.png';
import azadiLogo from '../assets/azadi.png';
import g20Logo from '../assets/g20.jpeg';
import ituLogo from '../assets/ituwsta.png';
import rightImage from '../assets/cardimage.jpeg'; 
import './Landingpage.css';

const Landingpage = () => {
  return (
    <div>
    
      <nav className="navbar navbar-expand-lg orange-navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/about"></Link>
            </li>
          </ul>
        </div>
      </nav>

      {/*  Brown Navbar */}
      <div className="custom-rosewood navbar">
        <div className="container d-flex justify-content-between align-items-center py-3 flex-nowrap">
          <div className="d-flex align-items-center flex-nowrap">
            <img src={nicsilogo} alt="NICSI Logo" width="150" height="70" className="me-4 flex-shrink-0" />
            <div className="text-white ms-2">
              <span className="fw-bold fs-5 d-block">National Informatics Centre Services Inc.</span>
              <p className="fw-bold fs-6 mb-0">(A Government of India Enterprise Under NIC)</p>
              <p className="fw-bold fs-6 mb-0">Ministry of Electronics & Information Technology</p>
            </div>
          </div>
          <div className="d-flex align-items-center ms-4 flex-nowrap logo-strip">
            <img src={digitalIndiaLogo} alt="Digital India" height="45" className="mx-1" />
            <img src={swachhBharatLogo} alt="Swachh Bharat" height="45" className="mx-1" />
            <img src={azadiLogo} alt="Azadi Ka Amrit Mahotsav" height="45" className="mx-1" />
            <img src={g20Logo} alt="G20 India" height="45" className="mx-1" />
            <img src={ituLogo} alt="ITU WTSA" height="45" className="mx-1" />
          </div>
        </div>
      </div>

      {/* Background section */}
      <div className="background-wrapper">
        <div className="page-wrapper">
          <div className="row align-items-center">
            {/* LEFT COLUMN - Text & Buttons */}
            <div className="col-md-6 d-flex flex-column justify-content-center pe-md-5">
              <h1 className="display-4 fw-bolder text-dark mb-4">
                NICSI <span className="text-orange">Intern Portal</span>
              </h1>
              <p className="lead fw-bold text-dark mb-4">
                A platform for managing internships easily
              </p>

              <div className="d-flex gap-3 mb-5">
                <Link to="/Login" className="btn btn-danger px-4 py-2 fw-bold">Login</Link>
                <Link to="/signup" className="btn btn-warning px-4 py-2 fw-bold">Sign Up</Link>
                <Link to="/Adminlogin" className="btn btn-primary px-4 py-2 fw-bold ms-md-2">Admin Login</Link>
              </div>

              <div className="d-flex gap-4 text-center">
                <div>
                  <h3 className="text-orange fw-bold">50+</h3>
                  <p className="small text-muted">Active Interns</p>
                </div>
                <div>
                  <h3 className="text-orange fw-bold">25+</h3>
                  <p className="small text-muted">Projects</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Image */}
            <div className="col-md-6 d-flex justify-content-center">
              <img
                src={rightImage}
                alt="Intern illustration"
                className="img-fluid"
                style={{ maxHeight: '400px', borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer mt-auto py-4 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>Content Owned by <br />National Informatics Centre Services Inc.</h5>
              <p>A Government of India Enterprise Under NIC<br />
                Ministry of Electronics and Information Technology</p>
            </div>
            <div className="col-md-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-white">Home</Link></li>
                <li><Link to="/about" className="text-white">About</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Contact</h5>
              <address>
                NICSI<br />
                1st Floor, NBCC Tower,<br />
                Bhikaji Cama Place,<br />
                New Delhi – 110066.
              </address>
            </div>
          </div>
          <hr className="bg-light" />
          <div className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} NICSI. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;
