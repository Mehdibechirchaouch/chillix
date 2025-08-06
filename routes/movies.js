const express = require('express');
const multer = require('multer');
const path = require('path'); // ✅ Déclaré une seule fois
const fs = require('fs');
const Movie = require('../models/Movie');
const { fields } = require('../config/cloudinary'); // adjust path accordingly

const router = express.Router();

// File upload setup
router.post('/', fields, async (req, res) => {
  try {
    const {
      title, description, year, duration, quality, age, downloadLink,directors
    } = req.body;

    const genres = req.body.genres ? JSON.parse(req.body.genres) : [];
    const countries = req.body.countries ? JSON.parse(req.body.countries) : [];
    const subtitles = req.body.subtitles ? JSON.parse(req.body.subtitles) : [];
    const languages = req.body.languages ? JSON.parse(req.body.languages) : [];
    const actors = req.body.actors ? JSON.parse(req.body.actors) : [];

    // Cloudinary provides URLs in req.files.[field][0].path
    const coverPath = req.files?.cover?.[0]?.path || null;
    const photoPaths = req.files?.photos?.map(file => file.path) || [];

    const movie = await Movie.create({
      title,
      description,
      year,
      duration,
      quality,
      age,
      downloadLink,
      coverPath,
      photoPaths,
      genres,
      countries,
      subtitles,
      languages,
      actors,
      directors
    });

    res.json({ message: 'Movie uploaded successfully', movie });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});



// DELETE movie by ID
// DELETE a movie
router.delete('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    await movie.destroy();
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
});

// PUT /api/movies/:id
// PUT /api/movies/:id
router.put('/:id', fields, async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Parse JSON fields if they are stringified
    ['genres', 'countries', 'photoPaths','actors','directors','subtitles','languages'].forEach(field => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          console.warn(`Failed to parse ${field}:`, e.message);
        }
      }
    });

    // Handle updated image uploads from Cloudinary
    if (req.files?.cover?.length) {
      req.body.coverPath = req.files.cover[0].path; // Cloudinary gives full URL
    }

    if (req.files?.photos?.length) {
      req.body.photoPaths = req.files.photos.map(photo => photo.path);
    }

    const updatedMovie = await movie.update(req.body);
    res.json({ message: 'Movie updated successfully', updatedMovie });

  } catch (err) {
    console.error('PUT /api/movies/:id error:', err);
    res.status(500).json({ error: 'Failed to update movie' });
  }
});


// Backend - Express route pour un film par ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
