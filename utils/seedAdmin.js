const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    const password = await bcrypt.hash('admin', 10);
    await User.create({
            username: 'admin',
      email: 'admin',
      password,
      role: 'admin'    });
    console.log('✅ Default admin created (username: admin, password: admin)');
  
};

module.exports = seedAdmin;
