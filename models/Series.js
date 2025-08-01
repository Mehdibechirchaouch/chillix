const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Series = sequelize.define('Series', {
  title: { type: DataTypes.STRING },
  description: DataTypes.TEXT,
});

module.exports = Series;
