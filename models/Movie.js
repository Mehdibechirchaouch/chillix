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
  photoPaths: DataTypes.JSON,
  countries: DataTypes.JSON,
  genres: DataTypes.JSON,
    subtitles: DataTypes.JSON,
      languages: DataTypes.JSON,
      actors: DataTypes.JSON,
      directors: DataTypes.JSON,



});

module.exports = Movie;
