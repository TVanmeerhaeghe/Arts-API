const express = require("express");
const clientController = require("../controllers/clientController");
const {
  authenticateToken,
  authorizeAdminOrSelf,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizeAdmin,
  clientController.getAllClients
);
router.get(
  "/:id",
  authenticateToken,
  authorizeAdminOrSelf,
  clientController.getClientById
);
router.put(
  "/update/:id",
  authenticateToken,
  authorizeAdminOrSelf,
  clientController.updateClient
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdminOrSelf,
  clientController.deleteClient
);

module.exports = router;
