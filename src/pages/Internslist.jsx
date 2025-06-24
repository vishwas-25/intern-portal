import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboardnavbar from '../components/Dashboardnavbar';
import EditInternModal from '../components/EditInternModal';

const LOCAL_STORAGE_KEY = 'internsList';

const initialInterns = [
  { id: 1, name: 'Vishwas R', email: 'vishwas@example.com' },
  { id: 2, name: 'Anita S', email: 'anita@example.com' },
  { id: 3, name: 'Rahul T', email: 'rahul@example.com' },
];

const InternsList = () => {
  const navigate = useNavigate();

  const [interns, setInterns] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialInterns;
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editingIntern, setEditingIntern] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(interns));
  }, [interns]);

  const handleAddIntern = () => {
    const newIntern = {
      id: Date.now(),
      name: '',
      email: '',
    };

    setInterns((prev) => {
      const updated = [newIntern, ...prev];
      setTimeout(() => {
        setEditingIntern(newIntern);
        setEditName('');
        setEditEmail('');
        setShowEditModal(true);
      }, 0);
      return updated;
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this intern?')) {
      setInterns((prev) => prev.filter((intern) => intern.id !== id));
    }
  };

  const openEditModal = (intern, e) => {
    e.stopPropagation();
    setEditingIntern(intern);
    setEditName(intern.name);
    setEditEmail(intern.email);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingIntern) return;

    setInterns((prevInterns) =>
      prevInterns.map((intern) =>
        intern.id === editingIntern.id
          ? { ...intern, name: editName.trim(), email: editEmail.trim() }
          : intern
      )
    );
    setShowEditModal(false);
    setEditingIntern(null);
  };

  return (
    <>
      <Dashboardnavbar />

      <EditInternModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        intern={editingIntern}
        name={editName}
        setName={setEditName}
        email={editEmail}
        setEmail={setEditEmail}
        onSave={handleSaveEdit}
      />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Interns List</h3>
          <h5>Total Interns: {interns.length}</h5>
          <button className="btn btn-primary" onClick={handleAddIntern}>
            Add Intern
          </button>
        </div>

        <div className="row">
          {interns.length === 0 ? (
            <p>No interns found.</p>
          ) : (
            interns.map((intern) => (
              <div
                key={intern.id}
                className="col-md-4 mb-4"
                onClick={() => navigate(`/interns/${intern.id}`)} // ✅ Fixed here
              >
                <div
                  className="card h-100 shadow"
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{intern.name || '(No Name)'}</h5>
                    <p className="card-text">{intern.email || '(No Email)'}</p>

                    <button
                      className="btn btn-sm btn-danger"
                      style={{ position: 'absolute', top: '10px', right: '10px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(intern.id);
                      }}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      style={{ position: 'absolute', top: '10px', right: '80px' }}
                      onClick={(e) => openEditModal(intern, e)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default InternsList;
