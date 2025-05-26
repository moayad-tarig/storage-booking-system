const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/bookingController');
const { validateBookingCreation, validateGetUserBookings, validateRequest } = require('../../middleware/validation');

// POST /bookings — Book a unit
router.post(
  '/',
  validateBookingCreation,
  validateRequest,
  bookingController.createBooking
);

// GET /bookings — List bookings for a user
router.get(
  '/',
  validateGetUserBookings,
  validateRequest,
  bookingController.getUserBookings
);

module.exports = router; 