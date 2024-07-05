const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
<<<<<<< HEAD
=======
const path = require("path");
>>>>>>> 0f191c6a83c5498b203dfca77b990a8c2e67eeee
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const paintingRoutes = require("./routes/paintingRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/paintings", paintingRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/orders", orderRoutes);
<<<<<<< HEAD
app.use('/public', express.static('public'));
=======
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
>>>>>>> 0f191c6a83c5498b203dfca77b990a8c2e67eeee

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
