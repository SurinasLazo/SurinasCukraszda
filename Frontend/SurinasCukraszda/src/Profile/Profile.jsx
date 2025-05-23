import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";
import "./Profile.css";
const API = import.meta.env.VITE_API_BASE_URL;

export default function Profile() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetch(`${API}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(({ user }) => {
        setForm((f) => ({ ...f, name: user.name, email: user.email }));
      })
      .catch(() => toast.error("Profil betöltése sikertelen"))
      .finally(() => setLoading(false));
  }, [navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirm) {
      return toast.error("A jelszavak nem egyeznek.");
    }
    try {
      const res = await fetch(`${API}/api/auth/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Hiba");
      setUser(data.user);
      toast.success(data.message);
      setForm((f) => ({ ...f, password: "", confirm: "" }));
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Profil frissítése sikertelen");
    }
  };

  if (loading) return <p className="text-center py-5">Betöltés…</p>;

  return (
    <>
      <Header />
      <div className="profile-container">
        <h2>Profil</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Név
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Új jelszó
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </label>
          <label>
            Jelszó újra
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Mentés
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
