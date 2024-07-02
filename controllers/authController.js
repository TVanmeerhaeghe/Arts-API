const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/clientModel");

exports.register = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    adresse,
    complement,
    town,
    postalCode,
    phone,
    role,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const clientId = await Client.create({
      firstname,
      lastname,
      email,
      adresse,
      complement,
      town,
      postalCode,
      phone,
      role,
    });
    const token = jwt.sign({ id: clientId, role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findByEmail(email);
    if (client && (await bcrypt.compare(password, client.password))) {
      const token = jwt.sign(
        { id: client.id, role: client.role },
        process.env.JWT_SECRET
      );
      res.json({ token });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
