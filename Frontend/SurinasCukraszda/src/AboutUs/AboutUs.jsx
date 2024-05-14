import React from "react";
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
        <p className="text-bubble">
          Hagyományos módon készítjük a fagyikat édesapánk receptúrája alapján.
          Már 40 éve ugyanazt a receptet használja a család.
        </p>
        <p className="text-bubble">
          1984-ben alapult. Surinás László Mestercukrász alapította a családi
          vállalkozást.
        </p>
        <div className="recognition">
          <img src={recognition} alt="Országos elismerés" />
          <p className="text-bubble">
            Országos rangos elismerés: Legtöbb a tájjellegű gasztronómiai
            rendezvény. Kitüntetett a regionális gasztronómiai szervezet
            képviseletében Surinás László.
          </p>
        </div>
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
        <p className="text-bubble">Könyvből ide idézés............_______</p>
        <h3>Itt található a Sütiház</h3>
        <GoogleMap />
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
