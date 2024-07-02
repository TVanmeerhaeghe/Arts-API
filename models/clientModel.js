const db = require("../db");

class Client {
  static async create(data) {
    const [result] = await db.execute(
      `INSERT INTO clients 
            (firstname, lastname, email, password, adresse, complement, town, postalCode, phone, role) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.firstname,
        data.lastname,
        data.email,
        data.password,
        data.adresse || null,
        data.complement || null,
        data.town || null,
        data.postalCode || null,
        data.phone || null,
        data.role || "client",
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

  static async findAll() {
    const [rows] = await db.execute("SELECT * FROM clients");
    return rows;
  }

  static async update(id, data) {
    await db.execute(
      `UPDATE clients 
            SET firstname = ?, lastname = ?, email = ?, adresse = ?, complement = ?, town = ?, postalCode = ?, phone = ?, role = ? 
            WHERE id = ?`,
      [
        data.firstname,
        data.lastname,
        data.email,
        data.adresse || null,
        data.complement || null,
        data.town || null,
        data.postalCode || null,
        data.phone || null,
        data.role || "client",
        id,
      ]
    );
  }

  static async delete(id) {
    await db.execute("DELETE FROM clients WHERE id = ?", [id]);
  }
}

module.exports = Client;
