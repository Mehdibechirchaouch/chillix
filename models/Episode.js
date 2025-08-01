const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Season = require('./Season');

const Episode = sequelize.define('Episode', {
  title: DataTypes.STRING,
  episodeNumber: DataTypes.INTEGER,
  downloadLink: DataTypes.STRING,
});

Episode.belongsTo(Season);
Season.hasMany(Episode);

module.exports = Episode;
