const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Create a team member
router.post('/', async (req, res) => {
  try {
    const teamMember = await Team.create(req.body);
    res.status(201).json(teamMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all team members
router.get('/', async (req, res) => {
  try {
    const members = await Team.findAll();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a team member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Team.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a team member
router.put('/:id', async (req, res) => {
  try {
    const member = await Team.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });

    await member.update(req.body);
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a team member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Team.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });

    await member.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all team members of type "Actors"
router.get('/filter/type/actors', async (req, res) => {
  try {
    const actors = await Team.findAll({ where: { type: 'Actor' } });
    res.json(actors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all team members of type "Directors"
router.get('/filter/type/director', async (req, res) => {
  try {
    const directors = await Team.findAll({ where: { type: 'Director' } });
    res.json(directors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
