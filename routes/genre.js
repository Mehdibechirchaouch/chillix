const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');

// Create a genre
router.post('/', async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.status(201).json(genre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a genre by ID
router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ error: 'Not found' });
    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a genre
router.put('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ error: 'Not found' });

    await genre.update(req.body);
    res.json(genre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a genre
router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ error: 'Not found' });

    await genre.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
