import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import "./Cart.css";
import Header from "../Header";
import Footer from "../Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore(
    (state) => ({
      cart: state.cart,
      removeFromCart: state.removeFromCart,
      updateQuantity: state.updateQuantity,
      clearCart: state.clearCart,
    })
  );

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setShowLogin = useAuthStore((state) => state.setShowLogin);

  const toastId = useRef(null);

  const handleQuantityChange = (productId, delta, currentQty) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    updateQuantity(productId, newQty);
    if (toast.isActive(toastId.current)) {
      toast.update(toastId.current, {
        autoClose: 3000,
        render: "Mennyiség frissítve!",
      });
    } else {
      toastId.current = toast.info("Mennyiség frissítve!", { autoClose: 3000 });
    }
  };

  // Összesített ár kiszámolása
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSubmit = async () => {
    if (!user || !token) {
      toast.info("A rendeléshez előbb be kell jelentkezni.");
      setShowLogin(true);
      return;
    }

    if (cart.length === 0) {
      toast.error("A kosár üres!");
      return;
    }

    // Backendnek megfelelő formátum
    const items = cart.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          total, // mostantól ezt várja a backend
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Rendelés API hiba:", response.status, errorText);
        throw new Error("Rendelés sikertelen");
      }

      clearCart();
      toast.success("Rendelés sikeresen elküldve!");
    } catch (err) {
      console.error("Rendelés hiba:", err);
      toast.error("Hiba történt a rendelés során");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="page-container">
        <Header />
        <div className="content-wrap container cart-container">
          <h1 className="cart-title">Kosár</h1>

          {cart.length === 0 ? (
            <p className="empty-cart">A kosár jelenleg üres.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item row align-items-center"
                  >
                    <div className="col-md-2">
                      <img
                        src={`${API_BASE_URL}/api/products/${item.id}/image`}
                        alt={item.name}
                        className="img-fluid cart-item-img"
                      />
                    </div>
                    <div className="col-md-4">
                      <h4>{item.name}</h4>
                    </div>
                    <div className="col-md-2">
                      <p>{item.price} Ft</p>
                    </div>
                    <div className="col-md-2">
                      <div className="quantity-selector">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            handleQuantityChange(item.id, -1, item.quantity)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="form-control text-center no-arrows"
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            handleQuantityChange(item.id, 1, item.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Törlés
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary mt-4">
                <h3>Összesen: {total} Ft</h3>
                <button className="btn btn-primary" onClick={handleOrderSubmit}>
                  Rendelés leadása
                </button>
              </div>
            </>
          )}

          <div className="back-to-products mt-4">
            <Link to="/products" className="btn btn-secondary">
              További termékek böngészése
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
