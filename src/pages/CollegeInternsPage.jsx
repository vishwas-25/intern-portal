// CollegeInternsPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Dashboardnavbar from '../components/Dashboardnavbar';

const LOCAL_STORAGE_KEY = 'internsList';

const CollegeInternsPage = () => {
  const { college, year } = useParams();
  const navigate = useNavigate();
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  const interns = stored ? JSON.parse(stored) : [];

  const filtered = interns.filter(
    intern => intern.college.trim() === college && intern.year === year
  );

  return (
    <>
      <Dashboardnavbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>{college} Interns ({year})</h3>
          <Button variant="secondary" onClick={() => navigate('/interns', { state: { fromGrouped: true, groupedCollege: college } })}>← Back</Button>
        </div>

        <div className="row">
          {filtered.length === 0 ? (
            <p>No interns found.</p>
          ) : (
            filtered.map(intern => (
              <div
                key={intern.id}
                className="col-md-4 mb-4"
                onClick={() => navigate(`/interns/${intern.id}`, {
                  state: { fromGrouped: true, groupedCollege: college }
                })}
                style={{ cursor: 'pointer' }}
              >
                <Card className="h-100 shadow position-relative">
                  <Card.Body>
                    <Card.Title>{intern.name || '(No Name)'}</Card.Title>
                    <Card.Text>
                      {intern.email || '(No Email)'}
                      <br />
                      <strong>Year:</strong> {intern.year || 'N/A'}
                    </Card.Text>
                    <button
                      className="btn btn-sm btn-danger"
                      style={{ position: 'absolute', top: '10px', right: '10px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const confirm = window.confirm("Are you sure you want to delete this intern?");
                        if (confirm) {
                          const updatedInterns = interns.filter(i => i.id !== intern.id);
                          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedInterns));
                          window.location.reload();
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      style={{ position: 'absolute', top: '10px', right: '80px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/interns', { state: { editIntern: intern } });
                      }}
                    >
                      Edit
                    </button>
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

export default CollegeInternsPage;


