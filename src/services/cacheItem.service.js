const { omit } = require('lodash');

const CacheItem = require('../models/cacheItem.model');
const getRandomInt = require('../utils/getRandonInt');
const config = require('../config');
const Logger = require('../utils/logger');

const logger = new Logger();

const insertItem = async (key, data = getRandomInt()) => {
  const amount = await CacheItem.countDocuments();
  const newItem = new CacheItem({ key, data });
  if (amount < config.app.maxItemAmount) return newItem.save();
  const toUpdate = omit(newItem.toJSON(), '_id');
  // replace the item that was not accessed too long
  return CacheItem.findOneAndReplace({}, toUpdate, { sort: 'accessedAt', new: true });
}

const getItem = async (key) => {
  const toUpdate = { accessedAt: new Date() }
  const item = await CacheItem.findOneAndUpdate({ key }, toUpdate, { new: true, useFindAndModify: false });
  if (item) {
    logger.log('Cache hit');
    return item;
  }
  logger.log('Cache miss');
  return insertItem(key);
}

const getKeys = () => {
  return CacheItem.find({}, 'key -_id').lean();
}

const updateItem = async (key, data) => {
  const toUpdate = { data, accessedAt: new Date() };
  const item = await CacheItem.findOneAndUpdate({ key }, toUpdate, { new: true, useFindAndModify: false });
  return item || insertItem(key, data);
}

const removeItem = (key) => {
  return CacheItem.deleteOne({ key });
}

const clearCache = () => {
  return CacheItem.deleteMany();
}

module.exports = {
  getItem,
  getKeys,
  updateItem,
  removeItem,
  clearCache,
}
