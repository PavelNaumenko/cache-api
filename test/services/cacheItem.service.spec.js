const assert = require('assert');
const sinon = require('sinon');
const { initTests } = require('../initTest');
const { cacheItemFactory } = require('../factories');
const { createCacheItem } = require('../testSeeder');
const cacheItemService = require('../../src/services/cacheItem.service');
const CacheItem = require('../../src/models/cacheItem.model');
const config = require('../../src/config');

describe('CacheItem Service', () => {
  beforeEach(initTests);

  describe('getItem', () => {
    it('should return existed item and update accessedAt property', async () => {
      const item = cacheItemFactory();
      await createCacheItem(item);

      const result = await cacheItemService.getItem(item.key);

      assert.strictEqual(result.key, item.key);
      assert.strictEqual(result.data, item.data);
      assert.notStrictEqual(result.accessedAt, item.accessedAt);
    });

    it('should create item if no item found', async () => {
      const key = '1'

      const result = await cacheItemService.getItem(key);

      assert.strictEqual(result.key, key);
      assert.ok(result.data);
    });

    it('should replace existed item if reach cache capacity', async () => {
      const stub = sinon.stub(CacheItem, "countDocuments").callsFake(() => config.app.maxItemAmount);

      const key = '2';
      const item = cacheItemFactory();
      await createCacheItem(item);

      const result = await cacheItemService.getItem(key);
      const dbItems = await CacheItem.find().lean();

      assert.strictEqual(result.key, key);
      assert.notStrictEqual(result.data, item.data);
      assert.strictEqual(dbItems.length, 1);

      stub.restore();
    });
  });

  describe('getKeys', () => {
    it('should return list of keys', async () => {
      const item = cacheItemFactory();
      await createCacheItem(item);

      const result = await cacheItemService.getKeys();
      const expected = [{ key: item.key }];

      assert.deepStrictEqual(result, expected);
    });

    it('should return empty list if no items present', async () => {
      const result = await cacheItemService.getKeys();
      assert.deepStrictEqual(result, []);
    });
  });

  describe('updateItem', () => {
    it('should update existed item', async () => {
      const item = cacheItemFactory();
      await createCacheItem(item);
      const toUpdate = '42';

      const result = await cacheItemService.updateItem(item.key, toUpdate);

      assert.strictEqual(result.key, item.key);
      assert.strictEqual(result.data, toUpdate);
      assert.notStrictEqual(result.accessedAt, item.accessedAt);
    });

    it('should create new item if no items found', async () => {
      const key = '1';
      const data = '42';

      const result = await cacheItemService.updateItem(key, data);

      assert.strictEqual(result.key, key);
      assert.strictEqual(result.data, data);
    });

    it('should replace existed item if reach cache capacity', async () => {
      const stub = sinon.stub(CacheItem, "countDocuments").callsFake(() => config.app.maxItemAmount);

      const key = '2';
      const data = '42';
      const item = cacheItemFactory();
      await createCacheItem(item);

      const result = await cacheItemService.updateItem(key, data);
      const dbItems = await CacheItem.find().lean();

      assert.strictEqual(result.key, key);
      assert.strictEqual(result.data, data);
      assert.strictEqual(dbItems.length, 1);

      stub.restore();
    });
  });

  describe('removeItem', () => {
    it('should remove item by key', async () => {
      const item = cacheItemFactory();
      await createCacheItem(item);

      await cacheItemService.removeItem(item.key);
      const dbItems = await CacheItem.find().lean();

      assert.strictEqual(dbItems.length, 0);
    });

    it('should not throw error for unexisted key', async () => {
      await cacheItemService.removeItem('1');
    });
  });

  describe('clearCache', () => {
    it('should remove all items', async () => {
      const item = cacheItemFactory();
      await createCacheItem(item);

      await cacheItemService.clearCache();
      const dbItems = await CacheItem.find().lean();

      assert.strictEqual(dbItems.length, 0);
    });
  })
});
