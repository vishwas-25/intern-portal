import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Dropdown, Badge } from "react-bootstrap";
import { BsPencilSquare } from 'react-icons/bs';
import Dashboardnavbar from '../../components/Dashboardnavbar';

const defaultProfilePic = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
useEffect(() => {
  // Set mock user (this line just saves it)
  sessionStorage.setItem("loggedInUser", JSON.stringify({
    name: "Mehak",
    email: "mehak@example.com",
    college: "ABC College",
    phone: "9876543210",
    role: "Frontend Developer",
    skills: "React, HTML, CSS"
  }));

  // Then retrieve it
  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (storedUser) setUser(storedUser);
}, []);

  //useEffect(() => {
   // const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

 // const storedUser = JSON.parse(sessionStorage.setItem("loggedInUser", JSON.stringify({
  //name: "Mehak",
  //email: "mehak@example.com",
 // college: "ABC College",
  //phone: "9876543210",
  //role: "Frontend Developer",
  //skills: "React, HTML, CSS"
 //}) ) );

   // if (storedUser) setUser(storedUser);
  // }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Save changes
      const updatedUser = {
        ...user,
        name: document.getElementById("name").value,
        role: document.getElementById("role").value,
        college: document.getElementById("college").value,
        skills: document.getElementById("skills").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
      };
      setUser(updatedUser);
      sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    }
    setIsEditing(!isEditing);
  };

  const triggerFileUpload = () => fileInputRef.current?.click();

  if (!user) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <>
      <Dashboardnavbar />
      <Container className="mt-5">
        <Row>
          <Col md={4}>
            <div className="position-relative mb-3 text-center">
              <img
                src={profilePic || defaultProfilePic}
                className="rounded-circle"
                alt="User"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <Dropdown className="position-absolute" style={{ top: 0, right: 0 }}>
                <Dropdown.Toggle variant="light" size="sm" style={{ borderRadius: "50%", padding: "4px" }}>
                  <BsPencilSquare />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={triggerFileUpload}>📁 Upload a Picture</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>

            {isEditing ? (
              <div className="px-4">
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control id="name" type="text" defaultValue={user.name} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Role</Form.Label>
                  <Form.Control id="role" type="text" defaultValue={user.role || "Intern"} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>College</Form.Label>
                  <Form.Control id="college" type="text" defaultValue={user.college} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control id="skills" type="text" defaultValue={user.skills || "React, JavaScript"} />
                </Form.Group>
              </div>
            ) : (
              <div className="text-center">
                <h5 className="fw-bold">{user.name}</h5>
                <p className="text-muted mb-1">{user.role || 'Intern'}</p>
                <p className="mb-1">🎓 {user.college}</p>
                <p className="mb-1">💼 Skills: {user.skills || 'React, JavaScript'}</p>
              </div>
            )}

            <div className="text-start px-4 mt-3">
              <h6 className="fw-bold">Works</h6>
              <div className="mb-2">
                <div className="fw-semibold">Spotify New York <Badge bg="primary">Primary</Badge></div>
                <div>170 William Street, NY 10038</div>
              </div>
              <div>
                <div className="fw-semibold">Metropolitan Museum <Badge bg="secondary">Secondary</Badge></div>
                <div>525 E 68th Street, NY 10051</div>
              </div>
            </div>
          </Col>

          <Col md={{ span: 7, offset: 1 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold">Contact Information</h4>
              <Button variant="outline-primary" onClick={toggleEdit}>
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>

            {!isEditing ? (
              <>
                <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Department:</strong> {user.department || 'CSE'}</p>
                <p><strong>Website:</strong> www.mehak.dev</p>
                <p><strong>LinkedIn:</strong> linkedin.com/in/mehak</p>

                <h5 className="fw-bold mt-4">Basic Information</h5>
                <p><strong>Username:</strong> {user.name?.toUpperCase().replace(/\s/g, '')}123</p>
                <p><strong>Role:</strong> {user.role || 'Intern'}</p>
                <p><strong>Birthday:</strong> June 5, 2002</p>
                <p><strong>Gender:</strong> Female</p>

                <h5 className="fw-bold mt-4">About</h5>
                <p>I am a passionate frontend developer.</p>
              </>
            ) : (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control id="phone" type="text" defaultValue={user.phone} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control id="email" type="email" defaultValue={user.email} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control type="text" defaultValue="www.mehak.dev" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control type="text" defaultValue="linkedin.com/in/mehak" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" defaultValue={user.name?.toUpperCase().replace(/\s/g, '') + '123'} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control type="text" defaultValue="June 5, 2002" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control type="text" defaultValue="Female" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>About</Form.Label>
                  <Form.Control as="textarea" rows={3} defaultValue="I am a passionate frontend developer." />
                </Form.Group>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
