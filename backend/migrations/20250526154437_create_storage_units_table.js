/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('storage_units', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('size').notNullable();  // size in square feet (or your unit)
    table.string('location').notNullable();
    table.decimal('price_per_day', 10, 2).notNullable();
    table.boolean('is_available').defaultTo(true);
    table.timestamps(true, true); // created_at, updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('storage_units');
};
