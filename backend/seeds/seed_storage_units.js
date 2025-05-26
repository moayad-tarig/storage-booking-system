/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('storage_units').del()
  await knex('storage_units').insert([
       {
      name: 'Unit A',
      size: '10x10',
      location: 'Downtown',
      price_per_day: 15.00,
      is_available: true
    },
    {
      name: 'Unit B',
      size: '5x5',
      location: 'Uptown',
      price_per_day: 8.00,
      is_available: true
    },
    {
      name: 'Unit C',
      size: '8x8',
      location: 'Suburbs',
      price_per_day: 12.00,
      is_available: true
    }
  ]);
};
