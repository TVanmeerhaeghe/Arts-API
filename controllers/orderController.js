const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const Painting = require("../models/paintingModel");

exports.createOrder = async (req, res) => {
  const { clientId, items } = req.body;

  try {
    let totalPrice = 0;

    for (const item of items) {
      const painting = await Painting.findById(item.paintingId);
      if (!painting) {
        return res
          .status(404)
          .json({ error: `Painting with ID ${item.paintingId} not found` });
      }
      totalPrice += painting.price * item.quantity;
    }

    const orderId = await Order.create(clientId, totalPrice);

    for (const item of items) {
      await OrderItem.create(orderId, item.paintingId, item.quantity);
    }

    res.status(201).json({ message: "Order created successfully", orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const items = await OrderItem.findByOrderId(id);
    res.json({ order, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Order.updateStatus(id, status);
    res.json({ message: "Order status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
