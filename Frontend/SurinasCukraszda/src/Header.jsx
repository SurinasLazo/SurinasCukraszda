// src/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./MISC/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "./store/authStore";
import LoginModal from "./Auth/LoginModal";
import RegisterModal from "./Auth/RegisterModal";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

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

  const collapseNav = () => {
    const nav = document.getElementById("navbarNav");
    if (nav?.classList.contains("show")) nav.classList.remove("show");
    setAdminMenuOpen(false); // zárjuk be az admin menüt is
  };

  return (
    <>
      <header className="custom-navbar mb-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            {/* Brand */}
            <Link
              className="navbar-brand d-flex align-items-center"
              to="/"
              onClick={collapseNav}
            >
              <img
                src={logo}
                alt="Logo"
                width="30"
                height="24"
                className="me-2"
              />
              Surinás Cukrászda
            </Link>

            {/* Üdvözlés */}
            {user && (
              <span className="navbar-text fst-italic text-secondary me-auto ms-3">
                Üdv, {user.name || user.email}
              </span>
            )}

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {/* Alapsáv */}
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={collapseNav}>
                    <FontAwesomeIcon icon={faHouse} /> Főoldal
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/rolunk" onClick={collapseNav}>
                    Rólunk
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/products"
                    onClick={collapseNav}
                  >
                    Termékek
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart" onClick={collapseNav}>
                    <FontAwesomeIcon icon={faCartShopping} /> Kosár
                  </Link>
                </li>
                {user && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/my-orders"
                      onClick={collapseNav}
                    >
                      Rendeléseim
                    </Link>
                  </li>
                )}

                {!user ? (
                  <>
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={() => {
                          openLogin();
                          collapseNav();
                        }}
                      >
                        <FontAwesomeIcon icon={faUser} /> Belépés
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={() => {
                          openRegister();
                          collapseNav();
                        }}
                      >
                        Regisztráció
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    {user.role === "admin" && (
                      <li className="nav-item dropdown">
                        <button
                          className="btn btn-link nav-link dropdown-toggle text-danger fw-bold"
                          onClick={() => setAdminMenuOpen((o) => !o)}
                          aria-expanded={adminMenuOpen}
                          type="button"
                        >
                          <FontAwesomeIcon icon={faUser} /> Menedzsment
                        </button>
                        <ul
                          className={`dropdown-menu dropdown-menu-end${
                            adminMenuOpen ? " show" : ""
                          }`}
                        >
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/admin/products"
                              onClick={collapseNav}
                            >
                              Termékek kezelése
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/admin/orders"
                              onClick={collapseNav}
                            >
                              Rendelések kezelése
                            </Link>
                          </li>
                        </ul>
                      </li>
                    )}
                    {user && (
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/profile"
                          onClick={collapseNav}
                        >
                          Profil
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={() => {
                          logout();
                          collapseNav();
                        }}
                      >
                        Kijelentkezés
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <LoginModal
        show={showLogin}
        handleClose={closeModals}
        switchToRegister={openRegister}
      />
      <RegisterModal
        show={showRegister}
        handleClose={closeModals}
        switchToLogin={openLogin}
      />
    </>
  );
}
