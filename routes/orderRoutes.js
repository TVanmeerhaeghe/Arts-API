const express = require("express");
const orderController = require("../controllers/orderController");
const {
  authenticateToken,
  authorizeAdmin,
  authorizeAdminOrSelf,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authenticateToken, orderController.createOrder);
router.get(
  "/:id",
  authenticateToken,
  authorizeAdminOrSelf,
  orderController.getOrderById
);
router.get(
  "/",
  authenticateToken,
  authorizeAdmin,
  orderController.getAllOrders
);
router.put(
  "/:id/status",
  authenticateToken,
  authorizeAdmin,
  orderController.updateOrderStatus
);

module.exports = router;
