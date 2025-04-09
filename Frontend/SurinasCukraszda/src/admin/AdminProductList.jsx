import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/products", {
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
    <div className="container mt-5">
      <h2 className="mb-4">Termékek kezelése</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/admin/products/create")}
      >
        Új termék hozzáadása
      </button>

      <table className="table table-striped">
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
                  onClick={() => alert("Törlés később!")}
                >
                  Törlés
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
