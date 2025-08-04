const express = require('express');
const multer = require('multer');
const path = require('path'); // ✅ Déclaré une seule fois
const fs = require('fs');
const Movie = require('../models/Movie');

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = `uploads/${file.fieldname}`;
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const fields = upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'photos', maxCount: 10 }
]);

// Upload movie
router.post('/', fields, async (req, res) => {
  try {
    const {
      title, description, year, duration, quality, age, downloadLink
    } = req.body;

    const genres = req.body.genres ? JSON.parse(req.body.genres) : [];
    const countries = req.body.countries ? JSON.parse(req.body.countries) : [];

    const movie = await Movie.create({
      title,
      description,
      year,
      duration,
      quality,
      age,
      downloadLink,
      coverPath: req.files?.cover?.[0]?.path.replace(/\\/g, "/") || null,
      photoPaths: req.files?.photos?.map(p => p.path.replace(/\\/g, "/")) || [],
      genres,
      countries
    });
    console.log('Saved coverPath:', movie);  // e.g., "uploads/cover/filename.jpg"

console.log('Saved coverPath:', coverPath);  // e.g., "uploads/cover/filename.jpg"
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
    console.log('Sending movie object with coverPath:', movie.coverPath);
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
router.put('/:id', fields, async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Parse JSON fields
    ['genres', 'countries', 'photoPaths'].forEach(field => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          console.error(`Error parsing ${field}:`, e);
        }
      }
    });

    // If new files are uploaded, update file paths
    if (req.files?.cover?.length) {
      req.body.coverPath = req.files.cover[0].path;
    }
    if (req.files?.photos?.length) {
      req.body.photoPaths = req.files.photos.map(p => p.path);
    }

    const updatedMovie = await movie.update(req.body);
    res.json(updatedMovie);
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
