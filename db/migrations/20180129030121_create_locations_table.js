exports.up = (knex, Promise) => {
  return knex.schema.createTable('locations', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('address').nullable();
    table.string('area').nullable();
    table
      .integer('city_id')
      .unsigned()
      .nullable();
    table.integer('state_id').unsigned();
    table.decimal('latitude', 10, 8);
    table.decimal('longitude', 11, 8);
    table.boolean('confirmed').defaultTo(false);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .nullable();
    table.timestamp('deletedAt').nullable();
    table.foreign('state_id').references('states.id');
  });
};

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('locations');
