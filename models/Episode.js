const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Season = require('./Season');

const Episode = sequelize.define('Episode', {
  title: { type: DataTypes.STRING, allowNull: false },
  episodeNumber: { type: DataTypes.INTEGER, allowNull: false },
  description: DataTypes.TEXT,
downloadLinks: DataTypes.JSON,
  duration: DataTypes.INTEGER,
  quality: DataTypes.STRING,
  age: DataTypes.INTEGER,
  picture: DataTypes.STRING
});

Episode.belongsTo(Season);
Season.hasMany(Episode);

module.exports = Episode;
