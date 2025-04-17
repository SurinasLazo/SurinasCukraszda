// src/models/Order.js
const mongoose = require("mongoose");

const statusEnum = [
  "pending",
  "confirmed",
  "ready_for_pickup",
  "completed",
  "canceled",
];

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: statusEnum, default: "pending" },
    pickupDate: {
      type: Date,
      required: function () {
        return this.status === "ready_for_pickup";
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
