import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Dashboardnavbar from '../components/Dashboardnavbar';
import { Card, Modal, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';
import './Internslist.css';
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'internsList';
const API_URL = "http://192.168.0.112:3001/register"
// const initialInterns = [
//   { id: 1, name: 'Vishwas R', email: 'vishwas@example.com', college: 'MSIT', year: '2023' },
//   { id: 2, name: 'Anita S', email: 'anita@example.com', college: 'DTU', year: '2024' },
//   { id: 3, name: 'Rahul T', email: 'rahul@example.com', college: 'MSIT', year: '2023' },
//   { id: 4, name: 'Neha M', email: 'neha@example.com', college: 'IIIT', year: '2024' },
// ];

const resources = {
  en: {
    translation: {
      internsList: "Interns List",
      totalInterns: "Total Interns",
      addIntern: "Add Intern",
      noInternsFound: "No interns found.",
      noName: "(No Name)",
      noEmail: "(No Email)",
      edit: "Edit",
      delete: "Delete",
      confirmDelete: "Are you sure you want to delete this intern?",
    },
  },
};

const InternsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = resources[language]?.translation || resources.en.translation;

  const [interns, setInterns] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCollege, setEditCollege] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editingIntern, setEditingIntern] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [groupedView, setGroupedView] = useState(false);
  
  useEffect(async () => {
    const stored = await axios.get(API_URL);
    setInterns(stored.data)
  }, [])

  const {sortedYears, yearsMap} = sortingInterns()

  useEffect(() => {
    if (location.state?.fromGrouped && location.state.groupedCollege) {
      setGroupedView(true);
      window.history.replaceState({}, document.title);
    } else if (location.state?.fromGrouped === false) {
      setGroupedView(false);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(interns));
  }, [interns]);

  const handleAddIntern = () => {
    setEditingIntern(null);
    setEditName('');
    setEditEmail('');
    setEditCollege('');
    setEditYear('');
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const trimmedName = editName.trim();
    const trimmedEmail = editEmail.trim();
    const trimmedCollege = editCollege.trim();
    const trimmedYear = editYear.trim();

    if (!trimmedName || !trimmedEmail || !trimmedCollege || !trimmedYear) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingIntern) {
      setInterns(prev =>
        prev.map(i =>
          i.id === editingIntern.id
            ? { ...i, name: trimmedName, email: trimmedEmail, college: trimmedCollege, year: trimmedYear }
            : i
        )
      );
    } else {
      const newIntern = {
        id: Date.now(),
        name: trimmedName,
        email: trimmedEmail,
        college: trimmedCollege,
        year: trimmedYear,
      };
      setInterns(prev => [newIntern, ...prev]);
      setShowToast(true);
    }

    setShowEditModal(false);
    setEditingIntern(null);
  };

  const handleDelete = id => {
    if (window.confirm(t.confirmDelete)) {
      setInterns(prev => prev.filter(i => i.id !== id));
    }
  };

  const openEditModal = (intern, e) => {
    e.stopPropagation();
    setEditingIntern(intern);
    setEditName(intern.name || '');
    setEditEmail(intern.email || '');
    setEditCollege(intern.college || '');
    setEditYear(intern.year || '');
    setShowEditModal(true);
  };

  function sortingInterns(){
      const validInterns = interns.filter(i => i.college && i.college.trim());
      const yearsMap = validInterns.reduce((acc, intern) => {
        const yr = intern.year || 'Unknown';
        const clg = intern.college.trim();
        if (!acc[yr]) acc[yr] = {};
        if (!acc[yr][clg]) acc[yr][clg] = [];
        acc[yr][clg].push(intern);
        return acc;
      }, {});
      const sortedYears = Object.keys(yearsMap).sort((a, b) => parseInt(b) - parseInt(a));
      return {
        sortedYears, 
        yearsMap
      }
  }
  
  return (
    <>
      <Dashboardnavbar />
      <div className="intern-list-wrapper">
        <ToastContainer position="bottom-end" className="p-3">
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
            <Toast.Header closeButton>
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body className="text-white">Intern added successfully!</Toast.Body>
          </Toast>
        </ToastContainer>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{editingIntern ? "Edit Intern" : "Add Intern"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={editName} onChange={(e) => setEditName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>College</Form.Label>
                <Form.Control type="text" placeholder="Enter college" value={editCollege} onChange={(e) => setEditCollege(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control type="text" placeholder="Enter year" value={editYear} onChange={(e) => setEditYear(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSaveEdit}>Save</Button>
          </Modal.Footer>
        </Modal>

        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{t.internsList}</h3>
            <h5>{t.totalInterns}: {interns.length}</h5>
            <div className="d-flex gap-2">
              <button className="btn btn-secondary" onClick={() => setGroupedView(!groupedView)}>
                {groupedView ? 'Show All' : 'Sort by College'}
              </button>
              <button className="btn btn-primary" onClick={handleAddIntern}>
                {t.addIntern}
              </button>
            </div>
          </div>

          <div className="row">
            {interns.length === 0 ? (
              <p>{t.noInternsFound}</p>
            ) : groupedView ? (
              sortedYears.map((year) => {
                const collegeEntries = Object.entries(yearsMap[year]);

                return (
                  <div key={year} className="col-12 mb-4">
                    <h5 className="mb-3">{year}</h5>
                    <div className="d-flex flex-wrap gap-3">
                      {collegeEntries.map(([college, internList]) => (
                        <div key={college} className="ribbon-card p-3 text-center" onClick={() => navigate(`/grouped/${college}/${year}`)}>
                          <div><strong>{college}</strong></div>
                          <div>{internList.length} Interns</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              interns.map((intern) => (
                <div key={intern.id} className="col-md-4 mb-4">
                  <Card className="h-100  intern-card" onClick={() => navigate(`/interns/${intern.id}`, { state: { fromGrouped: false } })}>
                    <div className="background-image"></div>
                    <Card.Body>
                      <Card.Title>{intern.name || t.noName}</Card.Title>
                      <Card.Text>
                        {intern.email || t.noEmail}
                        <br />
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
      </div>
    </>
  );
};

export default InternsList;
