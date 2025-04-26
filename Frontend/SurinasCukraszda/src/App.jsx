// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Header";
import HomePage from "./HomePage/HomePage";
import AboutUs from "./AboutUs/AboutUs";
import Products from "./ProductPage/Products";
import ProductDetail from "./ProductPage/ProductDetails/ProductDetail";
import Cart from "./Cart/Cart";
import AdminProductList from "./admin/AdminProductList";
import AdminProductCreate from "./admin/AdminProductCreate";
import AdminProductEdit from "./admin/AdminProductEdit";
import AdminOrdersPage from "./admin/AdminOrdersPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyOrders from "./Orders/MyOrders";
import Profile from "./Profile/Profile";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        {/* Header lokálisan kezeli a modálisokat, így itt nem kell modális állapotot fenntartani */}
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rolunk" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/admin/products/create"
            element={<AdminProductCreate />}
          />
          <Route
            path="/admin/products/edit/:id"
            element={<AdminProductEdit />}
          />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
