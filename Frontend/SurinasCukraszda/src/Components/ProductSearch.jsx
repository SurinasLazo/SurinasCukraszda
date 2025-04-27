import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../hooks/useDebounce";
import "./ProductSearch.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductSearch({
  dropdown = false,
  onResults = () => {},
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debounced = useDebounce(query, 300);
  const containerRef = useRef();

  // Ref-ben tároljuk a legfrissebb onResults függvényt
  const onResultsRef = useRef(onResults);
  useEffect(() => {
    onResultsRef.current = onResults;
  }, [onResults]);

  // Fetch a fuzzy keresésre csak a debounced változásakor
  useEffect(() => {
    if (!debounced) {
      setResults([]);
      onResultsRef.current(null);
      return;
    }

    fetch(
      `${API_BASE_URL}/api/products/search?q=${encodeURIComponent(debounced)}`
    )
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`HTTP error ${res.status}`)
      )
      .then((data) => {
        setResults(data);
        onResultsRef.current(data);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setResults([]);
        onResultsRef.current([]);
      });
  }, [debounced]);

  // Klikk kívülre: dropdown bezárása
  useEffect(() => {
    if (!dropdown) return;
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [dropdown]);

  return (
    <div ref={containerRef} className="product-search-container">
      <div className="product-search">
        <FaSearch className="product-search__icon" />
        <input
          type="text"
          className="product-search__input"
          placeholder="Keresés a termékek között…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {dropdown && results.length > 0 && (
        <ul className="product-search__dropdown">
          {results.map((p) => (
            <li key={p._id} className="product-search__item">
              <a href={`/product/${p._id}`} className="product-search__link">
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
