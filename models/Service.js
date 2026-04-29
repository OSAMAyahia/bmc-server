const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: '🌐' },
  titleAr: { type: String, required: true },
  titleEn: { type: String, required: true },
  descAr: { type: String, required: true },
  descEn: { type: String, required: true },
  featuresAr: [{ type: String }],
  featuresEn: [{ type: String }],
  // Detail page content
  detailTitleAr: { type: String },
  detailTitleEn: { type: String },
  detailTitleSpanAr: { type: String },
  detailTitleSpanEn: { type: String },
  detailDescAr: { type: String },
  detailDescEn: { type: String },
  benefitsAr: [{ title: String, desc: String }],
  benefitsEn: [{ title: String, desc: String }],
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);