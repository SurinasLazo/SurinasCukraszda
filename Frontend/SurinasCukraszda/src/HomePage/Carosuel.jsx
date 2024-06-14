import React, { useEffect } from "react";
import Fagyi from "../MISC/Fagyi.png";
import Sos from "../MISC/Sós.png";
import TeliPult from "../MISC/TeliPult.png";
import { Carousel as BootstrapCarousel } from "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Carousel.css";

const Carousel = () => {
  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleIndicators");
    new BootstrapCarousel(carousel, {
      interval: 5000, // Automatikus váltás 5 másodpercenként
      pause: "hover", // Megáll a hover fölött
    });
  }, []);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
        ></li>
        <li
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
        ></li>
        <li
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
        ></li>
      </ol>
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
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
