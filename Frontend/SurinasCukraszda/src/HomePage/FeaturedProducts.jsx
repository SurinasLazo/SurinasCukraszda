import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductCard = ({ product }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={`${API_BASE_URL}/api/products/${product.id}/image`}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Ár: {product.price} Ft</p>
        <Link to={`/product/${product._id}`} className="btn btn-primary">
          Részletek
        </Link>
      </div>
    </div>
  );
};

const ProductSection = ({ title, products }) => (
  <div className="product-section">
    <h2>{title}</h2>
    <div className="row">
      {products.map((product) => (
        <div key={product._id} className="col-md-3 mb-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  </div>
);

const FeaturedProducts = () => {
  const [featuredBakeryProducts, setFeaturedBakeryProducts] = useState([]);
  const [featuredIceCreamProducts, setFeaturedIceCreamProducts] = useState([]);
  const [featuredPackagedProducts, setFeaturedPackagedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/products?kiemelt=true`
        );

        setFeaturedBakeryProducts(
          data.filter((p) => p.category === "sütemény")
        );
        setFeaturedIceCreamProducts(data.filter((p) => p.category === "fagyi"));
        setFeaturedPackagedProducts(
          data.filter((p) => p.category === "csomagolt sütemény")
        );
      } catch (error) {
        console.error("Hiba történt a termékek lekérésekor:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="container">
      <ProductSection
        title="Kiemelt Sütemények"
        products={featuredBakeryProducts}
      />
      <ProductSection
        title="Kiemelt Fagyik"
        products={featuredIceCreamProducts}
      />
      <ProductSection
        title="Kiemelt Csomagolt Sütemények"
        products={featuredPackagedProducts}
      />
    </div>
  );
};

export default FeaturedProducts;
