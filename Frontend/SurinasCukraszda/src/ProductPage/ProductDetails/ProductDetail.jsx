// src/components/ProductDetail/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCartStore from "../../store/cartStore";
import Header from "../../Header";
import Footer from "../../Footer";
import "./ProductDetail.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data: fetchedProduct } = await axios.get(
          `${API_BASE_URL}/api/products/${productId}`
        );
        fetchedProduct.id = fetchedProduct._id;
        setProduct(fetchedProduct);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Hiba történt a termék betöltésekor");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };
  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    setQuantity(value < 1 ? 1 : value);
  };
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} hozzáadva a kosárhoz!`);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="pd-page">
          <p className="pd-loading">Töltés...</p>
        </div>
        <Footer />
      </>
    );
  }
  if (error || !product) {
    return (
      <>
        <Header />
        <div className="pd-page">
          <p className="pd-error">{error || "Termék nem található"}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="pd-page">
        <main className="pd-container">
          <figure className="pd-image-wrapper">
            <img
              src={`${API_BASE_URL}/api/products/${product.id}/image`}
              alt={product.name}
              className="pd-image"
            />
          </figure>
          <section className="pd-info-wrapper">
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-price">{product.price} Ft</p>

            <ul className="pd-spec-list">
              <li className="pd-spec-item">
                <span className="pd-spec-key">Kategória</span>
                <span className="pd-spec-value">{product.category}</span>
              </li>
              <li className="pd-spec-item">
                <span className="pd-spec-key">Leírás</span>
                <span className="pd-spec-value">
                  {product.description || "Nincs elérhető leírás"}
                </span>
              </li>
              <li className="pd-spec-item">
                <span className="pd-spec-key">Allergének</span>
                <span className="pd-spec-value">
                  {product.allergens?.length
                    ? product.allergens.join(", ")
                    : "Nincs allergén"}
                </span>
              </li>
              {product.weight && (
                <li className="pd-spec-item">
                  <span className="pd-spec-key">Súly</span>
                  <span className="pd-spec-value">{product.weight}</span>
                </li>
              )}
            </ul>

            <div className="pd-purchase">
              <div className="pd-quantity-selector">
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange(-1)}
                >
                  –
                </Button>
                <Form.Control
                  type="number"
                  className="pd-quantity-input no-arrows"
                  value={quantity}
                  onChange={handleInputChange}
                  min="1"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </div>
              <Button
                variant="primary"
                className="pd-add-button"
                onClick={handleAddToCart}
              >
                Kosárba teszem
              </Button>
            </div>
          </section>
        </main>

        <div className="pd-back-link">
          <Link to="/products" className="pd-back-button">
            ← További termékek böngészése
          </Link>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ProductDetail;
