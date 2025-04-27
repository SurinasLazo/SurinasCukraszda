const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const storage = multer.memoryStorage(); // képet RAM-ba tölti
const upload = multer({ storage });
const Fuse = require("fuse.js");

/**
 * GET /api/products/search?q=...
 * Fuzzy keresés a name és description mezőkben
 */
router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json([]);

    // 1) Összes termék lekérése
    const products = await Product.find({}).lean();

    // 2) Fuse.js konfiguráció
    const fuse = new Fuse(products, {
      keys: [
        { name: "name", weight: 0.8 },
        { name: "description", weight: 0.2 },
      ],
      threshold: 0.4, // fuzziness (0.0–1.0)
      includeScore: true,
      minMatchCharLength: 2,
    });

    // 3) Keresés lefuttatása, rendezés score alapján
    const results = fuse
      .search(q)
      .sort((a, b) => a.score - b.score)
      .map((r) => r.item);

    return res.json(results);
  } catch (err) {
    console.error("Keresési hiba:", err);
    return res.status(500).json({ message: "Szerverhiba a keresés során." });
  }
});

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
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Termék nem található" });

      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.weight = req.body.weight;
      product.category = req.body.category;
      product.kiemelt =
        req.body.kiemelt === "true" || req.body.kiemelt === true;
      product.allergens = req.body.allergens
        ? JSON.parse(req.body.allergens)
        : [];

      if (req.file) {
        product.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      const updated = await product.save();
      res.json(updated);
    } catch (err) {
      console.error("Termék frissítési hiba:", err);
      res.status(500).json({ message: "Szerverhiba a frissítéskor" });
    }
  }
);

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

// DELETE egy termék ID alapján (csak admin)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "A termék nem található" });
    }
    res.json({ message: "Termék sikeresen törölve" });
  } catch (err) {
    console.error("Törlés hiba:", err);
    res.status(500).json({ message: "Szerverhiba törlés közben" });
  }
});

module.exports = router;
