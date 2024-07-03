const db = require("../db");

class OrderItem {
  static async create(order_id, painting_id, quantity) {
    const [result] = await db.execute(
      "INSERT INTO order_items (order_id, painting_id, quantity) VALUES (?, ?, ?)",
      [order_id, painting_id, quantity]
    );
    return result.insertId;
  }

  static async findByOrderId(order_id) {
    const [rows] = await db.execute(
      "SELECT * FROM order_items WHERE order_id = ?",
      [order_id]
    );
    return rows;
  }
}

module.exports = OrderItem;
