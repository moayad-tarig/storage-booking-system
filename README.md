# Storage Booking System Backend

A RESTful API for managing storage unit bookings, built with Node.js, Express, and PostgreSQL.

## Features

- RESTful API endpoints for storage unit management
- Filter units by location and size
- Booking management with conflict prevention
- Input validation and error handling
- Request logging and monitoring
- PostgreSQL database with Knex.js ORM

## Tech Stack

- Node.js + Express
- PostgreSQL
- Knex.js (SQL query builder)
- Docker
- Winston (logging)
- Express Validator

## API Endpoints

### Storage Units
- `GET /api/v1/units` - List all available units
  - Query Parameters:
    - `location` (optional): Filter by location
    - `size` (optional): Filter by unit size

### Bookings
- `POST /api/v1/bookings` - Create a new booking
  - Request Body:
    ```json
    {
      "userName": "string",
      "unitId": "number",
      "startDate": "ISO8601 date",
      "endDate": "ISO8601 date"
    }
    ```
- `GET /api/v1/bookings` - Get user's bookings
  - Query Parameters:
    - `userName` (required): Filter bookings by user name

## Database Schema

### Storage Units
```sql
CREATE TABLE storage_units (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  size VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  price_per_day DECIMAL(10,2) NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bookings
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR NOT NULL,
  unit_id INTEGER REFERENCES storage_units(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd storage-booking-system/backend
   ```

2. Create `.env.docker` file:
   ```
   POSTGRES_USERNAME=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DATABASE_NAME=storage_booking
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=storage_booking
   NODE_ENV=development
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the application using Docker:
   ```bash
   docker-compose up -d
   ```

5. Run database migrations:
   ```bash
   npm run migrate:latest
   ```

6. Seed the database (optional):
   ```bash
   npm run seed
   ```

## Development

Start the development server:
```bash
npm run dev
```

## API Response Format

### Success Response
```json
{
  "status": "success",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "status": "fail",
  "error": {
    "statusCode": 400,
    "status": "fail",
    "isOperational": true
  },
  "message": "Error message"
}
```

## Error Handling

- Input validation using express-validator
- Custom error handling middleware
- Proper HTTP status codes
- Detailed error messages
- Request logging with Winston

## Security Features

- Input validation and sanitization
- SQL injection prevention using Knex.js
- Proper error handling to prevent information leakage
- Request logging for debugging and monitoring

## Project Structure

```
backend/
├── src/
│   ├── controllers/    # Route controllers
│   ├── services/       # Business logic
│   ├── middleware/     # Custom middleware
│   └── utils/          # Utility functions
├── routes/             # API routes
├── migrations/         # Database migrations
├── seeds/             # Database seeds
└── db.js              # Database configuration
```

## License

This project is licensed under the MIT License.
