import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import ProductCard from "../Components/ProductCard";
import ProductSearch from "../Components/ProductSearch";
import { Box, Tabs, Tab } from "@mui/material";
import "./Products.css"; // importáld be a CSS-t

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const categoryTitles = {
  összes: "Összes termék",
  sütemény: "Sütemények",
  "csomagolt sütemény": "Csomagolt Sütemények",
  fagyi: "Fagylalt",
};

const ProductSection = ({ title, products }) => {
  if (!products.length) {
    return <p className="text-center">Nincs termék ebben a kategóriában.</p>;
  }
  return (
    <section className="product-section mb-5">
      <h2 className="section-title">{title}</h2>
      <div className="row gx-4 gy-4">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={p} />
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
  const [searchResults, setSearchResults] = useState(null);

  // 1) Betöltés
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

  // 2) Kategóriaváltás törli a keresést
  useEffect(() => {
    setSearchResults(null);
  }, [selectedCategory]);

  // 3) Keresési eredmény callback memoizálva
  const handleSearchResults = useCallback(
    (results) => {
      if (!results || results.length === 0) {
        setSearchResults(results && results.length === 0 ? [] : null);
      } else {
        const inCat =
          selectedCategory === "összes"
            ? results
            : results.filter((p) => p.category === selectedCategory);
        setSearchResults(inCat);
      }
    },
    [selectedCategory]
  );

  if (loading) return <p className="text-center">Töltés…</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  // 4) Lista előállítása
  const byCategory =
    selectedCategory === "összes"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const displayed = Array.isArray(searchResults) ? searchResults : byCategory;

  // === Így építjük fel a flex-konténert ===
  return (
    <div className="products-page-container">
      <Header />

      <main className="products-page-content">
        <div className="container py-4">
          {/* ====== Kereső ====== */}
          <ProductSearch onResults={handleSearchResults} />

          {/* ====== Kategória-fülek ====== */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={selectedCategory}
              onChange={(_e, cat) => setSelectedCategory(cat)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
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
                    color: "rgba(0,0,0,0.7)",
                    textTransform: "none",
                    fontWeight: 500,
                    "&.Mui-selected": { color: "var(--primary-color)" },
                    "&:hover": { color: "var(--primary-color)", opacity: 1 },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* ====== Terméklista ====== */}
          <ProductSection
            title={categoryTitles[selectedCategory]}
            products={displayed}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
