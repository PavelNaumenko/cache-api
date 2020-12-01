const CacheItem = require('../src/models/cacheItem.model');

const createCacheItem = (item) => {
  return CacheItem.create(item);
}

module.exports = {
  createCacheItem,
}
