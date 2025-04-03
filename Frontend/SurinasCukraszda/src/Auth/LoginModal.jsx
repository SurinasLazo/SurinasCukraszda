import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Modal.css";
import useAuthStore from "../store/authStore";

const LoginModal = ({ show, handleClose, switchToRegister }) => {
  useEffect(() => {
    console.log("LoginModal show prop:", show);
  }, [show]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      // Dekódoljuk a JWT payloadot.
      const payload = JSON.parse(atob(token.split(".")[1]));
      login({ id: payload.id, email: payload.email, role: payload.role }, token);
      localStorage.setItem("token", token);
      handleClose();
      console.log("Sikeres bejelentkezés!");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data.message : error.message
      );
      setErrorMessage(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Bejelentkezési hiba történt"
      );
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
              placeholder="Írd be az email címed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              placeholder="Írd be a jelszavad"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
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
