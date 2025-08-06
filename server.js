const app = require('./app');
const sequelize = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connection established');

    const User = require('./models/User');

    await User.drop();          // 🗑️ Drop only the Users table
    await User.sync();          // 🔁 Recreate Users table
    console.log('🔁 Users table recreated');

    await seedAdmin();          // 👤 Seed default admin
    console.log('✅ Admin seeded');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Error during DB setup:', err);
    process.exit(1);
  }
})();
