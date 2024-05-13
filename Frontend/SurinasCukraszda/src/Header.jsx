//import React from "react";
import "./Header.css";
import logo from "./MISC/Logo.png";

const Header = () => {
  return (
    <header className="custom-navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
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
                <a className="nav-link active" aria-current="page" href="#">
                  Főoldal
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Termékek
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Kosár
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
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
