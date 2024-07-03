const PDFDocument = require("pdfkit");
const Client = require("../models/clientModel");
const Painting = require("../models/paintingModel");
const Certificate = require("../models/certificateModel");
const path = require("path");
const crypto = require("crypto");

exports.generateCertificate = async (req, res) => {
  const { clientId, paintingId } = req.body;

  try {
    const client = await Client.findById(clientId);
    const painting = await Painting.findById(paintingId);

    if (!client || !painting) {
      return res.status(404).json({ error: "Client or Painting not found" });
    }

    const existingCertificate = await Certificate.findByPaintingId(paintingId);

    if (existingCertificate) {
      return res
        .status(400)
        .json({ error: "A certificate for this painting already exists" });
    }

    const certificateNumber = crypto.randomBytes(6).toString("hex");
    await Certificate.create(paintingId, clientId, certificateNumber);

    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(pdfData),
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment;filename=certificate_${certificateNumber}.pdf`,
        })
        .end(pdfData);
    });

    const currentDate = new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const logoPath = path.join(__dirname, "../logo.png");
    const signaturePath = path.join(__dirname, "../signature.png");

    doc.image(logoPath, 50, 50, { width: 100 });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();

    doc
      .fontSize(25)
      .text("Certificat d'authenticité", { align: "center", bold: true });
    doc.moveDown();

    doc
      .fontSize(18)
      .text(
        `Ceci certifie que la peinture "${painting.title}" est bien authentique.`,
        { align: "left" }
      );
    doc.moveDown();

    doc
      .fontSize(16)
      .text(`Description: ${painting.description}`, { align: "left" })
      .text(`Dimensions: ${painting.width} x ${painting.height} cm`, {
        align: "left",
      });
    doc.moveDown();
    doc.moveDown();
    doc.image(signaturePath, 450, 450, { width: 100 });

    doc.fontSize(16).text(`Date d'authentification :  ${currentDate}`);
    doc
      .fontSize(16)
      .text(`Numéro du certificat : ${certificateNumber}`, { align: "left" });
    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  const { id } = req.params;

  try {
    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    await Certificate.deleteById(id);
    res.json({ message: "Certificate deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.findAll();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCertificateById = async (req, res) => {
  const { id } = req.params;

  try {
    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    res.json(certificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
