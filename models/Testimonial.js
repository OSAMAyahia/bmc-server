const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  nameAr: { type: String, required: true },
  nameEn: { type: String, required: true },
  roleAr: { type: String, required: true },
  roleEn: { type: String, required: true },
  textAr: { type: String, required: true },
  textEn: { type: String, required: true },
  rating: { type: Number, default: 5 },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);