exports.up = (knex, Promise) =>
  knex.schema.createTable('location_suggestions', table => {
    table.increments('id').primary();
    table.string('location_id').nullable();
    table.text('current_payload').nullable();
    table.text('suggested_payload').nullable();
    table
      .enu('status', ['pending', 'rejected', 'accepted'])
      .defaultTo('pending');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .nullable();
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists('location_suggestions');
