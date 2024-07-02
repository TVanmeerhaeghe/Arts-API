const express = require("express");
const paintingController = require("../controllers/paintingController");
const {
    authenticateToken,
    authorizeAdminOrSelf,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, paintingController.getAllPaintings);
router.get(
    "/:id",
    authenticateToken,
    authorizeAdminOrSelf,
    paintingController.getPaintingById
);
router.post(
    "/create",
    authenticateToken,
    authorizeAdminOrSelf,
    paintingController.createPainting
);
router.put(
    "/update/:id",
    authenticateToken,
    authorizeAdminOrSelf,
    paintingController.updatePainting
);
router.delete(
    "/delete/:id",
    authenticateToken,
    authorizeAdminOrSelf,
    paintingController.deletePainting
);

module.exports = router;
