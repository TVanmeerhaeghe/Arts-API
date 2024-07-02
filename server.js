const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
