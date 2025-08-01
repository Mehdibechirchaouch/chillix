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

module.exports = app;
