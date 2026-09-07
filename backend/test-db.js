const { sequelize } = require('./src/config/database');
sequelize.authenticate().then(() => console.log('OK')).catch(e => console.log('FAIL:', e.message));
