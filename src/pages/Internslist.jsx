import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboardnavbar from '../components/Dashboardnavbar';
import AddInternModal from '../components/AddInternModal';
import EditInternModal from '../components/EditInternModal';

const initialInterns = [
  { id: 1, name: 'Vishwas R', email: 'vishwas@example.com' },
  { id: 2, name: 'Anita S', email: 'anita@example.com' },
  { id: 3, name: 'Rahul T', email: 'rahul@example.com' },
];

const InternsList = () => {
  const [interns, setInterns] = useState(initialInterns);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editingIntern, setEditingIntern] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredInterns = interns.filter((intern) =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddIntern = (name, email) => {
    const newIntern = {
      id: Date.now(),
      name,
      email,
    };
    setInterns([newIntern, ...interns]);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this intern?');
    if (confirm) {
      setInterns(interns.filter((intern) => intern.id !== id));
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
    setInterns(
      interns.map((intern) =>
        intern.id === editingIntern.id ? { ...intern, name: editName, email: editEmail } : intern
      )
    );
    setShowEditModal(false);
    setEditingIntern(null);
  };

  return (
    <>
      <Dashboardnavbar />

      <AddInternModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddIntern}
      />

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
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            Add Intern
          </button>
        </div>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="row">
          {filteredInterns.length === 0 ? (
            <p>No interns found.</p>
          ) : (
            filteredInterns.map((intern) => (
              <div
                key={intern.id}
                className="col-md-4 mb-4"
                onClick={() => navigate(`/interns/${intern.id}`)}
              >
                <div className="card h-100 shadow" style={{ cursor: 'pointer', position: 'relative' }}>
                  <div className="card-body">
                    <h5 className="card-title">{intern.name}</h5>
                    <p className="card-text">{intern.email}</p>

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
