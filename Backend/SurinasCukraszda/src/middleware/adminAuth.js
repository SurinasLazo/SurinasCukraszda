// src/middleware/adminAuth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Nincs token megadva." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin jogosultság szükséges." });
    }

    req.user = user; // ha később szükség lenne rá
    next();
  } catch (err) {
    console.error("Admin ellenőrzés hiba:", err);
    return res.status(403).json({ message: "Érvénytelen token vagy nem admin." });
  }
};

module.exports = verifyAdmin;
