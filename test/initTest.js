const mongoose = require('mongoose');
const dbConnect = require('../src/db');
const config = require('../src/config');

let isConnected = false;

const initTests = async () => {
  if (!isConnected) {
    await dbConnect(config.db.testDb);
    isConnected = true;
  }
  await mongoose.connection.dropDatabase();
}

module.exports = {
  initTests,
}
