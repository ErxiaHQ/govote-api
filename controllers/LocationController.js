const { Location } = require('../models/Location');
const joi = require('joi');

const locationSchema = joi.object({
  id: joi.number().integer(),
  name: joi.string().required(),
  address: joi.string().required(),
  area: joi.string().required(),
  city_id: joi.number().integer(),
  state_id: joi
    .number()
    .integer()
    .required(),
  latitude: joi.number(),
  longitude: joi.number()
});

module.exports = {
  async index(ctx) {
    const { query } = ctx;
    try {
      const location = new Location();
      const { locations, meta } = await location.all(query);
      ctx.sendJson(locations, 'Locations retrieved successfully', meta);
    } catch (error) {
      ctx.abortJson(error, 'Error retrieving locations');
    }
  },

  async store(ctx) {
    const { body } = ctx.request;
    let location = new Location(body);

    const validator = joi.validate(location, locationSchema);
    if (validator.error) {
      return ctx.abortJson(
        validator.error.details[0].message,
        'Error validating'
      );
    }

    try {
      location = await location.store();
      ctx.sendJson(location, 'Location saved successfully');
    } catch (error) {
      ctx.abortJson(error, 'Error storing location');
    }
  },

  async show(ctx) {
    const { id } = ctx.params;
    try {
      const location = new Location();
      await location.find(id);
      if (!location.id) {
        return ctx.abortJson({}, `Location with ID: ${id} does not exist`);
      }

      ctx.sendJson(location, `Location with ID: ${id} retrieved`);
    } catch (error) {
      ctx.abortJson(error, `Error retrieving location with ID: ${id}`);
    }
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const validator = joi.validate(body, locationSchema);
    if (validator.error) {
      return ctx.abortJson(
        validator.error.details[0].message,
        'Error validating'
      );
    }

    try {
      let location = new Location();
      await location.find(id);
      if (!location.id) {
        return ctx.abortJson({}, `Location with ID: ${id} does not exist`);
      }

      location = Object.assign(location, body);
      await location.save();

      ctx.sendJson(location, `Location with ID: ${id} updated`);
    } catch (error) {
      console.log(error);
      ctx.abortJson(error, `Error updating location with ID: ${id}`);
    }
  },

  async destroy(ctx) {
    const { id } = ctx.params;
    const location = new Location();
    try {
      await location.find(id);
      if (!location.id) {
        return ctx.abortJson({}, `Location with ID: ${id} does not exist`);
      }
      await location.destroy();
      ctx.sendJson(location, `Location with ID: ${id} deleted`);
    } catch (error) {
      ctx.abortJson(error, `Error deleting location with ID: ${id}`);
    }
  }
};
