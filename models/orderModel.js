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
    const [rows] = await db.execute(`
      SELECT 
        o.id as order_id, 
        o.client_id, 
        o.total_price, 
        o.status, 
        oi.painting_id, 
        oi.quantity,
        p.title as painting_title, 
        p.price as painting_price
        
      FROM 
        orders o
      JOIN 
        order_items oi ON o.id = oi.order_id
      JOIN 
        paintings p ON oi.painting_id = p.id
    `);

    const orders = rows.reduce((acc, row) => {
      const order = acc[row.order_id] || {
        id: row.order_id,
        client_id: row.client_id,
        total_price: row.total_price,
        status: row.status,
        items: [],
      };

      order.items.push({
        painting_id: row.painting_id,
        quantity: row.quantity,
        painting_title: row.painting_title,
        painting_price: row.painting_price,
        painting_artist: row.painting_artist,
      });

      acc[row.order_id] = order;
      return acc;
    }, {});

    return Object.values(orders);
  }

  static async updateStatus(id, status) {
    await db.execute("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
  }
}

module.exports = Order;
