import React from "react";
import "./Header.css";
import logo from "./MISC/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
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
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
