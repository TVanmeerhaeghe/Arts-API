const express = require("express");
const paintingController = require("../controllers/paintingController");
const {
  authenticateToken,
  authorizeAdminOrSelf,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, paintingController.getAllPaintings);
router.get("/:id", authenticateToken, paintingController.getPaintingById);
router.post(
  "/create",
  authenticateToken,
  authorizeAdmin,
  paintingController.createPainting
);
router.put(
  "/update/:id",
  authenticateToken,
  authorizeAdmin,
  paintingController.updatePainting
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdmin,
  paintingController.deletePainting
);

module.exports = router;
