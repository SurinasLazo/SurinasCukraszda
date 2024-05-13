// Footer.jsx
import React from "react";
import "./Footer.css"; // Importáljuk be a CSS fájlt

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <h5>Elérhetőség</h5>
            <p>
              <strong>Cím:</strong> Gyula, Temesvári út 24, 5700 <br />
              <strong>Telefonszám:</strong> 06 70 303 8788 <br />
            </p>
          </div>
          <div className="col-md-4">
            <h5>Nyitvatartás:</h5>
            Hétfő: Zárva <br />
            Kedd-Vasárnap: 10:00–18:00 <br />
            <small>*A nyitvatartás változhat</small>
          </div>
          <div className="col-md-4">
            <h5>Kövess minket</h5>
            <a
              href="https://www.facebook.com/profile.php?id=100045653815408"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-square"></i> Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="container-fluid footer-bottom">
        <div className="row">
          <div className="col-md-12">
            <p className="mb-0">
              &copy; 2024 Surinás Cukrászda - Minden jog fenntartva
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
