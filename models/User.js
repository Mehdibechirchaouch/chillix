const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING},
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING  ,allowNull: false},
  role: { type: DataTypes.ENUM('admin', 'sub-admin', 'client'), defaultValue: 'client' }
});

module.exports = User;
