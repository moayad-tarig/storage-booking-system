const express = require('express');
const router = express.Router();
const unitController = require('../../controllers/unitController');
const { validateUnitFilters, validateRequest } = require('../../middleware/validation');

// Debug middleware for this route
router.use((req, res, next) => {
  console.log('Units route hit:', {
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers
  });
  next();
});

// GET /units - Get all available units with optional filtering
router.get(
  '/',
  validateUnitFilters,
  validateRequest,
  unitController.getAvailableUnits
);

module.exports = router; 