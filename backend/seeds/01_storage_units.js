/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('storage_units').del()

  // Inserts seed entries
  await knex('storage_units').insert([
    {
      name: 'Small Storage Unit A',
      size: 'small',
      location: 'Building 1, Floor 1',
      price_per_day: 10.00,
      is_available: true
    },
    {
      name: 'Small Storage Unit B',
      size: 'small',
      location: 'Building 1, Floor 1',
      price_per_day: 10.00,
      is_available: true
    },
    {
      name: 'Medium Storage Unit A',
      size: 'medium',
      location: 'Building 1, Floor 2',
      price_per_day: 20.00,
      is_available: true
    },
    {
      name: 'Medium Storage Unit B',
      size: 'medium',
      location: 'Building 1, Floor 2',
      price_per_day: 20.00,
      is_available: true
    },
    {
      name: 'Large Storage Unit A',
      size: 'large',
      location: 'Building 2, Floor 1',
      price_per_day: 30.00,
      is_available: true
    },
    {
      name: 'Large Storage Unit B',
      size: 'large',
      location: 'Building 2, Floor 1',
      price_per_day: 30.00,
      is_available: true
    }
  ]);
}; 