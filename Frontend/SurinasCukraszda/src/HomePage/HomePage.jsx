import React from "react";
import Header from "../Header";
import HeroSection from "./HeroSection";
import FeaturedSlider from "./FeaturedSlider";
import Footer from "../Footer";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <HeroSection />
      <FeaturedSlider />
      <Footer />
    </div>
  );
}
