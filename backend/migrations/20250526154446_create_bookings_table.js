/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('bookings', function(table) {
    table.increments('id').primary();
    table.string('user_name').notNullable();
    table.integer('unit_id').unsigned().notNullable()
      .references('id').inTable('storage_units')
      .onDelete('CASCADE');
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bookings');

};
