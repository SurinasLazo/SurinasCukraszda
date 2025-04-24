import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ProductCard from "../components/ProductCard"; // ← ide import
import "./Products.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductSection = ({ title, products }) => {
  if (!products.length) return <p>Nincs termék ebben a kategóriában.</p>;
  return (
    <section className="product-section mb-5">
      <h2 className="section-title">{title}</h2>
      <div className="row gx-4 gy-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("összes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTitles = {
    sütemény: "Sütemények",
    "csomagolt sütemény": "Csomagolt Sütemények",
    fagyi: "Fagylalt",
    összes: "Összes termék",
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products`)
      .then((res) => {
        // alakítsd át az _id-t id-re
        const fetched = res.data.map((p) => ({ ...p, id: p._id }));
        setProducts(fetched);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Hiba történt a termékek betöltésekor.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Töltés…</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  // szűrés
  const filtered =
    selectedCategory === "összes"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Header />
      <div className="container py-4">
        {/* tabok */}
        <ul className="nav nav-tabs">
          {Object.entries(categoryTitles).map(([key, label]) => (
            <li key={key} className="nav-item">
              <button
                className={`nav-link ${
                  selectedCategory === key ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* kártyák */}
        <ProductSection
          title={categoryTitles[selectedCategory]}
          products={filtered}
        />
      </div>
      <Footer />
    </>
  );
}
