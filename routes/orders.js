const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new order
router.post('/', async (req, res) => {
  try {
    const { name, phone, contact, service, details, extra, formType, fields } = req.body;
    if (!name || !phone || !contact || !service || !details) {
      return res.status(400).json({ error: 'name, phone, contact, service and details are required' });
    }
    const safeFields = fields && typeof fields === 'object' && !Array.isArray(fields) ? fields : {};
    const normalizedFormType = typeof formType === 'string' ? formType : '';
    const order = await Order.create({ name, phone, contact, service, formType: normalizedFormType, fields: safeFields, details, extra });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update order status
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
