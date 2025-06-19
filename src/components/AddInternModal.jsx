import React, { useState } from 'react';

const AddInternModal = ({ show, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!show) return null;

  const handleSubmit = () => {
    if (!name || !email) return alert('Both name and email are required.');
    onAdd(name, email);
    setName('');
    setEmail('');
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Intern</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Add Intern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInternModal;