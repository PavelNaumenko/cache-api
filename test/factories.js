const DEFAULT_CACHE_ITEM = {
  _id: '5fc39933a3eaaa05f88917f9',
  key: '1',
  data: '17',
  accessedAt: '2020-11-29T13:25:46.487Z',
}

const cacheItemFactory = (overrides = {}) => {
  return {
    ...DEFAULT_CACHE_ITEM,
    ...overrides,
  }
}

module.exports = {
  cacheItemFactory,
}
