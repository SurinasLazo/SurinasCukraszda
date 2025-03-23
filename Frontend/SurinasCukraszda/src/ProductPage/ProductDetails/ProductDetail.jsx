import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../../data/products";
import "./ProductDetail.css";
import Header from "../../Header";
import Footer from "../../Footer";
import AccordionLeiras from "./Accordion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCartStore from "../../store/cartStore";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    return <div>Termék nem található</div>;
  }

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleInputChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} hozzáadva a kosárhoz!`);
  };

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row">
          {/* Bal oldali kép */}
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded border"
            />
          </div>
          {/* Jobb oldali információ */}
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <hr />
            <AccordionLeiras />
            <hr />
            <p className="fs-5">
              <strong>Ár:</strong> {product.price} Ft
            </p>
            <hr />
            <div className="mb-3">
              <div className="input-group" style={{ maxWidth: "120px" }}>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center no-arrows"
                  value={quantity}
                  onChange={handleInputChange}
                  min="1"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Kosárba teszem
            </button>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/products" className="btn btn-secondary">
            További termékek böngészése
          </Link>
        </div>
      </main>
      <Footer />
      {/* ToastContainer biztosítja, hogy a toast üzenetek megjelenjenek */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ProductDetail;
