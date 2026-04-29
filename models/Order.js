const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  contact: { type: String, required: true },
  service: { type: String, required: true },
  details: { type: String, required: true },
  extra: { type: String, default: '' },
  status: { type: String, enum: ['new', 'in_progress', 'completed', 'cancelled'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);