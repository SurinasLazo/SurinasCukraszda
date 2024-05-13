import React from "react";
import "./FeaturedProducts.css";
const ProductCard = ({ image, name, price }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Ár: {price} Ft</p>
        <a href="#" className="btn btn-primary">
          Részletek
        </a>
      </div>
    </div>
  );
};

const ProductsSection = ({ products, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-3 mb-4">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  // Sütemények tömbje
  const bakeryProducts = [
    {
      image: "../src/MISC/placeholder.png",
      name: "Krémes",
      price: 500,
    },
    {
      image: "../src/MISC/placeholder.png",
      name: "Sütemény 1",
      price: 500,
    },
    {
      image: "../src/MISC/placeholder.png",
      name: "Sütemény 1",
      price: 500,
    },
    {
      image: "../src/MISC/placeholder.png",
      name: "Sütemény 1",
      price: 500,
    },
  ];

  // Fagyik tömbje
  const iceCreamProducts = [
    {
      image: "../src/MISC/placeholder.png",
      name: "Fagyi 1",
      price: 600,
    },
    {
      image: "../src/MISC/placeholder.png",
      name: "Fagyi 1",
      price: 600,
    },
    {
      image: "../src/MISC/placeholder.png",
      name: "Fagyi 1",
      price: 600,
    },
    {
      image: "../src/MISC/placeholder.png",
      name: "Fagyi 1",
      price: 600,
    },
  ];

  return (
    <div>
      <ProductsSection products={bakeryProducts} title="Kiemelt sütemények" />
      <ProductsSection products={iceCreamProducts} title="Kiemelt fagyik" />
    </div>
  );
};

export default FeaturedProducts;
