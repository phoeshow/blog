const mongoose = require('mongoose');
const { dbName, dbUserName, dbUserPassword } = require('./serverConfig');

const connectDB = async () => {
  await mongoose.connect(`mongodb://localhost:27017`, {
    user: dbUserName,
    pass: dbUserPassword,
    authSource: 'admin',
    dbName,
  });
};

module.exports = connectDB;
