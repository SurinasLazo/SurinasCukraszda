const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const adminAuth = require("../middleware/adminAuth");

// GET /api/admin/orders
router.get("/", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.product", "name price");
    res.json({ orders });
  } catch (err) {
    console.error("AdminOrders GET hiba:", err);
    res.status(500).json({ message: "Hiba a rendelések lekérésekor" });
  }
});

router.patch("/:id", adminAuth, async (req, res) => {
  console.log(">>> PATCH /api/admin/orders/%s body:", req.params.id, req.body);
  try {
    const { status, pickupDate } = req.body;
    const update = { status };
    if (status === "ready_for_pickup") update.pickupDate = pickupDate;
    else update.pickupDate = undefined;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    )
      .populate("user", "name email")
      .populate("items.product", "name price");

    if (!order)
      return res.status(404).json({ message: "Rendelés nem található" });
    res.json({ order });
  } catch (err) {
    console.error("AdminOrders PATCH hiba:", err);
    res.status(400).json({ message: "Hiba a rendelés frissítésekor" });
  }
});

module.exports = router;
