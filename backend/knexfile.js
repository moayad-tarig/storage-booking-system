// Update with your config settings.
require('dotenv').config({ path: '.env.local' });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'storage_booking',
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    pool: {
      min: 2,
      max: 10,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 3000,
      idleTimeoutMillis: 3000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 3000,
      idleTimeoutMillis: 3000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
