import React, { useEffect } from "react";
import Fagyi from "../MISC/Fagyi.png";
import Sos from "../MISC/Sós.png";
import TeliPult from "../MISC/TeliPult.png";
import { Carousel as BootstrapCarousel } from "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Carousel.css";
const Carousel = () => {
  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleSlidesOnly");
    new BootstrapCarousel(carousel, {
      interval: 5000, // Automatikus váltás 5 másodpercenként
      pause: "hover", // Megáll a hover fölött
    });
  }, []);

  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={Sos} className="d-block w-100" alt="Sajtos sós rúd" />
        </div>
        <div className="carousel-item">
          <img src={Fagyi} className="d-block w-100" alt="Eper fagyi" />
        </div>
        <div className="carousel-item">
          <img src={TeliPult} className="d-block w-100" alt="Teli pult" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
