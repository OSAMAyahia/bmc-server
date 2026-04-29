const express = require('express');
const router = express.Router();
const Tech = require('../models/Tech');

// GET all techs
router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find().sort({ order: 1 });
    res.json(techs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create tech
router.post('/', async (req, res) => {
  try {
    const tech = await Tech.create(req.body);
    res.status(201).json(tech);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update tech
router.put('/:id', async (req, res) => {
  try {
    const tech = await Tech.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tech) return res.status(404).json({ error: 'Tech not found' });
    res.json(tech);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE tech
router.delete('/:id', async (req, res) => {
  try {
    const tech = await Tech.findByIdAndDelete(req.params.id);
    if (!tech) return res.status(404).json({ error: 'Tech not found' });
    res.json({ message: 'Tech deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;