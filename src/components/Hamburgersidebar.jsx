import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hamburgersidebar = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (link) => {
    if (link.onClick) {
      link.onClick(); // e.g., Logout
    } else if (link.href) {
      navigate(link.href); // Navigate only if no onClick
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="btn btn-outline-light me-2"
        onClick={() => setIsOpen(true)}
      >
        <i className="bi bi-list fs-4"></i>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className="position-fixed top-0 start-0 bg-white h-100 p-4 shadow"
        style={{
          width: '250px',
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Menu</h5>
          <button className="btn btn-sm" onClick={() => setIsOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="list-unstyled">
          {links.map((link, index) => (
            <li key={index} className="mb-3">
              <button
                className="btn btn-link text-start text-dark text-decoration-none w-100"
                onClick={() => handleNav(link)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Hamburgersidebar;