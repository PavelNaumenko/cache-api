module.exports = {
  app: {
    port: process.env.PORT,
    itemExpirationTime: 300,
    maxItemAmount: 5,
  },
  db: {
    database: process.env.MONGO_DB,
    testDb: process.env.MONGO_TEST_DB,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
  }
}