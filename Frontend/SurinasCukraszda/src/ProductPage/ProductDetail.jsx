import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import "./ProductDetail.css";
import Footer from "../Footer";
import Header from "../Header";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);

  // State a termék mennyiségének nyomon követésére
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <div>Termék nem található</div>;
  }

  return (
    <>
      <Header />
      <div className="product-detail">
        <div className="product-info">
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <p>Ár: {product.price} Ft</p>
          <div className="quantity-selector">
            <button className="quantity-btn" onClick={handleDecreaseQuantity}>
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button className="quantity-btn" onClick={handleIncreaseQuantity}>
              +
            </button>
          </div>
          <button className="btn btn-primary">Kosárhoz adás</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
