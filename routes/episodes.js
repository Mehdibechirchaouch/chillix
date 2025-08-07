const router = require('express').Router();
const Episode = require('../models/Episode');

// Create episode (requires seasonId)
router.post('/', async (req, res) => {
  try {
    const episode = await Episode.create({
      ...req.body,
      SeasonId: req.body.seasonId
    });
    res.status(201).json(episode);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update episode
router.put('/:id', async (req, res) => {
  try {
    const episode = await Episode.findByPk(req.params.id);
    if (!episode) return res.status(404).json({ error: 'Episode not found' });
    await episode.update(req.body);
    res.json(episode);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete episode
router.delete('/:id', async (req, res) => {
  try {
    const episode = await Episode.findByPk(req.params.id);
    if (!episode) return res.status(404).json({ error: 'Episode not found' });
    await episode.destroy();
    res.json({ message: 'Episode deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
