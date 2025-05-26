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
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logging
app.use(morgan('dev'));
app.use(requestLogger);

// Routes
const unitsRouter = require('./src/routes/v1/units');
const bookingsRouter = require('./src/routes/v1/bookings');

app.use('/api/v1/units', unitsRouter);
app.use('/api/v1/bookings', bookingsRouter);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
