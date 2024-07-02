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
    await Client.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      adresse,
      complement,
      town,
      postalCode,
      phone,
      role,
    });
    res.status(201).json({ message: "Client registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

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

exports.logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
