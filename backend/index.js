require('dotenv').config({ path: '.env.local' });
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const { requestLogger } = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const { Pool } = require('pg');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration - more permissive for development
app.use(cors({
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logging
app.use(morgan('dev'));
app.use(requestLogger);

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers
  });
  next();
});

// Routes
const unitsRouter = require('./src/routes/v1/units');
const bookingsRouter = require('./src/routes/v1/bookings');

// Mount routes with /api/v1 prefix
app.use('/api/v1/units', unitsRouter);
app.use('/api/v1/bookings', bookingsRouter);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', {
    method: req.method,
    path: req.path,
    query: req.query
  });
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
