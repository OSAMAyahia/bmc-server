const mongoose = require('mongoose');

const navLinkSchema = new mongoose.Schema({
  key: { type: String, required: true }, // e.g. 'home', 'services', 'works', 'contact'
  labelAr: { type: String, required: true },
  labelEn: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
});

const sectionSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g. 'hero', 'about', 'services', etc.
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

const siteConfigSchema = new mongoose.Schema({
  siteName: { type: String, default: 'BMC Digital' },
  navLinks: [navLinkSchema],
  sections: [sectionSchema],
}, { timestamps: true });

module.exports = mongoose.model('SiteConfig', siteConfigSchema);