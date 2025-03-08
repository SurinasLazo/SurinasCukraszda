import React, { useState } from "react";
import products from "../data/products";
import { Link } from "react-router-dom";
import "./Products.css";
import Header from "../Header";
import Footer from "../Footer";

const ProductCard = ({ product }) => (
  <div className="card" style={{ width: "18rem" }}>
    <img src={product.image} className="card-img-top" alt={product.name} />
    <div className="card-body">
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">Ár: {product.price} Ft</p>
      <Link to={`/product/${product.id}`} className="btn btn-primary">
        Részletek
      </Link>
    </div>
  </div>
);

const ProductSection = ({ title, products }) => (
  <div className="product-section">
    <h2>{title}</h2>
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-3 mb-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  </div>
);

const Products = () => {
  // Állapot a kiválasztott kategória követésére
  const [selectedCategory, setSelectedCategory] = useState("sütemény");

  // A megfelelő kategóriába tartozó termékek szűrése
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  // Segédváltozó a menü gomb felirataihoz
  const categoryTitles = {
    sütemény: "Sütemények",
    "csomagolt sütemény": "Csomagolt Sütemények",
    fagyi: "Fagylalt",
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* Felső navigációs menü */}
        <ul className="nav nav-tabs mt-4">
          <li className="nav-item">
            <button
              className={`nav-link ${
                selectedCategory === "sütemény" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("sütemény")}
            >
              {categoryTitles["sütemény"]}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                selectedCategory === "csomagolt sütemény" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("csomagolt sütemény")}
            >
              {categoryTitles["csomagolt sütemény"]}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                selectedCategory === "fagyi" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("fagyi")}
            >
              {categoryTitles["fagyi"]}
            </button>
          </li>
        </ul>

        {/* Csak a kiválasztott kategória termékeinek megjelenítése */}
        <div className="mt-4">
          <ProductSection
            title={categoryTitles[selectedCategory]}
            products={filteredProducts}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
