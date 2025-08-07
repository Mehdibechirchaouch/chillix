const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✅ Define app first
const path = require('path');

// ✅ Setup middleware
app.use(cors({ origin: '*'})); // allow Angular frontend
app.use(express.json());

// ✅ Add routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
// TODO: add movie & series routes here
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }));

app.use('/api/movies', require('./routes/movies'));
app.use('/api/team', require('./routes/team'));
app.use('/api/genre', require('./routes/genre'));
app.use('/api/series', require('./routes/series'));
app.use('/api/seasons', require('./routes/seasons'));
app.use('/api/episodes', require('./routes/episodes'));

module.exports = app;
