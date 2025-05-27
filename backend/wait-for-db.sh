#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USERNAME; do
  sleep 1
done

echo "PostgreSQL is ready!"

# Run migrations
echo "Running database migrations..."
npx knex migrate:latest

# Run seeders if needed
if [ "$RUN_SEEDERS" = "true" ]; then
  echo "Running database seeders..."
  npx knex seed:run
fi

# Start the application
echo "Starting the application..."
npm start 