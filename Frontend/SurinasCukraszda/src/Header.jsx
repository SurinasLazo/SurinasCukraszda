import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./MISC/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "./store/authStore";
import LoginModal from "./Auth/LoginModal";
import RegisterModal from "./Auth/RegisterModal";

const Header = () => {
  // Lokális állapot a login és register modalhoz
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Auth adatok (Zustand store)
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Debug logok a modal állapotokhoz
  useEffect(() => {
    console.log("Header modal states:", { showLogin, showRegister });
  }, [showLogin, showRegister]);

  // Megnyitás, bezárás függvények
  const openLogin = () => {
    console.log("openLogin called in Header");
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
            <Link className="navbar-brand" to="/">
              <img
                src={logo}
                alt="Logo"
                width="30"
                height="24"
                className="d-inline-block align-text-top"
              />
              Surinás Cukrászda
            </Link>
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
                  <Link className="nav-link" to="/">
                    <FontAwesomeIcon icon={faHouse} /> Főoldal
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/rolunk">
                    Rólunk
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Termékek
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <FontAwesomeIcon icon={faCartShopping} /> Kosár
                  </Link>
                </li>
                {/* Ha nincs user, a Belépés gomb jelenik meg */}
                {!user ? (
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={() => {
                        console.log("Belépés gomb kattintva");
                        openLogin();
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} /> Belépés
                    </button>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <span className="nav-link">Üdv, {user.email}</span>
                    </li>
                    {user.role === "admin" && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/admin">
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <button className="btn btn-link nav-link" onClick={logout}>
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

      {/* Modálisok lokálisan renderelve */}
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
};

export default Header;
