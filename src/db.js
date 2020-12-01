const mongoose = require('mongoose');
const config = require('./config');

module.exports = async (dbName) => {
  try {
    const { host, port } = config.db;
    const url = `mongodb://${host}:${port}/${dbName}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error));
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
