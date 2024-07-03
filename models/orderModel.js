const db = require("../db");

class Order {
  static async create(client_id, total_price, status = "pending") {
    const [result] = await db.execute(
      "INSERT INTO orders (client_id, total_price, status) VALUES (?, ?, ?)",
      [client_id, total_price, status]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM orders WHERE id = ?", [id]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await db.execute("SELECT * FROM orders");
    return rows;
  }

  static async updateStatus(id, status) {
    await db.execute("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
  }
}

module.exports = Order;
