import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Dropdown, Badge } from "react-bootstrap";
import { BsPencilSquare } from 'react-icons/bs';
import Dashboardnavbar from '../../components/Dashboardnavbar';

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const [name, setName] = useState("Mehak Singh");
  const [role, setRole] = useState("Frontend Developer");
  const [location, setLocation] = useState("Delhi, India");
  const [skills, setSkills] = useState("React, JavaScript, Bootstrap");

  const [spotifyAddress, setSpotifyAddress] = useState("170 William Street\nNew York, NY 10038\n+78 212-312-4251");
  const [metMuseumAddress, setMetMuseumAddress] = useState("525 E 68th Street\nNew York, NY 10051\n+78 156-187-60");

  const defaultProfilePic = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);
  const triggerFileUpload = () => fileInputRef.current?.click();

  return (
    <>
      <Dashboardnavbar />
      <Container className="mt-5">
        <Row>
          {/* Left Column */}
          <Col md={4}>
            {/* Profile Image */}
            <div className="position-relative mb-3" style={{ width: "fit-content", margin: "0 auto" }}>
              <img
                src={profilePic || defaultProfilePic}
                className="rounded-circle"
                alt="User"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <Dropdown className="position-absolute" style={{ top: 0, right: 0 }}>
                <Dropdown.Toggle
                  variant="light"
                  size="sm"
                  style={{
                    borderRadius: "50%",
                    padding: "4px",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                  }}
                >
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

            {/* Editable Info Below Image */}
            {isEditing ? (
              <div className="px-4">
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Role</Form.Label>
                  <Form.Control type="text" value={role} onChange={(e) => setRole(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
                </Form.Group>
              </div>
            ) : (
              <div className="text-center">
                <h5 className="fw-bold">{name}</h5>
                <p className="text-muted mb-1">{role}</p>
                <p className="mb-1">📍 {location}</p>
                <p className="mb-1">💼 Skills: {skills}</p>
              </div>
            )}

            {/* Works Section */}
            <div className="text-start px-4 mt-3">
              <h6 className="fw-bold">Works</h6>
              {isEditing ? (
                <>
                  <Form.Group className="mb-2">
                    <Form.Label>Spotify New York</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={spotifyAddress}
                      onChange={(e) => setSpotifyAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Metropolitan Museum</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={metMuseumAddress}
                      onChange={(e) => setMetMuseumAddress(e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : (
                <>
                  <div className="mb-2">
                    <div className="fw-semibold">
                      Spotify New York <Badge bg="primary">Primary</Badge>
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{spotifyAddress}</div>
                  </div>
                  <div>
                    <div className="fw-semibold">
                      Metropolitan Museum <Badge bg="secondary">Secondary</Badge>
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{metMuseumAddress}</div>
                  </div>
                </>
              )}
            </div>
          </Col>

          {/* Right Column */}
          <Col md={{ span: 7, offset: 1 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold">Contact Information</h4>
              <Button variant="outline-primary" onClick={toggleEdit}>
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>

            {!isEditing ? (
              <>
                <p><strong>Phone:</strong> +91 875578</p>
                <p><strong>Email:</strong> MEHAK.@gmail.com</p>
                <p><strong>Website:</strong> www.mehak.dev</p>
                <p><strong>LinkedIn:</strong> fvgfdgg</p>
                <p><strong>Telegram:</strong> fgfhhhh</p>

                <h5 className="fw-bold mt-4">Basic Information</h5>
                <p><strong>Username:</strong> MEHAK130500</p>
                <p><strong>Role:</strong> Developer</p>
                <p><strong>Birthday:</strong> June 5, 1992</p>
                <p><strong>Gender:</strong> Female</p>

                <h5 className="fw-bold mt-4">About</h5>
                <p>I am a frontend developer</p>
              </>
            ) : (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" defaultValue="+91 875578" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" defaultValue="MEHAK.@gmail.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control type="text" defaultValue="www.mehak.dev" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control type="text" defaultValue="fvgfdgg" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Telegram</Form.Label>
                  <Form.Control type="text" defaultValue="fgfhhhh" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" defaultValue="MEHAK130500" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control type="text" defaultValue="June 5, 1992" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control type="text" defaultValue="Female" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>About</Form.Label>
                  <Form.Control as="textarea" rows={3} defaultValue="I am a frontend developer" />
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
