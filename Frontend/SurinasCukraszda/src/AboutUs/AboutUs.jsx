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

const AboutUs = () => (
  <>
    <Header />
    <main className="about-main">
      <section className="about-hero">
        <img src={logo} alt="Cukrászda Logo" className="about-logo" />
        <h1 className="hero-title">Rólunk</h1>
        <p className="hero-subtitle">Minden ízében hagyomány.</p>
      </section>
      <section className="about-details">
        <Accordion defaultActiveKey="0" className="about-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Bevezető</Accordion.Header>
            <Accordion.Body>
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
            <Accordion.Header>Történet</Accordion.Header>
            <Accordion.Body>
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
            <Accordion.Header>Elismerések</Accordion.Header>
            <Accordion.Body>
              <img
                src={recognition}
                alt="Országos elismerés"
                className="recognition-img"
              />
              <p>
                Surinás László számos szakmai díjat és kitüntetést nyert el
                karrierje során. Munkásságát az Országos Cukrász Szövetség és
                más neves szakmai szervezetek is elismerték, és többször is
                elnyerte az év cukrásza címet.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Jövőkép</Accordion.Header>
            <Accordion.Body>
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
      </section>
      <section className="about-gallery">
        <h2 className="section-title">Galéria</h2>
        <div className="gallery-grid">
          <img src={galleryImage1} alt="Galéria 1" />
          <img src={galleryImage2} alt="Galéria 2" />
          <img src={galleryImage3} alt="Galéria 3" />
          <img src={galleryImage4} alt="Galéria 4" />
        </div>
      </section>
      <section className="about-location">
        <h2 className="section-title">Hol talál minket?</h2>
        <GoogleMap />
      </section>
    </main>
    <Footer />
  </>
);

export default AboutUs;
