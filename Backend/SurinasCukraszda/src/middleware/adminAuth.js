// src/middleware/adminAuth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Nincs token megadva." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin jogosultság szükséges." });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Admin ellenőrzés hiba:", err);
    return res
      .status(401)
      .json({ message: "Érvénytelen token vagy nem admin." });
  }
};

module.exports = adminAuth;
