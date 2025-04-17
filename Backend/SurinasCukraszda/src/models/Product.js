const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  allergens: { type: [String], default: [] },
  weight: { type: String, required: false },
  category: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
  kiemelt: { type: Boolean, default: false },
  salesCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
