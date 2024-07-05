const express = require("express");
const certificateController = require("../controllers/certificateController");
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
  certificateController.getAllCertificates
);
router.get(
  "/:id",
  authenticateToken,
  authorizeAdminOrSelf,
  certificateController.getCertificateById
);
router.post(
  "/generate",
  authenticateToken,
  authorizeAdmin,
  certificateController.generateCertificate
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdmin,
  certificateController.deleteCertificate
);

module.exports = router;
