const AlgoliaService = require('../services/AlgoliaService');
module.exports = {
  async search(ctx) {
    const queryObj = ctx.query;
    const { query } = queryObj;
    try {
      const locations = await AlgoliaService.searchLocations({ query });
      ctx.sendJson(locations, 'locations retrived successfully');
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
