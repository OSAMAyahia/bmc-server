const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true }, // e.g. 'hero', 'about', 'services', 'works', 'process', 'tech', 'contact', 'nav', 'testimonials', 'faq'
  data: { type: mongoose.Schema.Types.Mixed, required: true }, // { ar: {...}, en: {...} }
}, { timestamps: true });

module.exports = mongoose.model('Translation', translationSchema);