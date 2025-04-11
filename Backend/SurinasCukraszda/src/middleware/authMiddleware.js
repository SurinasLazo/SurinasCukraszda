// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Token ellenőrzés (bármely bejelentkezett felhasználó számára)
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Nincs érvényes token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Felhasználó nem található." });
    }

    req.user = user; // attach user to req
    next();
  } catch (err) {
    console.error("Token hiba:", err);
    return res.status(403).json({ message: "Érvénytelen token." });
  }
};

// Admin szerepkör ellenőrzés (csak ha már van req.user)
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin jogosultság szükséges." });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdmin,
};
