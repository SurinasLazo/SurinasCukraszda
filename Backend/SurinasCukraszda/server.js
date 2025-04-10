require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware-ek
app.use(
  cors({
    origin: "http://localhost:5173", // vagy később a Netlify domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB kapcsolódás
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ROUTE-ok betöltése
const authRoutes = require("./src/routes/auth");
const orderRoutes = require("./src/routes/order");
const productRoutes = require("./src/routes/product"); 

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes); // <- létrehozás

// Szerver indítása
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
