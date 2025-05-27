/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('storage_units').del();

  // Inserts seed entries
  await knex('storage_units').insert([
    {
      name: 'Small Unit A',
      size: '5x5',
      location: 'Floor 1',
      price_per_day: 10.00,
      is_available: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Medium Unit B',
      size: '10x10',
      location: 'Floor 1',
      price_per_day: 20.00,
      is_available: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Large Unit C',
      size: '10x20',
      location: 'Floor 2',
      price_per_day: 30.00,
      is_available: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}; 