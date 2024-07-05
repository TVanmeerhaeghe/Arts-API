const express = require("express");
const paintingController = require("../controllers/paintingController");
<<<<<<< HEAD
const upload = require('../middlewares/upload');  // Assurez-vous que ce chemin est correct
=======
>>>>>>> 0f191c6a83c5498b203dfca77b990a8c2e67eeee
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
<<<<<<< HEAD
  upload,
=======
>>>>>>> 0f191c6a83c5498b203dfca77b990a8c2e67eeee
  paintingController.createPainting
);
router.put(
  "/update/:id",
  authenticateToken,
  authorizeAdmin,
<<<<<<< HEAD
  upload,
=======
>>>>>>> 0f191c6a83c5498b203dfca77b990a8c2e67eeee
  paintingController.updatePainting
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdmin,
  paintingController.deletePainting
);

module.exports = router;
