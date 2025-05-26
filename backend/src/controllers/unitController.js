const { StorageUnit } = require('../models');
const { logger } = require('../middleware/logger');
const AppError = require('../utils/AppError');

class UnitController {
  async getAvailableUnits(req, res, next) {
    try {
      const { location, size } = req.query;
      logger.info('Getting available units', { filters: { location, size } });
      
      const units = await StorageUnit.findAll({ location, size });
      
      res.json({
        status: 'success',
        data: units.map(unit => unit.toJSON())
      });
    } catch (error) {
      logger.error('Error getting available units', {
        error: error.message,
        stack: error.stack,
        query: req.query
      });
      next(error);
    }
  }
}

module.exports = new UnitController(); 