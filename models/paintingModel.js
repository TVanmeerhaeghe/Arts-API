const db = require("../db");

class Painting {
    static async create(data) {
        const [result] = await db.execute(
            "INSERT INTO paintings (title, description, width, height, price, quantity, imagePath, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                data.title,
                data.description,
                data.width,
                data.height,
                data.price,
                data.quantity,
                data.imagePath,
                data.createdAt,
                data.updatedAt,
            ]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.execute("SELECT * FROM paintings");
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute("SELECT * FROM paintings WHERE id = ?", [
            id,
        ]);
        return rows[0];
    }

    static async update(id, data) {
        await db.execute(
            "UPDATE paintings SET title = ?, description = ?, width = ?, height = ?, price = ?, quantity = ?, imagePath = ?, updatedAt = ? WHERE id = ?",
            [
                data.title,
                data.description,
                data.width,
                data.height,
                data.price,
                data.quantity,
                data.imagePath,
                data.updatedAt,
                id,
            ]
        );
    }

    static async delete(id) {
        await db.execute("DELETE FROM paintings WHERE id = ?", [id]);
    }
}

module.exports = Painting;
