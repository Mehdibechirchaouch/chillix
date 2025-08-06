const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM('admin', 'sub-admin'), defaultValue: 'sub-admin' },
  approved: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = User;
