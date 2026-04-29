const mongoose = require('mongoose');

const techSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Tech', techSchema);