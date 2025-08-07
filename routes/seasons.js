const router = require('express').Router();
const Season = require('../models/Season');

// Create season (requires seriesId)
router.post('/', async (req, res) => {
  try {
    const season = await Season.create({
      number: req.body.number,
      SeriesId: req.body.seriesId
    });
    res.status(201).json(season);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update season
router.put('/:id', async (req, res) => {
  try {
    const season = await Season.findByPk(req.params.id);
    if (!season) return res.status(404).json({ error: 'Season not found' });
    await season.update(req.body);
    res.json(season);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete season
router.delete('/:id', async (req, res) => {
  try {
    const season = await Season.findByPk(req.params.id);
    if (!season) return res.status(404).json({ error: 'Season not found' });
    await season.destroy();
    res.json({ message: 'Season deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
