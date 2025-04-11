import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Products.css";
import Header from "../Header";
import Footer from "../Footer";

const ProductCard = ({ product }) => (
  <div className="card" style={{ width: "18rem" }}>
   <img src={product.image ? `http://localhost:5001${product.image}` : "/placeholder.png"}  />
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
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("összes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        // Átalakítjuk az _id-t id-re, hogy kompatibilis legyen a régi kóddal
        const fetchedProducts = response.data.map((prod) => ({
          ...prod,
          id: prod._id
        }));
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Hiba történt a termékek betöltésekor.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryTitles = {
    "sütemény": "Sütemények",
    "csomagolt sütemény": "Csomagolt Sütemények",
    "fagyi": "Fagylalt",
    "összes": "Összes termék"
  };

  let filteredProducts = products;
  if (selectedCategory !== "összes") {
    filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
  }

  if (loading) return <p>Töltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <div className="container">
        {/* Navigációs menü fülökkel */}
        <ul className="nav nav-tabs mt-4">
          {Object.keys(categoryTitles).map((catKey) => (
            <li key={catKey} className="nav-item">
              <button
                className={`nav-link ${selectedCategory === catKey ? "active" : ""}`}
                onClick={() => setSelectedCategory(catKey)}
              >
                {categoryTitles[catKey]}
              </button>
            </li>
          ))}
        </ul>

        {/* Szűrt termékek megjelenítése */}
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
