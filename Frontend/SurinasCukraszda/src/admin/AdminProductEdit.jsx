import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/authStore";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    allergens: [],
    weight: "",
    category: "sütemény",
    kiemelt: false,
    image: null,
  });

  const [existingImageUrl, setExistingImageUrl] = useState("");

  const ALLERGEN_OPTIONS = [
    "Glutén",
    "Tej",
    "Tojás",
    "Diófélék",
    "Földimogyoró",
    "Szója",
    "Szezámmag",
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        const product = res.data;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          allergens: product.allergens || [],
          weight: product.weight || "",
          category: product.category || "sütemény",
          kiemelt: product.kiemelt || false,
          image: null,
        });

        setExistingImageUrl(
          `${API_BASE_URL}/api/products/${product._id}/image`
        );
      } catch (err) {
        console.error("Hiba a termék lekérésekor:", err);
        alert("Nem sikerült betölteni a terméket.");
      }
    };

    fetchProduct();
  }, [id]);

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
    setFormData((prev) => {
      const updatedAllergens = checked
        ? [...prev.allergens, value]
        : prev.allergens.filter((a) => a !== value);
      return { ...prev, allergens: updatedAllergens };
    });
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
    payload.append("allergens", JSON.stringify(formData.allergens));
    if (formData.image) {
      payload.append("image", formData.image);
    }

    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/products/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.href = "/admin/products";
    } catch (err) {
      console.error("Hiba mentéskor:", err);
      alert("Nem sikerült módosítani a terméket.");
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        <h2>Termék szerkesztése</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Név</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Leírás</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ár</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Súly / Mennyiség</label>
            <input
              type="text"
              name="weight"
              className="form-control"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategória</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="sütemény">Sütemény</option>
              <option value="fagyi">Fagyi</option>
              <option value="csomagolt sütemény">Csomagolt sütemény</option>
            </select>
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
                    checked={formData.allergens.includes(allergen)}
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

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="kiemelt"
              checked={formData.kiemelt}
              onChange={handleChange}
              id="kiemelt"
            />
            <label className="form-check-label" htmlFor="kiemelt">
              Kiemelt termék
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">Kép feltöltése</label>
            {existingImageUrl && (
              <div className="mb-2">
                <img
                  src={`${existingImageUrl}?updated=${Date.now()}`}
                  alt="Aktuális termékkép"
                  style={{
                    width: "150px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}
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

export default AdminProductEdit;
