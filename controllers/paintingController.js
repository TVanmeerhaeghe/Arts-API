const Painting = require("../models/paintingModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("image");

exports.getAllPaintings = async (req, res) => {
  try {
    const paintings = await Painting.findAll();
    res.json(paintings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPaintingById = async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (painting) {
      res.json(painting);
    } else {
      res.status(404).json({ error: "Painting not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPainting = async (req, res) => {
  try {
    const data = {
      ...req.body,
      imagePath: req.file ? req.file.path : null, // Inclure le chemin de l'image
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const id = await Painting.create(data);
    res.status(201).json({ message: "Painting created successfully", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePainting = async (req, res) => {
  try {
    const data = {
      ...req.body,
      updatedAt: new Date(),
    };

    if (req.file) {
      data.imagePath = req.file.path;
    }

    await Painting.update(req.params.id, data);
    res.json({ message: "Painting updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePainting = async (req, res) => {
  try {
    await Painting.delete(req.params.id);
    res.json({ message: "Painting deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
