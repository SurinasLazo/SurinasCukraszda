import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import AboutUs from "./AboutUs/AboutUs";
import Products from "./ProductPage/Products";
import ProductDetail from "./ProductPage/ProductDetails/ProductDetail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route exact path="/products" element={<Products></Products>} />
        <Route
          path="/product/:productId"
          element={<ProductDetail></ProductDetail>}
        />
      </Routes>
    </Router>
  );
}

export default App;
