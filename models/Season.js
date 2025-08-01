const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Series = require('./Series');

const Season = sequelize.define('Season', {
  number: DataTypes.INTEGER,
});

Season.belongsTo(Series);
Series.hasMany(Season);

module.exports = Season;
