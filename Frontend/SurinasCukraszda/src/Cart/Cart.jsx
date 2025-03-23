import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import "./Cart.css";
import Header from "../Header";
import Footer from "../Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  // A kosár elemeit, valamint a módosító függvényeket a Zustand store-ból olvassuk ki
  const { cart, removeFromCart, updateQuantity } = useCartStore((state) => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    updateQuantity: state.updateQuantity,
  }));
  const toastId = useRef(null);

  const handleQuantityChange = (productId, delta, currentQty) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    updateQuantity(productId, newQty);
    if (toast.isActive(toastId.current)) {
      toast.update(toastId.current, {
        autoClose: 3000,
        render: "Mennyiség frissítve!"
      });
    } else {
      toastId.current = toast.info("Mennyiség frissítve!", { autoClose: 3000 });
    }
  };
  

  // Összes ár kiszámítása
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <div className="container cart-container">
        <h1 className="cart-title">Kosár</h1>
        {cart.length === 0 ? (
          <p className="empty-cart">A kosár jelenleg üres.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item row align-items-center">
                  <div className="col-md-2">
                    <img
                      src={item.image}
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
              <h3>Összesen: {totalPrice} Ft</h3>
              <button className="btn btn-primary">Fizetés</button>
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
    </>
  );
};

export default Cart;
