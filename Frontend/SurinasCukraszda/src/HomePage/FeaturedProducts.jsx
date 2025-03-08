import React from "react";
import "./FeaturedProducts.css";
import { Link } from "react-router-dom";
import products from "../data/products";
import useCartStore from "../store/cartStore";

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

const FeaturedProducts = () => {
  const cart = useCartStore((state) => state.cart);

  // Kiemelt sütemények
  const featuredBakeryProducts = products.filter(
    (product) => product.category === "sütemény" && product.kiemelt
  );

  // Kiemelt fagyik
  const featuredIceCreamProducts = products.filter(
    (product) => product.category === "fagyi" && product.kiemelt
  );

  // Kiemelt csomagolt sütemények
  const featuredPackagedProducts = products.filter(
    (product) => product.category === "csomagolt sütemény" && product.kiemelt
  );

  return (
    <div className="container">
      {cart.map((item) => (
        <div key={item.id}>{item.quantity}</div>
      ))}
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
