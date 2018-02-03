const Router = require('koa-router');
const searchController = require('../controllers/SearchController');
const locationController = require('../controllers/LocationController');

const router = new Router();

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

// =================
// index
// =================
router.get('/', ctx => (ctx.body = 'Welcome to the NG Elections Api'));

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
