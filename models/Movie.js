const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movie = sequelize.define('Movie', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  year: DataTypes.INTEGER,
  duration: DataTypes.INTEGER,
  quality: DataTypes.STRING,
  age: DataTypes.INTEGER,
  downloadLink: DataTypes.STRING,
  coverPath: DataTypes.STRING,
  videoPath: DataTypes.STRING,
  photoPaths: DataTypes.JSON,
  countries: DataTypes.JSON,
  genres: DataTypes.JSON
});

module.exports = Movie;
