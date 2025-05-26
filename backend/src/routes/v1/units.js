const express = require('express');
const router = express.Router();
const unitController = require('../../controllers/unitController');
const { validateUnitFilters, validateRequest } = require('../../middleware/validation');

// GET /units - Get all available units with optional filtering
router.get(
  '/',
  validateUnitFilters,
  validateRequest,
  unitController.getAvailableUnits
);

module.exports = router; 