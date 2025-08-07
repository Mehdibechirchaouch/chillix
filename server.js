const app = require('./app');
const sequelize = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');
require('dotenv').config();

const PORT = process.env.PORT || 10000;

sequelize.sync({ alter: true }) // for dev
  .then(async () => {
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to database:', err);
  });
