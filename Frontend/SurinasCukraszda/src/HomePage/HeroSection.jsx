import React from "react";
import ProductSearch from "../Components/ProductSearch";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__overlay">
        <h1 className="hero__title">
          Üdvözöljük a Surinás Cukrászda webáruházában!
        </h1>
        <p className="hero__subtitle">Fedezze fel ízletes süteményeinket!</p>
        <div className="hero__search">
          <ProductSearch dropdown={true} />
        </div>
      </div>
    </section>
  );
}
