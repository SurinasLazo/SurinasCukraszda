import React, { useState } from "react";
import "./Header.css";
import logo from "./MISC/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./Auth/LoginModal";
import RegisterModal from "./Auth/RegisterModal";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <>
      <header className="custom-navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                src={logo}
                alt="Logo"
                width="30"
                height="24"
                className="d-inline-block align-text-top"
              />
              Surinás Cukrászda
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <FontAwesomeIcon icon={faHouse} /> Főoldal
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/products">
                    Termékek
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cart">
                    <FontAwesomeIcon icon={faCartShopping} /> Kosár
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/AboutUs">
                    Rólunk
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Kapcsolat
                  </a>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={openLogin}>
                    <FontAwesomeIcon icon={faUser} /> Belépés
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <LoginModal
        show={showLogin}
        handleClose={closeModals}
        switchToRegister={openRegister}
        onLoginSuccess={closeModals}
      />
      <RegisterModal
        show={showRegister}
        handleClose={closeModals}
        switchToLogin={openLogin}
      />
    </>
  );
};

export default Header;
