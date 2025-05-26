const { body, validationResult, query } = require('express-validator');

const validateBookingCreation = [
  body('userName')
    .trim()
    .notEmpty().withMessage('userName is required')
    .isString().withMessage('userName must be a string')
    .isLength({ min: 2 }).withMessage('userName must be at least 2 characters long'),
  body('unitId')
    .notEmpty().withMessage('unitId is required')
    .isInt({ gt: 0 }).withMessage('unitId must be a positive integer'),
  body('startDate')
    .notEmpty().withMessage('startDate is required')
    .isISO8601().withMessage('startDate must be a valid date')
    .custom((value) => {
      const date = new Date(value);
      if (date < new Date()) {
        throw new Error('startDate cannot be in the past');
      }
      return true;
    }),
  body('endDate')
    .notEmpty().withMessage('endDate is required')
    .isISO8601().withMessage('endDate must be a valid date')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (endDate < startDate) {
        throw new Error('endDate must be the same or after startDate');
      }
      return true;
    }),
];

const validateGetUserBookings = [
  query('userName')
    .trim()
    .notEmpty().withMessage('userName query parameter is required')
    .isString().withMessage('userName must be a string')
    .isLength({ min: 2 }).withMessage('userName must be at least 2 characters long'),
];

const validateUnitFilters = [
  query('location')
    .optional()
    .trim()
    .isString().withMessage('location must be a string'),
  query('size')
    .optional()
    .trim()
    .isString().withMessage('size must be a string'),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      status: 'fail',
      errors: errors.array() 
    });
  }
  next();
};

module.exports = {
  validateBookingCreation,
  validateGetUserBookings,
  validateUnitFilters,
  validateRequest,
}; 