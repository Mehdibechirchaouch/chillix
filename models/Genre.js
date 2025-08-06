const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Genre = sequelize.define('Genre', {
  Label: DataTypes.STRING,
});

module.exports = Genre;
