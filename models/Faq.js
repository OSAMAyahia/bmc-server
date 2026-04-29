const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  questionAr: { type: String, required: true },
  questionEn: { type: String, required: true },
  answerAr: { type: String, required: true },
  answerEn: { type: String, required: true },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Faq', faqSchema);