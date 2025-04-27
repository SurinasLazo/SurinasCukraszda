import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../hooks/useDebounce";
import "./ProductSearch.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductSearch({ onResults }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      onResults(null);
      return;
    }
    fetch(
      `${API_BASE_URL}/api/products/search?q=${encodeURIComponent(
        debouncedQuery
      )}`
    )
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`HTTP ${res.status}`)
      )
      .then((data) => onResults(data))
      .catch(() => onResults([]));
  }, [debouncedQuery, onResults]);

  return (
    <div className="product-search-container">
      <div className="product-search relative">
        <FaSearch className="product-search__icon" />
        <input
          type="text"
          className="product-search__input"
          placeholder="Keresés a termékek között…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
