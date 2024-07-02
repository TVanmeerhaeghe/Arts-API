const Client = require("../models/clientModel");

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const existingClient = await Client.findById(clientId);

    if (!existingClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    const updatedData = {
      firstname: req.body.firstname || existingClient.firstname,
      lastname: req.body.lastname || existingClient.lastname,
      email: req.body.email || existingClient.email,
      adresse: req.body.adresse || existingClient.adresse,
      complement: req.body.complement || existingClient.complement,
      town: req.body.town || existingClient.town,
      postalCode: req.body.postalCode || existingClient.postalCode,
      phone: req.body.phone || existingClient.phone,
      role: req.body.role || existingClient.role,
    };

    await Client.update(clientId, updatedData);
    res.json({ message: "Client updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await Client.delete(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
