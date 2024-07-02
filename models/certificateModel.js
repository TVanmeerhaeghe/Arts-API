const db = require("../db");

class Certificate {
  static async create(painting_id, client_id) {
    const [result] = await db.execute(
      "INSERT INTO certificates (painting_id, client_id) VALUES (?, ?)",
      [painting_id, client_id]
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
}

module.exports = Certificate;
