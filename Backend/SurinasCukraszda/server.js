require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

//  CORS beállítás – Netlify URL-t
app.use(
  cors({
    origin: ["http://localhost:5173", "https://surinas-cukraszda.netlify.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors()); // preflight

//  JSON-t és formadatokat kezel
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Feltöltött képek kiszolgálása
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB csatlakozás
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ROUTE-ok
const authRoutes = require("./src/routes/auth");
const orderRoutes = require("./src/routes/order");
const productRoutes = require("./src/routes/product");
const adminOrdersRoutes = require("./src/routes/adminOrders");

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/orders", adminOrdersRoutes);

// Szerver indítása (Render automatikusan PORT változót használ)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
