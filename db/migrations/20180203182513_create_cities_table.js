exports.up = (knex, Promise) =>
  knex.schema.createTable('cities', table => {
    table.increments('id').primary();
    table.integer('state_id').unsigned();
    table.string('name').notNullable();
    table
      .string('code')
      .notNullable();
    table.text('description').nullable();
    table.float('latitude');
    table.float('longitude');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .nullable();
    table.foreign('state_id').references('states.id');
  });

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('cities');
