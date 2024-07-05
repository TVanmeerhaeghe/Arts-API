const db = require("../db");

class Certificate {
  static async create(painting_id, client_id, certificate_number) {
    const [result] = await db.execute(
      "INSERT INTO certificates (painting_id, client_id, certificate_number) VALUES (?, ?, ?)",
      [painting_id, client_id, certificate_number]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM certificates WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await db.execute("SELECT * FROM certificates");
    return rows;
  }

  static async deleteById(id) {
    await db.execute("DELETE FROM certificates WHERE id = ?", [id]);
  }

  static async findByPaintingId(painting_id) {
    const [rows] = await db.execute(
      "SELECT * FROM certificates WHERE painting_id = ?",
      [painting_id]
    );
    return rows[0];
  }
}

module.exports = Certificate;
