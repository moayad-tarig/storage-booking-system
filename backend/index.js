// backend/index.js (or wherever your main app file is)
const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // Parse the port from environment variable
  user: process.env.POSTGRES_USERNAME, // Use the names from your .env file
  password: process.env.POSTGRES_PASSWORD, // Use the names from your .env file
  database: process.env.POSTGRES_DATABASE_NAME, // Use the names from your .env file
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Postgres time:', res.rows[0]);
  }
});

app.get('/', (req, res) => {
  res.send('Hello from Express in Docker!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
