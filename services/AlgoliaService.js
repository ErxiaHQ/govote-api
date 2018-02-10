const client = require('../db/algolia');
const Location = require('../models/Location');

const locationIndex = client.initIndex('locations');

module.exports = {
  async indexLocations() {
    try {
      const locations = await new Location().all();
      const objects = locations.map(l => {
        l.objectID = l.id;
        return l;
      });
      const content = await locationIndex.addObjects(objects);
      return content.hits;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  async searchLocations({ query, page, limit }) {
    page = page || 1;
    limit = limit || 20;
    try {
      const content = await locationIndex.search({
        query,
        page: page - 1, // algolia pagination starting from 0
        hitsPerPage: limit
      });
      const locations = content.hits;
      const total = content.nbHits;
      const meta = { query, page, limit, total };
      return { locations, meta };
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
};
