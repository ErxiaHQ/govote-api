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

  async searchLocations({ query }) {
    try {
      const content = await locationIndex.search({ query, hitsPerPage: 50 });
      return content.hits;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
};
