// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Header from "./Header";
import HomePage from "./HomePage/HomePage";
import AboutUs from "./AboutUs/AboutUs";
import Products from "./ProductPage/Products";
import ProductDetail from "./ProductPage/ProductDetails/ProductDetail";
import Cart from "./Cart/Cart";

function App() {
  return (
    <Router>
      {/* Header lokálisan kezeli a modálisokat, így itt nem kell modális állapotot fenntartani */}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rolunk" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
