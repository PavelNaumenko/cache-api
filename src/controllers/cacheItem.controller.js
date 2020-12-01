const cacheItemService = require('../services/cacheItem.service');

const getItem = async (req, res, next) => {
  try {
    const result = await cacheItemService.getItem(req.params.key);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

const getKeys = async (req, res, next) => {
  try {
    const result = await cacheItemService.getKeys();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

const updateItem = async (req, res, next) => {
  try {
    const result = await cacheItemService.updateItem(req.params.key, req.body.data);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

const removeItem = async (req, res, next) => {
  try {
    await cacheItemService.removeItem(req.params.key);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

const clearCache = async (req, res, next) => {
  try {
    await cacheItemService.clearCache(req.params.key);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getItem,
  getKeys,
  updateItem,
  removeItem,
  clearCache,
}
