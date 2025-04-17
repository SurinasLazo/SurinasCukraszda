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
  const { productId } = useParams(); // A MongoDB _id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/products/${productId}`
        );
        const fetchedProduct = response.data;

        // Itt állítod át az _id-t id-re:
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
        <div className="container py-5">
          <p>Töltés...</p>
        </div>
        <Footer />
      </>
    );
  }
  if (error || !product) {
    return (
      <>
        <Header />
        <div className="container py-5">
          <p>{error || "Termék nem található"}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Csak ezen az oldalon a sárgás gradiens */}
      <div className="product-detail-wrapper">
        <main className="container py-5 product-detail-table">
          <div className="product-card">
            <div className="row no-gutters">
              {/* Bal oldali kép */}
              <div className="col-md-6 product-image d-flex justify-content-center mb-3 mb-md-0">
                <div className="image-container">
                  <img
                    src={`${API_BASE_URL}/api/products/${product.id}/image`}
                  />
                </div>
              </div>
              {/* Jobb oldali információ */}
              <div className="col-md-6 product-info d-flex flex-column justify-content-center">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">{product.price} Ft</p>
                <table className="table table-bordered mb-4">
                  <tbody>
                    <tr>
                      <th>Kategória</th>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <th>Leírás</th>
                      <td>{product.description || "Nincs elérhető leírás"}</td>
                    </tr>
                    <tr>
                      <th>Allergének</th>
                      <td>
                        {product.allergens && product.allergens.length > 0
                          ? product.allergens.join(", ")
                          : "Nincs allergén"}
                      </td>
                    </tr>
                    {product.weight && (
                      <tr>
                        <th>Súly</th>
                        <td>{product.weight}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="quantity-section text-center">
                  <div className="quantity-selector d-inline-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      className="quantity-input mx-2 text-center no-arrows"
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
                  <div className="mt-3">
                    <Button
                      variant="primary"
                      className="btn-cart"
                      onClick={handleAddToCart}
                    >
                      Kosárba teszem
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/products" className="btn btn-secondary">
                További termékek böngészése
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ProductDetail;
