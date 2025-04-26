import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import "./FeaturedProducts.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function FeaturedProducts() {
  const [bakery, setBakery] = useState([]);
  const [iceCream, setIceCream] = useState([]);
  const [packaged, setPackaged] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products?kiemelt=true`)
      .then(({ data }) => {
        setBakery(data.filter((p) => p.category === "sütemény"));
        setIceCream(data.filter((p) => p.category === "fagyi"));
        setPackaged(data.filter((p) => p.category === "csomagolt sütemény"));
      })
      .catch(console.error);
  }, []);

  const Section = ({ title, items }) => {
    if (!items.length) return null;
    return (
      <section className="featured-section mb-5">
        <h2 className="featured-section__title">{title}</h2>
        <div className="row gx-4 gy-4">
          {items.map((p) => (
            <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="container py-4">
      <Section title="Kiemelt Sütemények" items={bakery} />
      <Section title="Kiemelt Fagyik" items={iceCream} />
      <Section title="Kiemelt Csomagolt Sütemények" items={packaged} />
    </div>
  );
}
