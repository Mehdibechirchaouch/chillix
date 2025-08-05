const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Team = sequelize.define('Team', {
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  type: DataTypes.STRING,

});

module.exports = Team;
