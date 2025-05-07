// src/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

// Regisztráció – POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Ellenőrizzük, hogy létezik-e már ilyen user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Jelszó hash-elése
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // alapértelmezett role: user
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Hibás email vagy jelszó" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Hibás email vagy jelszó" });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(), // fontos: stringgé alakítjuk
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Szerverhiba a bejelentkezés során" });
  }
});
// GET /api/auth/profile – a saját profil lekérése
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email role");
    if (!user)
      return res.status(404).json({ message: "Felhasználó nem található." });
    res.json({ user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Hiba a profil lekérésekor" });
  }
});

// PATCH /api/auth/profile – a saját profil frissítése
router.patch("/profile", verifyToken, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "Felhasználó nem található." });

    // Ha változik az email, ellenőrizzük az ütközést
    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ message: "Ez az email már foglalt." });
      user.email = email;
    }

    if (name) user.name = name;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();
    // Visszaküldjük az új adatokat (jelszó nélkül)
    res.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Profil frissítve.",
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Hiba a profil frissítésekor" });
  }
});

module.exports = router;
