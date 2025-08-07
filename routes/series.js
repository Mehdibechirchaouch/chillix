const router = require('express').Router();
const Series = require('../models/Series');
const Season = require('../models/Season');
const Episode = require('../models/Episode');

// Get all series with seasons and episodes
router.get('/', async (req, res) => {
  try {
    const series = await Series.findAll({
      include: {
        model: Season,
        include: Episode
      }
    });
    res.json(series);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one series
router.get('/:id', async (req, res) => {
  try {
    const series = await Series.findByPk(req.params.id, {
      include: {
        model: Season,
        include: Episode
      }
    });
    if (!series) return res.status(404).json({ error: 'Series not found' });
    res.json(series);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a series
router.post('/', async (req, res) => {
  try {
    const newSeries = await Series.create(req.body);
    res.status(201).json(newSeries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a series
router.put('/:id', async (req, res) => {
  try {
    const series = await Series.findByPk(req.params.id);
    if (!series) return res.status(404).json({ error: 'Series not found' });
    await series.update(req.body);
    res.json(series);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a series
router.delete('/:id', async (req, res) => {
  try {
    const series = await Series.findByPk(req.params.id);
    if (!series) return res.status(404).json({ error: 'Series not found' });
    await series.destroy();
    res.json({ message: 'Series deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
