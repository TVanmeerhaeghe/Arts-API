const express = require("express");
const paintingController = require("../controllers/paintingController");
const upload = require('../middlewares/upload');  // Assurez-vous que ce chemin est correct
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
  upload,
  paintingController.createPainting
);
router.put(
  "/update/:id",
  authenticateToken,
  authorizeAdmin,
  upload,
  paintingController.updatePainting
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdmin,
  paintingController.deletePainting
);

module.exports = router;
