import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Dashboardnavbar from "../components/Dashboardnavbar";
import axios from "axios";
import "./Internslist.css";

const API_BASE_URL = "http://192.168.0.112:3001/register"
const InternDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const cameFromGrouped = location.state?.fromGrouped || false;
  const groupedCollege = location.state?.groupedCollege || null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
    department: "",
    joinDate: "",
    endDate: ""
  });

  // 🔍 Fetch intern data from backend
  useEffect(() => {
    const fetchIntern = async () => {
      try {
        console.log("Fetching intern with ID:", id);

        const response = await axios.get(`${API_BASE_URL}/${id}`);
        console.log("Backend response:", response.data);

        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          college: response.data.college || "",
          phone: response.data.phone || "",
          department: response.data.department || "",
          joinDate: response.data.joinDate?.slice(0, 10) || "",
          endDate: response.data.endDate?.slice(0, 10) || ""
        });
      } catch (error) {
        console.error("Error fetching intern:", error);
      }
    };

    fetchIntern();
  }, [id]);

  // 💾 Save changes to backend
  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, formData);
      setIsEditing(false);
      alert("Intern data saved to database.");
    } catch (error) {
      console.error("Error saving intern data:", error);
      alert("Failed to save intern data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    navigate("/interns", {
      state: cameFromGrouped
        ? { fromGrouped: true, groupedCollege }
        : { fromGrouped: false },
    });
  };

  return (
    <>
      <Dashboardnavbar />
      <div className="outside">
        <Container className="mt-4" style={{ maxWidth: "700px" }}>
          <Row className="mb-3 align-items-center">
            <Col>
              <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {formData.name || "Intern"}'s Details
              </h2>
            </Col>
            <Col className="text-end">
              <Button variant="secondary" onClick={handleBack} className="me-2">
                Back
              </Button>
              {isEditing ? (
                <Button variant="success" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button
                  variant="btn btn-warning"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </Col>
          </Row>

          <div className="p-4 intern-form-wrapper">
            {!isEditing ? (
              <div style={{ fontSize: "1.05rem" }}>
                <Row className="mb-3">
                  <Col>
                    <strong>Email:</strong> {formData.email || "-"}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <strong>College:</strong> {formData.college || "-"}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <strong>Phone:</strong> {formData.phone || "-"}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <strong>Department:</strong> {formData.department || "-"}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <strong>Join Date:</strong> {formData.joinDate || "-"}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <strong>End Date:</strong> {formData.endDate || "-"}
                  </Col>
                </Row>
              </div>
            ) : (
              <Form style={{ fontSize: "1.05rem" }}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control-blue"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>College</Form.Label>
                  <Form.Control
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="form-control-blue"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control-blue"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-control-blue"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Join Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    className="form-control-blue"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="form-control-blue"
                  />
                </Form.Group>
              </Form>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default InternDetails;









