const express = require('express');
const router = express.Router();
const SiteConfig = require('../models/SiteConfig');

// GET site config
router.get('/', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = await SiteConfig.create({ siteName: 'BMC Digital' });
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update site config (sections visibility, nav links, etc.)
router.put('/', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = await SiteConfig.create(req.body);
    } else {
      if (req.body.siteName) config.siteName = req.body.siteName;
      if (req.body.navLinks) config.navLinks = req.body.navLinks;
      if (req.body.sections) config.sections = req.body.sections;
      await config.save();
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT toggle section visibility
router.put('/sections/:key', async (req, res) => {
  try {
    const config = await SiteConfig.findOne();
    if (!config) return res.status(404).json({ error: 'Config not found' });

    const section = config.sections.find(s => s.key === req.params.key);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    if (req.body.visible !== undefined) section.visible = req.body.visible;
    if (req.body.order !== undefined) section.order = req.body.order;
    await config.save();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT toggle nav link visibility
router.put('/navlinks/:key', async (req, res) => {
  try {
    const config = await SiteConfig.findOne();
    if (!config) return res.status(404).json({ error: 'Config not found' });

    const link = config.navLinks.find(l => l.key === req.params.key);
    if (!link) return res.status(404).json({ error: 'Nav link not found' });

    if (req.body.visible !== undefined) link.visible = req.body.visible;
    if (req.body.order !== undefined) link.order = req.body.order;
    if (req.body.labelAr) link.labelAr = req.body.labelAr;
    if (req.body.labelEn) link.labelEn = req.body.labelEn;
    if (req.body.href) link.href = req.body.href;
    await config.save();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;