import React from 'react';
import { useParams } from 'react-router-dom';

const mockInterns = [
  { id: 1, name: 'Vishwas R', email: 'vishwas@example.com', domain: 'Web Dev', mentor: 'John', status: 'Active' },
  { id: 2, name: 'Anita S', email: 'anita@example.com', domain: 'AI', mentor: 'Lisa', status: 'On Hold' },
  { id: 3, name: 'Rahul T', email: 'rahul@example.com', domain: 'UI/UX', mentor: 'Tom', status: 'Completed' },
];

const Interndetails = () => {
  const { id } = useParams();
  const intern = mockInterns.find((i) => i.id === parseInt(id));

  if (!intern) return <div className="container mt-4"><h4>Intern not found</h4></div>;

  return (
    <div className="container mt-4">
      <h3>{intern.name}'s Details</h3>
      <div className="card shadow p-3">
        <p><strong>Email:</strong> {intern.email}</p>
        <p><strong>Domain:</strong> {intern.domain}</p>
        <p><strong>Mentor:</strong> {intern.mentor}</p>
        <p><strong>Status:</strong> {intern.status}</p>
      </div>
    </div>
  );
};

export default Interndetails;