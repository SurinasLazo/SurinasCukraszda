const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const storage = multer.memoryStorage(); // képet RAM-ba tölti
const upload = multer({ storage });

//  POST új termék (csak admin)
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, price, weight, category, kiemelt } = req.body;

      if (!name || !price || !category || !description) {
        return res.status(400).json({ message: "Hiányzó mezők." });
      }

      const allergens = req.body.allergens
        ? JSON.parse(req.body.allergens)
        : [];

      const newProduct = new Product({
        name,
        description,
        price,
        allergens,
        weight,
        category,
        kiemelt: kiemelt === "true" || kiemelt === true,
      });

      if (req.file) {
        newProduct.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      const saved = await newProduct.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error("Mentési hiba:", err);
      res.status(500).json({ message: "Szerverhiba." });
    }
  }
);

//  GET összes termék
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  GET egy termék ID alapján
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Termék nem található" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Kép kiszolgálása base64 formátumban
router.get("/:id/image", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.image || !product.image.data) {
      return res.status(404).send("Kép nem található.");
    }

    res.set("Content-Type", product.image.contentType);
    res.send(product.image.data);
  } catch (err) {
    console.error("Kép lekérési hiba:", err);
    res.status(500).send("Szerverhiba.");
  }
});

module.exports = router;
