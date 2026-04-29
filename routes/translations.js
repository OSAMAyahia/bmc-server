const express = require('express');
const router = express.Router();
const Translation = require('../models/Translation');

// GET all translations
router.get('/', async (req, res) => {
  try {
    const translations = await Translation.find();
    // Convert to object keyed by section
    const result = {};
    translations.forEach(t => {
      result[t.section] = t.data;
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single section
router.get('/:section', async (req, res) => {
  try {
    const translation = await Translation.findOne({ section: req.params.section });
    if (!translation) return res.status(404).json({ error: 'Section not found' });
    res.json(translation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update section
router.put('/:section', async (req, res) => {
  try {
    const translation = await Translation.findOneAndUpdate(
      { section: req.params.section },
      { data: req.body.data },
      { new: true, upsert: true }
    );
    res.json(translation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;