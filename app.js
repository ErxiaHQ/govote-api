require('dotenv').config();
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-body');
const response = require('./middleware/response');
const router = require('./middleware/router');

const app = new Koa();

// logger
app.use(logger());

// response
app.use(response());

// body parser
app.use(bodyParser());

// routes
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on http://localhost:${port}`));
