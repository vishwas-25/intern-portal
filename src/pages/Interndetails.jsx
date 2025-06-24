import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

const LOCAL_STORAGE_KEY = 'internsList';

function InternDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const internId = parseInt(id);

  const [intern, setIntern] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const found = stored.find((i) => i.id === internId);
    setIntern(found || null);
  }, [internId]);

  // Save updated intern to localStorage
  const handleSave = () => {
    const allInterns = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const updatedList = allInterns.map((i) => (i.id === intern.id ? intern : i));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntern((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (label, value, name, type = 'text') => {
    return isEditing ? (
      <Form.Group className="mb-3" controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} name={name} value={value} onChange={handleChange} />
      </Form.Group>
    ) : (
      <p>
        <strong>{label}:</strong> {value || <em>Not specified</em>}
      </p>
    );
  };

  if (!intern) {
    return <Container className="mt-4"><p>Intern not found.</p></Container>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{intern.name || 'Intern'}'s Details</h3>
            <div>
              {isEditing ? (
                <Button variant="success" onClick={handleSave}>Save</Button>
              ) : (
                <Button variant="outline-primary" onClick={() => setIsEditing(true)}>Edit</Button>
              )}
              <Button variant="secondary" className="ms-2" onClick={() => navigate(-1)}>Back</Button>
            </div>
          </div>

          <Form>
            {renderField('Name', intern.name, 'name')}
            {renderField('Email', intern.email, 'email')}
            {renderField('Phone', intern.phone, 'phone')}
            {renderField('Website', intern.website, 'website')}
            {renderField('LinkedIn', intern.linkedin, 'linkedin')}
            {renderField('Telegram', intern.telegram, 'telegram')}
            {renderField('Username', intern.username, 'username')}
            {renderField('Birthday', intern.birthday, 'birthday')}
            {renderField('Gender', intern.gender, 'gender')}
            {renderField('Domain', intern.domain, 'domain')}
            {renderField('Mentor', intern.mentor, 'mentor')}
            {renderField('Status', intern.status, 'status')}

            {isEditing ? (
              <Form.Group className="mb-3" controlId="about">
                <Form.Label>About</Form.Label>
                <Form.Control as="textarea" rows={3} name="about" value={intern.about} onChange={handleChange} />
              </Form.Group>
            ) : (
              <p><strong>About:</strong> {intern.about || <em>Not specified</em>}</p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default InternDetails;

