const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  const exists = await User.findOne({ where: { role: 'admin' } });
  if (!exists) {
    const password = await bcrypt.hash('admin', 10);
    await User.create({
      username: 'admin',
      password,
      role: 'admin',
      approved: true
    });
    console.log('✅ Default admin created (username: admin, password: admin)');
  }
};

module.exports = seedAdmin;
