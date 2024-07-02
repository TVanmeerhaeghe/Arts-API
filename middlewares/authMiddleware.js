const jwt = require("jsonwebtoken");
const Client = require("../models/clientModel");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader;

  if (!token) {
    console.log("No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.sendStatus(403);
    }
    req.user = user;
    console.log("Token verified successfully:", user);
    next();
  });
};

const authorizeAdminOrSelf = async (req, res, next) => {
  const clientId = req.params.id;
  console.log("User role:", req.user.role);
  if (req.user.role === "admin" || req.user.id == clientId) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = { authenticateToken, authorizeAdminOrSelf };
