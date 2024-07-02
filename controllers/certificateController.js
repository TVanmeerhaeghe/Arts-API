const PDFDocument = require("pdfkit");
const Client = require("../models/clientModel");
const Painting = require("../models/paintingModel");
const Certificate = require("../models/certificateModel");

exports.generateCertificate = async (req, res) => {
  const { clientId, paintingId } = req.body;

  try {
    const client = await Client.findById(clientId);
    const painting = await Painting.findById(paintingId);

    if (!client || !painting) {
      return res.status(404).json({ error: "Client or Painting not found" });
    }

    await Certificate.create(paintingId, clientId);

    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(pdfData),
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment;filename=certificate.pdf",
        })
        .end(pdfData);
    });

    doc.fontSize(25).text("Certificat d'authenticité", { align: "center", bold: true });
    doc.moveDown();

    doc.fontSize(18)
        .text(`Ceci certifie que la peinture "${painting.title}"`, { align: "left" });
    doc.moveDown();

    doc.fontSize(16)
        .text(`Description: ${painting.description}`, { align: "left" })
        .text(`Dimensions: ${painting.width} x ${painting.height} cm`, { align: "left" });
    doc.moveDown();

    doc.fontSize(16)
        .text(`Cette œuvre est bien authentique.`);

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
