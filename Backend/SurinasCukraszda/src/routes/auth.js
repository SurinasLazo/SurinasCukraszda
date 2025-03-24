const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Az email már foglalt." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Sikeres regisztráció!" });
  } catch (error) {
    res.status(500).json({ message: "Hiba történt a regisztráció során." });
  }
});

router.post("/login", async (req, res) => {
  // Debug: listázzuk az összes usert a DB-ből
  const allUsers = await User.find({});
  console.log("Összes user a DB-ben:", allUsers);

  console.log("Beérkező login request body:", req.body); // Ellenőrizzük, milyen adat érkezik
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.error("Hiányzik az email vagy jelszó");
      return res.status(400).json({ message: "Email és jelszó kötelező!" });
    }

    const user = await User.findOne({ email });
    console.log("Megtalált user:", user);
    if (!user) {
      console.error("Nincs ilyen felhasználó az adatbázisban:", email);
      return res.status(400).json({ message: "Hibás email vagy jelszó." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Jelszó egyezés:", isMatch);
    if (!isMatch) {
      console.error("Jelszó nem egyezik!");
      return res.status(400).json({ message: "Hibás email vagy jelszó." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log("JWT token létrehozva:", token);

    return res.status(200).json({ token, message: "Sikeres bejelentkezés!" });
  } catch (error) {
    console.error("Login hiba:", error);
    return res
      .status(500)
      .json({ message: "Bejelentkezés sikertelen", error: error.message });
  }
});

module.exports = router;
