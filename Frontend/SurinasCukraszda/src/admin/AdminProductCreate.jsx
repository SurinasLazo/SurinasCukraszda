import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminProductCreate = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    weight: "",
    category: "sütemény",
    kiemelt: false,
    image: null,
  });

  const [allergens, setAllergens] = useState([]);

  const ALLERGEN_OPTIONS = [
    "Glutén",
    "Tej",
    "Tojás",
    "Diófélék",
    "Földimogyoró",
    "Szója",
    "Szezámmag",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAllergenChange = (e) => {
    const { value, checked } = e.target;
    setAllergens((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("weight", formData.weight);
    payload.append("category", formData.category);
    payload.append("kiemelt", formData.kiemelt);
    payload.append("allergens", JSON.stringify(allergens));
    if (formData.image) {
      payload.append("image", formData.image);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (!response.ok) throw new Error("Sikertelen mentés");
      navigate("/admin/products");
    } catch (error) {
      console.error("Hiba:", error);
      alert("Hiba történt a termék létrehozása során.");
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        <h2>Új termék létrehozása</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Név</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Leírás</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ár (Ft)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Allergének:</label>
            <div className="d-flex flex-wrap">
              {ALLERGEN_OPTIONS.map((allergen) => (
                <div className="form-check me-4" key={allergen}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={allergen}
                    checked={allergens.includes(allergen)}
                    onChange={handleAllergenChange}
                    id={`allergen-${allergen}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`allergen-${allergen}`}
                  >
                    {allergen}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Súly / Mennyiség</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategória</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="sütemény">Sütemény</option>
              <option value="fagyi">Fagyi</option>
              <option value="csomagolt sütemény">Csomagolt sütemény</option>
            </select>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="kiemelt"
              checked={formData.kiemelt}
              onChange={handleChange}
            />
            <label className="form-check-label">Kiemelt termék</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Kép feltöltése</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Mentés
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductCreate;
