const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Series = sequelize.define('Series', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  year: DataTypes.INTEGER,
  age: DataTypes.INTEGER,
  Picture: DataTypes.STRING,
  countries: DataTypes.JSON,
  genres: DataTypes.JSON,
  trailerLink: DataTypes.STRING,

});

module.exports = Series;
