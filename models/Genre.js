// models/Genre.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Genre = sequelize.define('Genre', {
  Label: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Genre;
