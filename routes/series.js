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
      age,
      trailerLink,
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
      genres,
      trailerLink
    });

    res.json({ message: 'Series uploaded successfully', series });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Update a series
router.put('/:id', fields, async (req, res) => {
  try {
    const series = await Series.findByPk(req.params.id);
    if (!series) {
      return res.status(404).json({ error: 'Series not found' });
    }

    // Parse JSON fields if they are stringified
    ['genres', 'countries', 'actors', 'directors', 'languages'].forEach(field => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          console.warn(`Failed to parse ${field}:`, e.message);
        }
      }
    });

    // Handle updated image uploads
    if (req.files?.cover?.length) {
      req.body.Picture = req.files.cover[0].path;
    }

    if (req.files?.photos?.length) {
      req.body.photoPaths = req.files.photos.map(photo => photo.path);
    }

    const updatedSeries = await series.update(req.body);
    res.json({ message: 'Series updated successfully', updatedSeries });

  } catch (err) {
    console.error('PUT /api/series/:id error:', err);
    res.status(500).json({ error: 'Failed to update series' });
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
