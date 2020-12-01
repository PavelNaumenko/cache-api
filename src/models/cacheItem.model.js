const mongoose = require('mongoose');
const config = require('../config');

const schema = new mongoose.Schema({
  key: {
    type: String,
    index: true,
    unique: true,
  },
  data: String,
  accessedAt: {
    type: Date,
    default: Date.now,
    index: true,
    expires: config.app.itemExpirationTime,
  },
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v
    },
  },
});

module.exports = mongoose.model('CacheItem', schema);
