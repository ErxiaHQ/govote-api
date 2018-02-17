const Router = require('koa-router');
const searchController = require('../controllers/SearchController');
const locationController = require('../controllers/LocationController');

require('dotenv').config();
const router = new Router();

// @todo
// temporary hack
// check if permitted request
const { API_KEYS } = process.env;
const allowedKeys = API_KEYS ? API_KEYS.split(',') : [];
router.use(async (ctx, next) => {
  const { key } = ctx.query;
  if (!allowedKeys.includes(key)) {
    const error = 'Invalid API key';
    return ctx.abortJson({}, error);
  }
  await next();
});

// @todo
// temporary hack
// don't allow post and put requests in production
// to avoid abuse
async function disallowRouteInProd(ctx, next) {
  const production = process.env.NODE_ENV === 'production';
  const { method } = ctx;
  const error = 'Route not allowed';
  if (production && method !== 'GET') return ctx.abortJson({}, error);
  await next();
}
router.use(['/location', '/location/:id'], disallowRouteInProd);

// =================
// index
// =================
router.get('/', ctx => (ctx.body = 'Welcome to the GoVote Api'));

// =================
// search
// =================
router.get('/search', searchController.search);

// =================
// locations
// =================
router.get('/location', locationController.index);
router.post('/location', locationController.store);
router.get('/location/:id', locationController.show);
router.put('/location/:id', locationController.update);
router.del('/location/:id', locationController.destroy);

module.exports = router;
