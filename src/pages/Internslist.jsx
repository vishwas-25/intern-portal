import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboardnavbar from '../components/Dashboardnavbar';
import { Card, Modal, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import './Internslist.css';
import axios from 'axios';

const API_URL = "http://192.168.0.135:3001/register";

const InternsList = () => {
  const navigate = useNavigate();

  const t = {
    internsList: "Interns List",
    totalInterns: "Total Interns",
    addIntern: "Add Intern",
    noInternsFound: "No interns found.",
    noName: "(No Name)",
    noEmail: "(No Email)",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this intern?",
  };

  const [interns, setInterns] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCollege, setEditCollege] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [editJoinDate, setEditJoinDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editingIntern, setEditingIntern] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [groupedView, setGroupedView] = useState(false);

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const response = await axios.get(API_URL);
      const internsData = response.data.data.map(intern => ({
        id: intern._id,
        name: intern.name,
        email: intern.email,
        college: intern.college?.trim(),
        year: intern.year,
        department: intern.department,
        joinDate: intern.joinDate?.slice(0, 10),
        endDate: intern.endDate?.slice(0, 10)
      }));
      console.log(internsData)
      setInterns(internsData);
      localStorage.setItem("internsList", JSON.stringify(internsData)); // useful for CollegeInternsPage
    } catch (error) {
      console.error("Error fetching interns:", error);
    }
  };

  const handleAddIntern = () => {
    setEditingIntern(null);
    setEditName('');
    setEditEmail('');
    setEditCollege('');
    setEditYear('');
    setEditDepartment('');
    setEditJoinDate('');
    setEditEndDate('');
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    const newIntern = {
      name: editName,
      email: editEmail,
      college: editCollege,
      Year: editYear,
      department: editDepartment,
      joinDate: editJoinDate,
      endDate: editEndDate,
    };

    try {
      const response = await axios.post(API_URL, newIntern, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const savedIntern = {
        ...newIntern,
        id: response.data._id || Date.now(),
        college: editCollege.trim(),
        year: editYear || new Date(editJoinDate).getFullYear().toString()
      };

      const updatedInterns = [savedIntern, ...interns];
      setInterns(updatedInterns);
      localStorage.setItem("internsList", JSON.stringify(updatedInterns));
      setShowToast(true);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error saving intern:", error);
      alert("Error saving intern. Check console.");
    }
  };

  const handleDelete = id => {
    if (window.confirm(t.confirmDelete)) {
      const updated = interns.filter(i => i.id !== id);
      setInterns(updated);
      localStorage.setItem("internsList", JSON.stringify(updated));
    }
  };

  const openEditModal = (intern, e) => {
    e.stopPropagation();
    setEditingIntern(intern);
    setEditName(intern.name || '');
    setEditEmail(intern.email || '');
    setEditCollege(intern.college || '');
    setEditYear(intern.year || '');
    setEditDepartment(intern.department || '');
    setEditJoinDate(intern.joinDate || '');
    setEditEndDate(intern.endDate || '');
    setShowEditModal(true);
  };

  const sortingInterns = () => {
    const validInterns = interns.filter(i => i.college && i.college.trim());

    const yearsMap = validInterns.reduce((acc, intern) => {
      const yr = intern.year || 'Unknown';
      const clg = intern.college?.trim() || 'Unknown';
      if (!acc[yr]) acc[yr] = {};
      if (!acc[yr][clg]) acc[yr][clg] = [];
      acc[yr][clg].push(intern);
      return acc;
    }, {});

    const sortedYears = Object.keys(yearsMap).sort((a, b) => parseInt(b) - parseInt(a));
    return { sortedYears, yearsMap };
  };

  const { sortedYears, yearsMap } = sortingInterns();

  return (
    <>
      <Dashboardnavbar />

      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
          <Toast.Header closeButton>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Intern added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Add/Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editingIntern ? "Edit Intern" : "Add Intern"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2"><Form.Label>Name</Form.Label><Form.Control type="text" value={editName} onChange={(e) => setEditName(e.target.value)} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Email</Form.Label><Form.Control type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>College</Form.Label><Form.Control type="text" value={editCollege} onChange={(e) => setEditCollege(e.target.value)} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Year</Form.Label><Form.Control type="text" value={editYear} onChange={(e) => setEditYear(e.target.value)} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Department</Form.Label><Form.Control type="text" value={editDepartment} onChange={(e) => setEditDepartment(e.target.value)} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Join Date</Form.Label><Form.Control type="date" value={editJoinDate} onChange={(e) => setEditJoinDate(e.target.value)} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>End Date</Form.Label><Form.Control type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} /></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Intern List */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <h3>{t.internsList}</h3>
          <h5>{t.totalInterns}: {interns.length}</h5>
          <div>
            <button className="btn btn-secondary me-2" onClick={() => setGroupedView(!groupedView)}>
              {groupedView ? 'Show All' : 'Sort by College'}
            </button>
            <button className="btn btn-primary" onClick={handleAddIntern}>{t.addIntern}</button>
          </div>
        </div>

        <div className="row">
          {interns.length === 0 ? (
            <p>{t.noInternsFound}</p>
          ) : groupedView ? (
            sortedYears.map((year) => (
              <div key={year} className="col-12 mb-4">
                <h5>{year}</h5>
                <div className="d-flex flex-wrap gap-3">
                  {Object.entries(yearsMap[year]).map(([college, internList]) => (
                    <div key={college} className="ribbon-card p-3 text-center" onClick={() => navigate(`/grouped/${college}/${year}`)}>
                      <strong>{college}</strong><div>{internList.length} Interns</div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            interns.map((intern) => (
              <div key={intern.id} className="col-md-4 mb-4">
                <Card className="h-100 intern-card" onClick={() => navigate(`/interns/${intern.id}`, { state: { fromGrouped: false } })}>
                  <Card.Body>
                    <Card.Title>{intern.name || t.noName}</Card.Title>
                    <Card.Text>
                      {intern.email || t.noEmail}<br />
                      <strong>Year:</strong> {intern.year || 'N/A'}
                    </Card.Text>
                    <button className="btn btn-sm btn-danger" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={(e) => { e.stopPropagation(); handleDelete(intern.id); }}>{t.delete}</button>
                    <button className="btn btn-sm btn-warning" style={{ position: 'absolute', top: '10px', right: '80px' }} onClick={(e) => openEditModal(intern, e)}>{t.edit}</button>
                  </Card.Body>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default InternsList;
