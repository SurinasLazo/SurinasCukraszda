// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Nincs érvényes token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Felhasználó nem található" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Token hiba:", err);
    return res.status(403).json({ message: "Érvénytelen token" });
  }
};

module.exports = authMiddleware;
