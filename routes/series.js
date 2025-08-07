const router = require('express').Router();
const Series = require('../models/Series');
const Season = require('../models/Season');
const Episode = require('../models/Episode');
const { fields } = require('../config/cloudinary'); // adjust path accordingly

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
// File upload setup (fields should be defined like in the movie route)
router.post('/', fields, async (req, res) => {
  try {
    const {
      title,
      description,
      year,
      age
    } = req.body;

    // Parse JSON fields if provided as strings
    const genres = req.body.genres ? JSON.parse(req.body.genres) : [];
    const countries = req.body.countries ? JSON.parse(req.body.countries) : [];

    // Get the uploaded cover (same as Movie's coverPath)
    const Picture = req.files?.cover?.[0]?.path || null;

    const series = await Series.create({
      title,
      description,
      year,
      age,
      Picture,
      countries,
      genres
    });

    res.json({ message: 'Series uploaded successfully', series });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
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
