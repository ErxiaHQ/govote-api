const AlgoliaService = require('../services/AlgoliaService');
module.exports = {
  async search(ctx) {
    const queryObj = ctx.query;
    if (!queryObj.query) return ctx.abortJson({}, 'search query not sent');
    try {
      const { locations, meta } = await AlgoliaService.searchLocations(
        queryObj
      );
      console.log({ locations, meta });
      ctx.sendJson(locations, 'locations retrived successfully', meta);
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
