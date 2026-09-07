require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./config/database');
const { sequelize: seq, models } = require('./models');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    // Sync all models
    await seq.sync({ alter: true });
    console.log('✅ Database models synced');

    // Log registered models
    console.log('📦 Models:', Object.keys(models));

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
