const app = require('./app');                // Import Express app
const sequelize = require('./config/db');    // Sequelize DB connection
const seedAdmin = require('./utils/seedAdmin'); // Function to create default admin
require('dotenv').config();                  // Load .env variables

const PORT = process.env.PORT || 5000;       // Default port fallback

// Sync DB and start server
sequelize.sync({ alter: true })              // alter:true for dev (safe schema changes)
  .then(async () => {
    await seedAdmin();                       // Seed default admin if needed
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to database:', err);
  });
