import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./MyOrders.css";

const API = import.meta.env.VITE_API_BASE_URL;

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const statusLabels = {
    pending: "Függőben",
    confirmed: "Megerősítve",
    ready_for_pickup: "Átvételre kész",
    completed: "Teljesítve",
    canceled: "Törölve",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetch(`${API}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Hiba");
        return res.json();
      })
      .then(({ orders }) => setOrders(orders))
      .catch(() => setError("Nem sikerült betölteni a rendeléseket."))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="my-orders-page">
      <Header />

      <div className="my-orders-content">
        <div className="container py-4">
          <h2 className="section-title">Rendeléseim</h2>

          {loading && <p className="text-center">Töltés…</p>}
          {error && <p className="text-center text-danger">{error}</p>}
          {!loading && !error && orders.length === 0 && (
            <p className="text-center">Nincsenek korábbi rendeléseid.</p>
          )}

          <div className="my-orders-list">
            {orders.map((o) => (
              <div key={o._id} className="order-card">
                <div className="order-card__header">
                  <h5>Rendelés ID: {o._id}</h5>
                  <div className="order-card__meta">
                    <span>
                      <strong>Leadva:</strong>{" "}
                      {new Date(o.createdAt).toLocaleString("hu-HU", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </span>
                    <span>
                      <strong>Státusz:</strong>{" "}
                      {statusLabels[o.status] || o.status}
                    </span>
                    {o.pickupDate && (
                      <span>
                        <strong>Átvétel:</strong>{" "}
                        {new Date(o.pickupDate).toLocaleDateString("hu-HU")}
                      </span>
                    )}
                  </div>
                </div>

                <table className="order-card__table">
                  <thead>
                    <tr>
                      <th>Termék</th>
                      <th>Mennyiség</th>
                      <th>Egységár</th>
                      <th>Részösszeg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {o.items.map((it) => {
                      // fallback, ha a product null (törölve lett)
                      const prod = it.product;
                      return (
                        <tr key={it._id}>
                          <td>
                            {prod?.name ?? (
                              <em className="text-gray-500">Törölt termék</em>
                            )}
                          </td>
                          <td>{it.quantity}</td>
                          <td>
                            {prod ? prod.price.toFixed(2) + " Ft" : "-"}+{" "}
                          </td>
                          <td>
                            {prod
                              ? (prod.price * it.quantity).toFixed(2) + " Ft"
                              : "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="order-card__footer">
                  <span className="order-card__total">
                    Összesen: {o.total.toFixed(2)} Ft
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
