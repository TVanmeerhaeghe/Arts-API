const express = require("express");
const certificateController = require("../controllers/certificateController");
const {
  authenticateToken,
  authorizeAdminOrSelf,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizeAdminOrSelf,
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
  authorizeAdminOrSelf,
  certificateController.generateCertificate
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdminOrSelf,
  certificateController.deleteCertificate
);

module.exports = router;
