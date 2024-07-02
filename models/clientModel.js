const db = require("../db");

class Client {
  static async create(data) {
    const [result] = await db.execute(
      "INSERT INTO clients (firstname, lastname, adresse, complement, town, postalCode, email, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.firstname,
        data.lastname,
        data.adresse,
        data.complement,
        data.town,
        data.postalCode,
        data.email,
        data.phone,
        data.role,
      ]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM clients WHERE id = ?", [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM clients WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async update(id, data) {
    await db.execute(
      "UPDATE clients SET firstname = ?, lastname = ?, adresse = ?, complement = ?, town = ?, postalCode = ?, email = ?, phone = ?, role = ? WHERE id = ?",
      [
        data.firstname,
        data.lastname,
        data.adresse,
        data.complement,
        data.town,
        data.postalCode,
        data.email,
        data.phone,
        data.role,
        id,
      ]
    );
  }

  static async delete(id) {
    await db.execute("DELETE FROM clients WHERE id = ?", [id]);
  }
}

module.exports = Client;
