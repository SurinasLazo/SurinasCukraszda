import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import "./ProductDetail.css";
import Footer from "../Footer";
import Header from "../Header";
import AccordionLeiras from "./Accordion";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  if (!product) {
    return <div>Termék nem található</div>;
  }

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleInputChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    console.log("Termék:", product);
    console.log("Darabszám:", quantity);
  };

  return (
    <>
      <Header />
      <div>
        <div className="product-detail container">
          <div className="product-detail-main row">
            <div className="product-detail-image col-md-6">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid img-bordered"
              />
            </div>
            <div className="product-detail-info col-md-6">
              <h2>{product.name}</h2>
              <hr />
              <AccordionLeiras />
              <hr />
              <p>
                <strong>Ár:</strong> {product.price} Ft
              </p>
              <hr />
              <div className="product-detail-actions">
                <div className="quantity-selector">
                  <button
                    type="button"
                    className="btn btn-icon btn-secondary"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control no-arrows"
                    value={quantity}
                    onChange={handleInputChange}
                    min="1"
                  />
                  <button
                    type="button"
                    className="btn btn-icon btn-secondary"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
                <button className="btn btn-primary" onClick={handleAddToCart}>
                  Kosárba teszem
                </button>
              </div>
            </div>
          </div>
          <div className="product-detail-footer mt-4">
            <Link to="/products" className="vissza btn btn-secondary">
              További termékek böngészése
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
