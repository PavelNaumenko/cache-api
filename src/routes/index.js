const { Router } = require('express');
const cacheItemController = require('../controllers/cacheItem.controller');

module.exports = () => {
  const router = Router();

  router.get('/items/:key', cacheItemController.getItem);
  router.get('/keys', cacheItemController.getKeys);
  router.patch('/items/:key', cacheItemController.updateItem);
  router.delete('/items/:key', cacheItemController.removeItem);
  router.delete('/items', cacheItemController.clearCache);

  return router;
}
