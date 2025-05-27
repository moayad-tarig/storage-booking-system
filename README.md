# Storage Booking System

A full-stack application for managing storage unit bookings, built with Next.js, Node.js, Express, and PostgreSQL.

## Features

- Browse available storage units
- Filter units by location and size
- Book storage units with date selection
- View and manage bookings
- Responsive design with modern UI
- Real-time availability checking

## Tech Stack

### Frontend
- Next.js 14
- React
- Tailwind CSS
- Shadcn UI Components
- React Hot Toast

### Backend
- Node.js + Express
- PostgreSQL
- Knex.js (SQL query builder)
- Docker
- Winston (logging)
- Express Validator

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## Project Structure

```
storage-booking-system/
├── frontend/          # Next.js frontend application
├── backend/           # Express.js backend API
└── README.md
```

## Setup and Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd storage-booking-system
```

### 2. Backend Setup

#### Create Environment Files
Create `.env.local` in the backend directory:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=storage_booking
NODE_ENV=development
```

#### Install Dependencies
```bash
cd backend
npm install
```

#### Start PostgreSQL with Docker
```bash
# Start PostgreSQL container
docker run --name storage-booking-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=storage_booking \
  -p 5432:5432 \
  -d postgres:latest
```

#### Run Database Migrations and Seeds
```bash
# Run migrations to create database tables
npx knex migrate:latest

# Seed the database with initial data
npx knex seed:run
```

#### Start Backend Server
```bash
npm run dev
```

The backend server will start on http://localhost:3000

### 3. Frontend Setup

#### Create Environment File
Create `.env.local` in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

The frontend application will start on http://localhost:3001

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

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Database Management
```bash
# View database logs
docker logs storage-booking-db

# Access database shell
docker exec -it storage-booking-db psql -U postgres -d storage_booking

# Reset database (if needed)
docker rm -f storage-booking-db
# Then follow the database setup steps again
```

## Troubleshooting

1. **Database Connection Issues**
   - Ensure PostgreSQL container is running: `docker ps`
   - Check database logs: `docker logs storage-booking-db`
   - Verify environment variables in `.env.local`

2. **Migration/Seed Issues**
   - Drop and recreate database if needed:
     ```bash
     docker exec -it storage-booking-db psql -U postgres -c "DROP DATABASE storage_booking;"
     docker exec -it storage-booking-db psql -U postgres -c "CREATE DATABASE storage_booking;"
     ```
   - Run migrations and seeds again

3. **API Connection Issues**
   - Verify backend is running on port 3000
   - Check frontend environment variables
   - Ensure CORS is properly configured

## License

This project is licensed under the MIT License.
