// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import ProductCard from "../components/ProductCard";
import { Box, Tabs, Tab } from "@mui/material";
import "./Products.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductSection = ({ title, products }) => {
  if (!products.length) {
    return <p className="text-center">Nincs termék ebben a kategóriában.</p>;
  }
  return (
    <section className="product-section mb-5">
      <h2 className="section-title">{title}</h2>
      <div className="row gx-4 gy-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("összes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTitles = {
    összes: "Összes termék",
    sütemény: "Sütemények",
    "csomagolt sütemény": "Csomagolt Sütemények",
    fagyi: "Fagylalt",
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products`)
      .then((res) => {
        const fetched = res.data.map((p) => ({ ...p, id: p._id }));
        setProducts(fetched);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Hiba történt a termékek betöltésekor.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Töltés…</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  const handleTabChange = (_e, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const filtered =
    selectedCategory === "összes"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Header />
      <div className="container py-4">
        {/* ====== STÍLUSOZOTT MUI TABS ====== */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              // az indikátor színe és vastagsága
              "& .MuiTabs-indicator": {
                backgroundColor: "var(--primary-color)",
                height: 4,
              },
            }}
          >
            {Object.entries(categoryTitles).map(([key, label]) => (
              <Tab
                key={key}
                label={label}
                value={key}
                sx={{
                  // alap szövegszín (nem aktív)
                  color: "rgba(0,0,0,0.7)",
                  textTransform: "none",
                  fontWeight: 500,
                  // kijelölt állapot szöveg
                  "&.Mui-selected": {
                    color: "var(--primary-color)",
                  },
                  // hover effekt
                  "&:hover": {
                    color: "var(--primary-color)",
                    opacity: 1,
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* terméklista */}
        <ProductSection
          title={categoryTitles[selectedCategory]}
          products={filtered}
        />
      </div>
      <Footer />
    </>
  );
}
