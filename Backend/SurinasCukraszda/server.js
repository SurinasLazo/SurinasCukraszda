// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Alap middleware-ek
const allowedOrigins = [
  "http://localhost:5173",
  "https://surinas-cukraszda.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(express.json());

// MongoDB csatlakozás
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Termékek route-ok
const productRoutes = require("./src/routes/Product");
app.use("/api/products", productRoutes);

// Auth route-ok – fontos, hogy ezt is regisztráld!
const authRoutes = require("./src/routes/auth");
app.use("/api/auth", authRoutes);

// További route-ok (pl. order stb.) itt jöhetnek majd

// Szerver indítása
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const orderRoutes = require("./src/routes/order");
app.use("/api/orders", orderRoutes);
