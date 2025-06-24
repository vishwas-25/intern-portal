import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';  

import nicsilogo from '../assets/nicsilogo.jpg';
import digitalIndiaLogo from '../assets/digilogo.png';
import swachhBharatLogo from '../assets/swatch-bharat.png';
import azadiLogo from '../assets/azadi.png';
import g20Logo from '../assets/g20.jpeg';
import ituLogo from '../assets/ituwsta.png';
import rightImage from '../assets/cardimage.jpeg';
import './Landingpage.css';

const Landingpage = () => {
  const { language, setLanguage } = useLanguage();  
  const [isLightBlue, setIsLightBlue] = useState(false);

  const toggleNavbarColor = () => {
    setIsLightBlue(!isLightBlue);
  };

  const content = {
    en: {
      title: 'NICSI Intern Portal',
      subtitle: 'A platform for managing internships easily',
      login: 'Login',
      signup: 'Sign Up',
      adminLogin: 'Admin Login',
      activeInterns: 'Active Interns',
      projects: 'Projects',
      contentOwned: 'Content Owned by National Informatics Centre Services Inc.',
      govtInfo: 'A Government of India Enterprise Under NIC Ministry of Electronics and Information Technology',
      quickLinks: 'Quick Links',
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      addressLine1: 'NICSI',
      addressLine2: '1st Floor, NBCC Tower,',
      addressLine3: 'Bhikaji Cama Place,',
      addressLine4: 'New Delhi – 110066.',
      copyright: `© ${new Date().getFullYear()} NICSI. All Rights Reserved.`,
    },
    hi: {
      title: 'एनआईसीएसआई इंटर्न पोर्टल',
      subtitle: 'इंटर्नशिप प्रबंधन के लिए एक मंच',
      login: 'लॉगिन',
      signup: 'साइन अप',
      adminLogin: 'एडमिन लॉगिन',
      activeInterns: 'सक्रिय इंटर्न',
      projects: 'परियोजनाएँ',
      contentOwned: 'सामग्री राष्ट्रीय सूचना विज्ञान केंद्र सेवाएं इंक. के स्वामित्व में है।',
      govtInfo: 'एनआईसी के तहत भारत सरकार का उद्यम, इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय',
      quickLinks: 'त्वरित लिंक',
      home: 'होम',
      about: 'के बारे में',
      contact: 'संपर्क करें',
      addressLine1: 'एनआईसीएसआई',
      addressLine2: 'प्रथम तल, एनबीसीसी टावर,',
      addressLine3: 'भीकाजी कैमाप्लेस,',
      addressLine4: 'नई दिल्ली – 110066।',
      copyright: `© ${new Date().getFullYear()} एनआईसीएसआई। सर्वाधिकार सुरक्षित।`,
    }
  };

  const lang = content[language];

  return (
    <div>

      <nav
        style={{
          backgroundColor: isLightBlue ? 'lightblue' : '#FA8620',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '8px',
        }}
      >
        {/* Language Dropdown */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: '6px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          aria-label="Select Language"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>

        {/* Circle Toggle Button */}
        <button
          onClick={toggleNavbarColor}
          title="Toggle Navbar Colors"
          style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'white',
            color: isLightBlue ? 'lightblue' : 'darkorange',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            userSelect: 'none',
          }}
          aria-label="Toggle Navbar Colors"
        >
          &#8226;{/* Unicode for dot  */}
        </button>
      </nav>

      {/* Brown Navbar */}
      <div className="custom-rosewood navbar" style={{ backgroundColor: isLightBlue ? '#003366' : '#6f4e37' }}>
        <div className="container d-flex justify-content-between align-items-center py-3 flex-nowrap">
          <div className="d-flex align-items-center flex-nowrap">
            <img
              src={nicsilogo}
              alt="NICSI Logo"
              width="150"
              height="70"
              className="me-4 flex-shrink-0"
            />
            <div className="text-white ms-2">
              <span className="fw-bold fs-5 d-block">
                National Informatics Centre Services Inc.
              </span>
              <p className="fw-bold fs-6 mb-0">(A Government of India Enterprise Under NIC)</p>
              <p className="fw-bold fs-6 mb-0">
                Ministry of Electronics & Information Technology
              </p>
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
                {language === 'en' ? 'NICSI ' : 'एनआईसीएसआई '}
                <span className="text-orange">{language === 'en' ? 'Intern Portal' : 'इंटर्न पोर्टल'}</span>
              </h1>
              <p className="lead fw-bold text-dark mb-4">{lang.subtitle}</p>

              <div className="d-flex gap-3 mb-5">
                <Link to="/Login" className="btn btn-danger px-4 py-2 fw-bold">{lang.login}</Link>
                <Link to="/signup" className="btn btn-warning px-4 py-2 fw-bold">{lang.signup}</Link>
                <Link to="/Adminlogin" className="btn btn-primary px-4 py-2 fw-bold ms-md-2">{lang.adminLogin}</Link>
              </div>

              <div className="d-flex gap-4 text-center">
                <div>
                  <h3 className="text-orange fw-bold">50+</h3>
                  <p className="small text-muted">{lang.activeInterns}</p>
                </div>
                <div>
                  <h3 className="text-orange fw-bold">25+</h3>
                  <p className="small text-muted">{lang.projects}</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Image */}
            <div className="col-md-6 d-flex justify-content-center">
              <img
                src={rightImage}
                alt={language === 'en' ? 'Intern illustration' : 'इंटर्न चित्रण'}
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
              <h5>{lang.contentOwned}</h5>
              <p>{lang.govtInfo}</p>
            </div>
            <div className="col-md-3">
              <h5>{lang.quickLinks}</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-white">{lang.home}</Link></li>
                <li><Link to="/about" className="text-white">{lang.about}</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>{lang.contact}</h5>
              <address>
                {lang.addressLine1}<br />
                {lang.addressLine2}<br />
                {lang.addressLine3}<br />
                {lang.addressLine4}
              </address>
            </div>
          </div>
          <hr className="bg-light" />
          <div className="text-center">
            <p className="mb-0">{lang.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;
