import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import "./AdminProductList.css";
import Footer from "../Footer";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const handleDelete = async (productId) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a terméket?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Frissítjük a listát
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Törlési hiba:", err);
      alert("Hiba történt a termék törlése során.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Hiba a termékek lekérdezésekor:", err);
      }
    };
    fetchProducts();
  }, [token]);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="admin-wrapper">
          <div className="admin-container">
            <h2 className="mb-4">Termékek kezelése</h2>
            <button
              className="btn btn-success mb-3"
              onClick={() => navigate("/admin/products/create")}
            >
              Új termék hozzáadása
            </button>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Név</th>
                  <th>Ár</th>
                  <th>Kategória</th>
                  <th>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.price} Ft</td>
                    <td>{product.category}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          navigate(`/admin/products/edit/${product._id}`)
                        }
                      >
                        Szerkesztés
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product._id)}
                      >
                        Törlés
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProductList;
