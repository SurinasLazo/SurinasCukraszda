require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

//  MongoDB kapcsolódás
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//  Példa útvonal (teszteléshez)
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

//  Auth útvonalak
const authRoutes = require("./src/routes/auth");
app.use("/api/auth", authRoutes);

// Szerver indítása
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
