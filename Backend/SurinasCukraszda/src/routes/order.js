const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { verifyToken } = require("../middleware/authMiddleware");

// POST /api/orders – új rendelés létrehozása
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "A rendelés üres" });
    }

    const order = new Order({
      user: req.user._id,
      items,
      total,
    });

    await order.save();

    res.status(201).json({ message: "Rendelés sikeresen létrehozva", order });
  } catch (err) {
    console.error("Rendelés hiba:", err);
    res.status(500).json({ message: "Hiba történt a rendelés során" });
  }
});

module.exports = router;
