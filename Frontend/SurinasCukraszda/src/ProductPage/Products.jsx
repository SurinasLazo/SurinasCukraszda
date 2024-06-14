import React from "react";
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
  const sutemenyek = products.filter(
    (product) => product.category === "sütemény"
  );
  const fagyik = products.filter((product) => product.category === "fagyi");
  const csomagoltSutemenyek = products.filter(
    (product) => product.category === "csomagolt sütemény"
  );

  return (
    <>
      <Header />
      <div className="container">
        <ProductSection title="Sütemények" products={sutemenyek} />
        <ProductSection title="Fagyik" products={fagyik} />
        <ProductSection
          title="Csomagolt Sütemények"
          products={csomagoltSutemenyek}
        />
      </div>
      <Footer />
    </>
  );
};

export default Products;
