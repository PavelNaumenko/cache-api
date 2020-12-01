const express = require('express');
const bodyParser = require('body-parser');

const dbConnect = require('./db');
const config = require('./config');
const appRoutes = require('./routes');
const healthCheck = require('./utils/healthCheck');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', healthCheck);
app.use(appRoutes());
app.use(errorHandler);

(async function bootstrap() {
  await dbConnect(config.db.database);
  app.listen(config.app.port, () => console.log(`App is listening on: ${config.app.port}`));
})();
