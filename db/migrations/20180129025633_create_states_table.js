exports.up = (knex, Promise) => {
  return knex.schema.createTable('states', table => {
    table.increments('id').primary();
    table.string('code').notNullable().unique();
    table.string('name').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).nullable();
  });
};

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('states');
