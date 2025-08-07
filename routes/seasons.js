const router = require('express').Router();
const Season = require('../models/Season');
const Series = require('../models/Series');  // Ensure you have this for validation

// Create season (requires SeriesId and number)
router.post('/', async (req, res) => {
  const { number, SeriesId } = req.body;

  // Basic validation to ensure number and SeriesId are provided
  if (!number || !SeriesId) {
    return res.status(400).json({ error: 'Season number and SeriesId are required.' });
  }

  try {
    // Check if the season already exists for the selected series
    const existingSeason = await Season.findOne({ where: { number, SeriesId } });
    if (existingSeason) {
      return res.status(400).json({ error: 'This season number already exists for the selected series.' });
    }

    // Create the new season
    const season = await Season.create({
      number,
      SeriesId
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
