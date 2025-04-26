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

// GET /api/orders – bejelentkezett user rendelései
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error("Rendeléseim lekérése hiba:", err);
    res.status(500).json({ message: "Hiba a rendeléseim lekérésekor" });
  }
});

module.exports = router;
