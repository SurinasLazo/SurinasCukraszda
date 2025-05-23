import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./FeaturedSlider.css";
import ProductCard from "../Components/ProductCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function FeaturedSlider() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products`)
      .then((res) => setItems(res.data.filter((p) => p.kiemelt)))
      .catch(console.error);
  }, []);

  return (
    <section className="featured-slider">
      <h2 className="featured-slider__title">Kiemelt termékek</h2>
      <h2 className="featured-slider__subtitle">
        Böngésszen népszerű, válogatott süteményeink között!
      </h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={4}
        spaceBetween={20}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {items.map((p) => (
          <SwiperSlide key={p._id}>
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
