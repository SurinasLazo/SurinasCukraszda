import React from "react";
import { Accordion } from "react-bootstrap";
import "./AboutUs.css";
import logo from "../MISC/logo2.png";
import recognition from "../MISC/NegyOrszagosElismeres.png";
import galleryImage1 from "../MISC/placeholder.png";
import galleryImage2 from "../MISC/placeholder.png";
import galleryImage3 from "../MISC/placeholder.png";
import galleryImage4 from "../MISC/placeholder.png";
import GoogleMap from "./GoogleMap";
import Header from "../Header";
import Footer from "../Footer";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="about-us">
        <div className="header-image">
          <img src={logo} alt="Cukrászda Logo" className="logo" />
        </div>
        <h2>Jelmondat: Minden ízében hagyomány.</h2>
        <Accordion className="accordion-custom">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="accordion-header">
              <strong> Bevezető</strong>
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              <p>
                Surinás László, cukrász mester, cukrászat iránti szenvedélyével
                és elhivatottságával egy kis cukrászdából kiindulva építette fel
                a Békés vármegye egyik legismertebb cukrászdáját. Számos díjjal
                és elismeréssel büszkélkedhet, amelyek méltó helyet biztosítanak
                számára a magyar cukrászat történetében.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="accordion-header">
              <strong>Történet</strong>
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              <p>
                Surinás László 1960-ban kezdte pályafutását, és hamarosan a
                magyar cukrászipar egyik legelismertebb alakjává vált.
                Munkásságát a hagyományos receptek és a modern technikák
                ötvözése jellemzi, amelynek köszönhetően édességei nemcsak
                finomak, hanem művészi megjelenésűek is.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header className="accordion-header">
              <strong>Elismerések</strong>
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              <p>
                Surinás László számos szakmai díjat és kitüntetést nyert el
                karrierje során. Munkásságát az Országos Cukrász Szövetség és
                más neves szakmai szervezetek is elismerték, és többször is
                elnyerte az év cukrásza címet.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header className="accordion-header">
              <strong>Jövőkép</strong>
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              <p>
                A család és az utódok büszkén viszik tovább hagyományait,
                biztosítva, hogy az ő szenvedélye és szakértelme generációkon át
                formálja és gazdagítsa a cukrászat világát. A Surinás Sütiház új
                fejezetet nyit, megőrizve a múlt értékeit és újításokkal
                készülve a jövőbe.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="gallery">
          <img
            src={galleryImage1}
            alt="Gallery Image 1"
            className="gallery-img"
          />
          <img
            src={galleryImage2}
            alt="Gallery Image 2"
            className="gallery-img"
          />
          <img
            src={galleryImage3}
            alt="Gallery Image 3"
            className="gallery-img"
          />
          <img
            src={galleryImage4}
            alt="Gallery Image 4"
            className="gallery-img"
          />
        </div>
        <h3>Itt található a Sütiház</h3>
        <GoogleMap />
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
