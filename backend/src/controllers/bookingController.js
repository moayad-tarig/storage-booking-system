const { Booking } = require('../models');
const { logger } = require('../middleware/logger');
const AppError = require('../utils/AppError');

class BookingController {
  async createBooking(req, res, next) {
    try {
      logger.info('Creating booking', { body: req.body });
      const booking = await Booking.create(req.body);
      
      res.status(201).json({
        status: 'success',
        data: booking.toJSON()
      });
    } catch (error) {
      logger.error('Error creating booking', { 
        error: error.message,
        stack: error.stack,
        body: req.body 
      });
      next(error);
    }
  }

  async getUserBookings(req, res, next) {
    try {
      logger.info('Getting user bookings', { query: req.query });
      const bookings = await Booking.findAll(req.query.userName);
      
      res.json({
        status: 'success',
        data: bookings.map(booking => booking.toJSON())
      });
    } catch (error) {
      logger.error('Error getting user bookings', { 
        error: error.message,
        stack: error.stack,
        query: req.query 
      });
      next(error);
    }
  }
}

module.exports = new BookingController(); 