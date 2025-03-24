import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Modal.css";
const LoginModal = ({
  show,
  handleClose,
  switchToRegister,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      onLoginSuccess();
      handleClose();
    } catch (error) {
      console.error("Login error:", error.response.data.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Belépés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3" block>
            Belépés
          </Button>
        </Form>
        <div className="mt-3">
          <span>Nincs fiókod? </span>
          <Button variant="link" onClick={switchToRegister}>
            Regisztrálj itt!
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
